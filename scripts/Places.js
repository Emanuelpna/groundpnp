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

    console.log('places :>> ', placesWithoutCoordinates);

    this.places = coordinates.map((coordinate, index) => {
      return new Bedroom(placesWithoutCoordinates[index], coordinate);
    });

    this.paginatePlaces();

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

  paginatePlaces() {
    const totalPlaces = this.places.length;

    this._totalPages = Math.ceil(totalPlaces / this.placesPerPage);

    console.log('this.page :>> ', this.getPage());
    console.log('this.totalPages :>> ', this._totalPages);
    console.log('this.places :>> ', this.places);
  }

  filterPaginatedPlaces(places) {
    const currentPage = this.getPage();
    return places.filter(
      (_, index) => index <= currentPage * this.placesPerPage
    );
  }

  printPlaces() {
    const container = document.querySelector('.places');

    container.innerHTML = '';

    console.log(
      'this.filterPaginatedPlaces(this.places) :>> ',
      this.filterPaginatedPlaces(this.places)
    );

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
