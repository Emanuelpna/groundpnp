class Places {
  constructor() {
    this.database = FakeDatabase;

    this.data = [];
  }

  async getPlaces() {
    const coordinates = this.database.getAllData();

    const http = new Http();

    const places = await http.get();

    console.log('places :>> ', places);

    this.data = coordinates.map((coordinate, index) => {
      return new Bedroom(places[index], coordinate);
    });
  }

  filterPrice(price) {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  printPlaces() {
    const container = document.querySelector('.places');

    container.innerHTML = "";

    container.innerHTML = this.data
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
