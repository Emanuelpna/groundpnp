class DaySpan {
  constructor() {
    this.startDate = null;
    this.endDate = null;

    this.daySpan = null;

    this.bedroomPrice = null;
    this.finalPrice = null;
    this.priceElement = null;
  }

  bind(startDate, endDate, priceElement) {
    this.priceElement = priceElement;

    startDate.addEventListener('change', (e) => {
      this.startDate = new Date(e.target.value);
      this.calculatePriceTimeSpent();
    });

    endDate.addEventListener('change', (e) => {
      this.endDate = new Date(e.target.value);
      this.calculatePriceTimeSpent();
    });
  }

  setBedroomPrice(bedroomPrice) {
    this.bedroomPrice = bedroomPrice;
    this.calculatePriceTimeSpent();
  }

  getDaySpan() {
    if (!this.startDate || !this.endDate) {
      return false;
    }

    const msPerDay = 1000 * 60 * 60 * 24;

    const daySpanInMiliseconds = Math.abs(
      this.startDate.getTime() - this.endDate.getTime()
    );

    this.daySpan = daySpanInMiliseconds / msPerDay;
  }

  calculatePriceTimeSpent() {
    this.getDaySpan();

    if (!this.daySpan || !this.bedroomPrice) {
      return false;
    }

    this.finalPrice = this.bedroomPrice * this.daySpan;

    this.printPrice();
  }

  printPrice() {
    if (!this.priceElement) {
      return false;
    }

    if (this.finalPrice) {
      this.priceElement.innerHTML = ` 
        <div class="orderContainer">
          <span class="orderText">Sua viagem por:</span>
          <span class="orderPrice">
            ${this.finalPrice.formatPrice()}
          </span>
        </div>
      `;
    } else {
      this.priceElement.innerHTML = ` 
        <span class="orderText noOrder">Escolha uma estadia e o período para continuar</span>
      `;
    }
  }
}
