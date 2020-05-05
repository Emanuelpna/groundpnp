class GoogleMaps {
  constructor(element, google) {
    this.googleMaps = google.maps;
    this.juizDeFora = { lat: -21.7557364, lng: -43.3596817 };

    this.element = element;

    this.map = false;
  }

  drawMap() {
    this.map = new this.googleMaps.Map(this.element, {
      zoom: 14,
      center: this.juizDeFora,
    });
  }

  addMarkers(places) {
    places.forEach((place) => {
      const googleCoordinates = new this.googleMaps.LatLng(
        place.latitude,
        place.longitude
      );

      const customMarker = CustomMarker(
        googleCoordinates,
        this.map,
        place.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
      );
    });
  }
}