localizarUsuario();
// creat icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

// creat map
function localizarUsuario() {
  if (window.navigator && window.navigator.geolocation) {
    var geolocation = window.navigator.geolocation;
    geolocation.getCurrentPosition(sucesso, erro);
  }
  function sucesso(posicao) {
    var latitude = posicao.coords.latitude;
    var longitude = posicao.coords.longitude;

    const map = L.map("mapid").setView([latitude, longitude], 15);

    // create and add tileLayer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    const orphanagesSpan = document.querySelectorAll(".orphanages span");

    orphanagesSpan.forEach((span) => {
      const orphanage = {
        id: span.dataset.id,
        name: span.dataset.name,
        lat: span.dataset.lat,
        lng: span.dataset.lng,
      };

      addMarker(orphanage, map);
    });
  }
  function erro(error) {
    console.log(error);
  }
}

function addMarker({ id, name, lat, lng }, map) {
  // creat popup overlay
  const popup = L.popup({
    closeButton: false,
    className: "map-popup",
    minWidth: 240,
    minHeight: 240,
  }).setContent(
    `${name} <a href="/orphanage?id=${id}"><img src="/images/arrow-white.svg" > </a>`
  );

  // create and add marker

  L.marker([lat, lng], { icon }).addTo(map).bindPopup(popup);
}
