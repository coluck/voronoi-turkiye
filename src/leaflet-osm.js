let map = L.map("map", { zoomSnap: 0.25 }).setView([39, 35.5], 6.75);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

fetch("../data/tr_il_merkezleri.json")
  .then((response) => response.json())
  .then((points) => {
    let myIcon = L.divIcon({
      className: "dot",
      iconSize: [8, 8],
      iconAnchor: [4, 4],
    });

    L.geoJSON(points, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: myIcon });
      },
    }).addTo(map);
  });


fetch("../data/tr_voronoi.json")
  .then((response) => response.json())
  .then((polygons) => {
    let polygonsStyle = {
      weight: 1,
      fillOpacity: 0,
      color: "#000",
    };

    L.geoJSON(polygons, { style: polygonsStyle }).addTo(map);
  });
