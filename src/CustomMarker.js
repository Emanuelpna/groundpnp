// const createCustomMarker = function (coordinates, map, content) {
//   let CustomMarker = function() {};

//   CustomMarker.prototype = new google.maps.OverlayView();

//   CustomMarker.markerElement = false;
//   CustomMarker.content = content;
//   CustomMarker.coordinates = coordinates;

//   CustomMarker.setMap(map);

//   CustomMarker = function () {

//     return {
//       onAdd() {
//         this.markerElement = document.createElement('div');
//         this.markerElement.classList.add('marker');
//         this.markerElement.innerHTML = this.content;

//         this.getPanes().overlayImage.appendChild(this.markerElement);
//       },

//       draw() {
//         const position = this.getProjection().fromLatLngToDivPixel(
//           this.coordinates
//         );

//         this.markerElement.style.left = position.x + 'px';
//         this.markerElement.style.top = position.y + 'px';
//       },

//       onRemove() {
//         this.markerElement.parentNode.removeChild(this.markerElement);
//       },
//     };
//   };

//   return new CustomMarker();
// };


