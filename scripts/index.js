console.log('<<: Prazer em ter você aqui! :>>');
console.log(
  'Se quiser conhecer melhor meus outros trabalhos dá uma olhada em: https://github.com/Emanuelpna e em https://www.linkedin.com/in/emanuelpna'
);
console.log('Ícones por: https://feathericons.com/');
console.log('<<: Obrigado! :>>');

// Adiciona método de formatação de preço para números do JS
Number.prototype.formatPrice = function (price) {
  return this.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

// Ativa o Feather Icons
feather.replace({ class: 'checkIcon', width: 26, height: 26 });

// Inicia o calculador de tempo de estadia
const daysSpentTraveling = new DaySpan();
daysSpentTraveling.bind(
  document.querySelector('#checkin'),
  document.querySelector('#checkout'),
  document.querySelector('.order'),
  document.querySelector('.places')
);

(async () => {
  // Cria o mapa centralziado em Juiz de Fora e coloca na div com id 'map'
  const map = L.map('map').setView([-21.7534716, -43.3365406], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Instancia os a classe de Localizações
  const placesModel = new Places(document.querySelector('.places'));

  // Carrega a primeira página
  await placesModel.getPlaces();

  // Cria os marcadores e coloca no mapa
  const markers = placesModel.places.map((place) => {
    return {
      id: place.id,
      marker: L.marker([place.latitude, place.longitude], {
        riseOnHover: true,
      })
        .addTo(map)
        .bindPopup(place.price.formatPrice()),
    };
  });

  // Adiciona o popUp no hover dos cards de Localização
  placesModel.setMarkerHighlight(markers);

  /** Adiciona os eventos de paginação */
  const pageControllerLeft = document.querySelector('.pageController.left');
  const pageControllerRight = document.querySelector('.pageController.right');

  pageControllerLeft.addEventListener('click', (e) => {
    placesModel.changeToPreviousPage(pageControllerLeft, pageControllerRight);
  });

  pageControllerRight.addEventListener('click', () => {
    placesModel.changeToNextPage(pageControllerLeft, pageControllerRight);
  });
})();
