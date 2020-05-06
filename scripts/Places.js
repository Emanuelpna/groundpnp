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

  filterPrice(price) {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  setTotalPages() {
    const totalPlaces = this.places.length;

    this._totalPages = Math.ceil(totalPlaces / this.placesPerPage);
  }

  filterPaginatedPlaces(places) {
    const currentPage = this.getPage();
    const previousPage = currentPage - 1

    const limitOfPlaces = currentPage * this.placesPerPage;
    const offsetPlaces = this.placesPerPage * previousPage;

    return places.filter(
      (_, index) => index < limitOfPlaces && index >= offsetPlaces
    );
  }

  printPlaces() {
    const container = document.querySelector('.places');

    container.innerHTML = '';

    container.innerHTML = this.filterPaginatedPlaces(this.places)
      .map(
        ({ picture, name, price, propetyType, id }) =>
          `<div class="place" data-id="${id}">
          <img
            src="${picture}"
            alt="${name} - ${propetyType}"
          />
          <h3>${name}</h3>
          <span>${propetyType}</span>
          <strong>${this.filterPrice(price)}</strong>
        </div>`
      )
      .join(' ');
  }
}
