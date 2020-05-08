class Places extends Pagination {
  constructor() {
    super();

    this.database = FakeDatabase;

    this.places = [];

    this.placesPerPage = 4;

    this.sortingKey = 'DEFAULT';
    this.sortingOrientation = 'NORMAL';
  }

  async getPlaces() {
    this.setLoading();

    const coordinates = this.database.getAllData();

    const http = new Http();

    const placesWithoutCoordinates = await http.get();

    this.places = coordinates.map((coordinate, index) => {
      return new Bedroom(placesWithoutCoordinates[index], coordinate);
    });

    this.sortPlaces();

    this.setTotalPagesOfPlaces();

    this.printPlaces();
  }

  setSortingKey(sortingKey) {
    this.sortingKey = sortingKey;
  }

  setSortingOrientation(sortingOrientation) {
    this.sortingOrientation = sortingOrientation;
  }

  sortPlaces() {
    if (this.sortingKey === 'DEFAULT') return false;

    switch (this.sortingOrientation) {
      case 'NORMAL':
        this.places = this.places.sort((a, b) =>
          a[this.sortingKey] < b[this.sortingKey] ? 1 : -1
        );
        break;

      case 'REVERSE':
        this.places = this.places.sort((a, b) =>
          a[this.sortingKey] > b[this.sortingKey] ? 1 : -1
        );
        break;

      default:
        break;
    }
  }

  changeToNextPage(pageControllerPrevious, pageControllerNext) {
    this.nextPage();

    this.showHidePageControllers(pageControllerPrevious, pageControllerNext);

    this.getPlaces();
  }

  changeToPreviousPage(pageControllerPrevious, pageControllerNext) {
    this.previousPage();

    this.showHidePageControllers(pageControllerPrevious, pageControllerNext);

    this.getPlaces();
  }

  showHidePageControllers(pageControllerPrevious, pageControllerNext) {
    const currentPage = this.getPage();
    const totalPlaces = this.getTotalPages();

    pageControllerPrevious.style['z-index'] = 'initial';
    pageControllerPrevious.style.opacity = '1';

    pageControllerNext.style['z-index'] = 'initial';
    pageControllerNext.style.opacity = '1';

    if (currentPage === 1) {
      pageControllerPrevious.style['z-index'] = '-1';
      pageControllerPrevious.style.opacity = '0';
    }

    if (currentPage === totalPlaces) {
      pageControllerNext.style['z-index'] = '-1';
      pageControllerNext.style.opacity = '0';
    }
  }

  setTotalPagesOfPlaces() {
    const totalPlaces = this.places.length;

    this.setTotalPages(Math.ceil(totalPlaces / this.placesPerPage));
  }

  filterPaginatedPlaces(places) {
    const currentPage = this.getPage();
    const previousPage = currentPage - 1;

    const limitOfPlaces = currentPage * this.placesPerPage;
    const offsetPlaces = this.placesPerPage * previousPage;

    return places.filter(
      (_, index) => index >= offsetPlaces && index < limitOfPlaces
    );
  }

  placeTemplate(place) {
    const { picture, name, price, propetyType, id } = place;

    return `
      <div class="place" data-id="${id}">
        <div class="placeCoverContainer">
          <img
            class="placeCover"
            src="${picture}"
            alt="${name} - ${propetyType}"
          />
        </div>
        <span class="placeType">${propetyType}</span>
        <h3 class="placeTitle">${name.toLowerCase()}</h3>
        <strong data-price="${price}" class="placePrice">${price.formatPrice()}</strong>
      </div>
    `;
  }

  setLoading() {
    const container = document.querySelector('.places');
    container.innerHTML += "<div class='loader'><div class='lds-dual-ring'></div></div>"
  }

  printPlaces() {
    const container = document.querySelector('.places');

    container.innerHTML = '';

    container.innerHTML = this.filterPaginatedPlaces(this.places)
      .map((place) => this.placeTemplate(place))
      .join(' ');
  }
}
