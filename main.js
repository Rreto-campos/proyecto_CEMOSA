let map = L.map('map').setView([-9.19, -75.0152], 5);

// Capa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

let markersLayer = L.geoJSON(null, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(
      `<strong>${feature.properties.name}</strong><br>` +
      `Categoría: ${feature.properties.category}<br>` +
      `Año: ${feature.properties["Año"]}<br>` +
      `Departamento: ${feature.properties["Departamento"]}`
    );
  }
}).addTo(map);

let allFeatures = [];

fetch('data/stores.geojson')
  .then(response => response.json())
  .then(data => {
    allFeatures = data.features;
    updateMap('all');
  });

function updateMap(category) {
  markersLayer.clearLayers();
  let filtered = allFeatures.filter(f => category === 'all' || f.properties.category === category);
  markersLayer.addData(filtered);
}

document.getElementById('filter').addEventListener('change', function () {
  updateMap(this.value);
});
