class Places extends Pagination {
  constructor() {
    super();

    this.database = FakeDatabase;

    this.places = [];

    this.placesPerPage = 4;
  }

  async getPlaces() {
    const coordinates = this.database.getAllData();

    const http = new Http();

    const placesWithoutCoordinates = await http.get();

    this.places = coordinates.map((coordinate, index) => {
      return new Bedroom(placesWithoutCoordinates[index], coordinate);
    });

    this.sort;

    this.setTotalPages();

    this.printPlaces();
  }

  changeToNextPage() {
    this.nextPage();
    this.getPlaces();
  }

  changeToPreviousPage() {
    this.previousPage();
    this.getPlaces();
  }

  setTotalPages() {
    const totalPlaces = this.places.length;

    this._totalPages = Math.ceil(totalPlaces / this.placesPerPage);
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

  printPlaces() {
    const container = document.querySelector('.places');

    container.innerHTML = '';

    container.innerHTML = this.filterPaginatedPlaces(this.places)
      .map((place) => this.placeTemplate(place))
      .join(' ');
  }
}
