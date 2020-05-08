const CustomMarker = function (coordinates, map, content, markerID) {
  const CustomMarker = function (coordinates, map, content, markerID) {
    this.markerElement = false;
    this.content = content;
    this.coordinates = coordinates;
    this.markerID = markerID;

    this.setMap(map);
  };

  CustomMarker.prototype = new google.maps.OverlayView();

  CustomMarker.prototype.onAdd = function () {
    this.markerElement = document.createElement('div');
    
    this.markerElement.classList.add('marker');

    this.markerElement.innerHTML = this.content;

    this.markerElement.setAttribute('data-id', this.markerID);

    this.getPanes().overlayImage.appendChild(this.markerElement);
  };

  CustomMarker.prototype.draw = function () {
    const position = this.getProjection().fromLatLngToDivPixel(
      this.coordinates
    );

    this.markerElement.style.left = position.x + 'px';
    this.markerElement.style.top = position.y + 'px';
  };

  CustomMarker.prototype.onRemove = function () {
    this.markerElement.parentNode.removeChild(this.markerElement);
  };

  return new CustomMarker(coordinates, map, content, markerID);
};
