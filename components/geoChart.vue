<template>
  <div class="container mx-auto px-8 flex flex-col justify-center h-96 w-4/6">
    <div id="mapContainer"></div>
    <div id="info" class="info"></div>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const props = defineProps({
  geojson: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

let map = null;
let geojsonLayer = null;

const fetchCountriesData = async () => {
  try {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,population"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching API data:", error);
    return [];
  }
};

const createMapLayer = (countriesData) => {
  map = L.map("mapContainer").setView([-26.8560346, -49.239189], 5);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  if (props.geojson && countriesData.length > 0) {
    const countriesGeojson = filterCountriesGeojson(
      props.geojson,
      countriesData
    );
    setGeoJSON(countriesGeojson);
  }
};

const filterCountriesGeojson = (geojson, countriesData) => {
  const countryPopulationMap = {};
  countriesData.forEach((country) => {
    countryPopulationMap[country.name.common] = country.population;
  });

  const nameMapping = {
    "Dem. Rep. Congo": "DR Congo",
    Congo: "Republic of the Congo",
    "Côte d'Ivoire": "Ivory Coast",
    "S. Sudan": "South Sudan",
    eSwatini: "Lesotho",
    Somaliland: "Somalia",
    "W. Sahara": "Western Sahara",
    "Central African Rep.": "Central African Republic",
    "Falkland Is.": "Falkland Islands",
    "Cayman Is.": "Cayman Islands",
    "United States of America": "United States",
    "St. Vin. and Gren.": "Saint Vincent and the Grenadines",
    "Antigua and Barb.": "Antigua and Barbuda",
    "St. Kitts and Nevis": "Saint Kitts and Nevis",
    "St-Barthélemy": "Saint Barthélemy",
    "St-Martin": "Saint Martin",
    "U.S. Virgin Is.": "United States Virgin Islands",
    "British Virgin Is.": "British Virgin Islands",
    "St-Martin": "Saint Martin",
  };

  geojson.features.forEach((feature) => {
    const countryName = feature.properties.name;
    const mappedName = nameMapping[countryName] || countryName;
    feature.properties.population =
      countryPopulationMap[mappedName] || "Data not available";
  });

  return geojson;
};

const setGeoJSON = (countriesGeojson) => {
  if (geojsonLayer) {
    map.removeLayer(geojsonLayer);
  }
  geojsonLayer = L.geoJSON(countriesGeojson, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);

  map.fitBounds(geojsonLayer.getBounds());
};

const updateGeoJSONLayer = async (newGeojson) => {
  const countriesData = await fetchCountriesData();
  const filteredGeojson = filterCountriesGeojson(newGeojson, countriesData);
  setGeoJSON(filteredGeojson);
};

const getColor = (population) => {
  return population > 100000000
    ? "#800026"
    : population > 50000000
    ? "#BD0026"
    : population > 20000000
    ? "#E31A1C"
    : population > 10000000
    ? "#FC4E2A"
    : population > 5000000
    ? "#FD8D3C"
    : population > 2000000
    ? "#FEB24C"
    : population > 1000000
    ? "#FED976"
    : "#FFEDA0";
};

const style = (feature) => {
  return {
    fillColor: getColor(feature.properties.population),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
};

const onEachFeature = (feature, layer) => {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  });
};

const highlightFeature = (e) => {
  const layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  layer.bringToFront();

  const info = document.getElementById("info");
  info.innerHTML = `<h4>${layer.feature.properties.name}</h4>${layer.feature.properties.population} habitantes`;
};

const resetHighlight = (e) => {
  geojsonLayer.resetStyle(e.target);

  const info = document.getElementById("info");
  info.innerHTML = "";
};

const zoomToFeature = (e) => {
  map.fitBounds(e.target.getBounds());
};

onMounted(async () => {
  const countriesData = await fetchCountriesData();
  createMapLayer(countriesData);
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
  }
});

watchEffect(() => {
  if (props.geojson) {
    updateGeoJSONLayer(props.geojson);
  }
});
</script>

<style scoped>
#mapContainer {
  height: calc(80vh - 7.3rem);
}

.info {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  color: white;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  height: 5vh;
}
</style>
