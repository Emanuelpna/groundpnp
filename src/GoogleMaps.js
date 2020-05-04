class GoogleMaps {
  constructor(element, google) {
    this.googleMaps = google.maps;
    this.juizDeFora = { lat: -21.7557364, lng: -43.3596817 };

    this.element = element;

    this.map = false;

    this.customMarker = class CustomMarker extends google.maps.OverlayView {
      constructor(coordinates, map, content) {
        super();
        this.markerElement = false;
        this.content = content;
        this.coordinates = coordinates;

        this.setMap(map);
      }

      onAdd() {
        this.markerElement = document.createElement('div');
        this.markerElement.classList.add('marker');
        this.markerElement.innerHTML = this.content;

        this.getPanes().overlayImage.appendChild(this.markerElement);
      }

      draw() {
        const position = this.getProjection().fromLatLngToDivPixel(
          this.coordinates
        );

        this.markerElement.style.left = position.x + 'px';
        this.markerElement.style.top = position.y + 'px';
      }

      onRemove() {
        this.markerElement.parentNode.removeChild(this.markerElement);
      }
    };
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

      const customMarker = new this.customMarker(
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
