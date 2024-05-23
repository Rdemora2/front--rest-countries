<template>
  <div class="container mx-auto px-8 flex flex-col justify-center h-96 w-4/6">
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

export default defineComponent({
  name: "LMap",
  props: {
    geojson: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  setup(props) {
    let map = null;
    let geojsonLayer = null;

    onMounted(async () => {
      const countriesData = await fetchCountriesData();
      createMapLayer(countriesData);
    });

    onBeforeUnmount(() => {
      if (map) {
        map.remove();
      }
    });

    const fetchCountriesData = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,population"
        );
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
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
        const countriesGeojson = filterCountriesGeojson(props.geojson, countriesData);
        setGeoJSON(countriesGeojson);
      }
    };

    const filterCountriesGeojson = (geojson, countriesData) => {
      const countryPopulationMap = {};
      countriesData.forEach(country => {
        countryPopulationMap[country.name.common] = country.population;
      });

      geojson.features.forEach(feature => {
        const countryName = feature.properties.name;
        if (countryPopulationMap.hasOwnProperty(countryName)) {
          feature.properties.population = countryPopulationMap[countryName];
        }
      });

      return geojson;
    };

    const setGeoJSON = (countriesGeojson) => {
      geojsonLayer = L.geoJSON(countriesGeojson, {
        style: style,
        onEachFeature: onEachFeature
      }).addTo(map);

      map.fitBounds(geojsonLayer.getBounds());
    };

    // Obtém a cor dependendo da população
    function getColor(population) {
      return population > 100000000 ? '#800026' :
             population > 50000000  ? '#BD0026' :
             population > 20000000  ? '#E31A1C' :
             population > 10000000  ? '#FC4E2A' :
             population > 5000000   ? '#FD8D3C' :
             population > 2000000   ? '#FEB24C' :
             population > 1000000   ? '#FED976' : '#FFEDA0';
    }

    // Estilo do país no mapa
    function style(feature) {
      return {
        fillColor: getColor(feature.properties.population),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      };
    }

    // Adiciona eventos aos países
    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
      });
    }

    // Destaque do país ao passar o mouse
    function highlightFeature(e) {
      const layer = e.target;

      layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
      });

      layer.bringToFront();
    }

    function resetHighlight(e) {
      geojsonLayer.resetStyle(e.target);
    }

    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
    }
  },
});
</script>

<style scoped>
#mapContainer {
  height: calc(80vh - 7.3rem);
}
</style>
