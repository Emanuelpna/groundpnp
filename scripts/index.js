Number.prototype.formatPrice = function (price) {
  return this.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

feather.replace({ class: 'checkIcon', width: 26, height: 26 });

const daysSpentTraveling = new DaySpan();
daysSpentTraveling.bind(
  document.querySelector('#checkin'),
  document.querySelector('#checkout'),
  document.querySelector('.order')
);

document.querySelector('.places').addEventListener('click', (e) => {
  const clickedElement = e.target;

  const parentElement =
    clickedElement.className === 'placeCover'
      ? clickedElement.parentElement.parentElement
      : clickedElement.parentElement;

  const allPlacesSelecteds = document.querySelectorAll(`.place.selected`);
  [...allPlacesSelecteds].forEach((place) => {
    place.className = 'place';
  });

  if (parentElement.className && parentElement.className === 'place') {
    parentElement.className = 'place selected';

    const bedroomPrice = parentElement
      .querySelector('.placePrice')
      .getAttribute('data-price');

    daysSpentTraveling.setBedroomPrice(bedroomPrice);
  }
});

document.querySelector('.places').addEventListener('mouseover', (e) => {
  const clickedElement = e.target;

  const parentElement =
    clickedElement.className === 'place'
      ? clickedElement
      : clickedElement.className === 'placeCover'
      ? clickedElement.parentElement.parentElement
      : clickedElement.parentElement;

  const allMarkers = document.querySelectorAll(`.marker`);
  [...allMarkers].forEach((marker) => {
    marker.className = 'marker';
  });

  if (parentElement.className && parentElement.className === 'place') {
    const placeID = parentElement.getAttribute('data-id');

    const marker = document.querySelector(`.marker[data-id="${placeID}"]`);

    if (marker.className === 'marker') {
      marker.className = 'marker active';
    }
  }
});
