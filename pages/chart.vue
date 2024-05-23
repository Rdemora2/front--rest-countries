<template>
  <div class="container mx-auto px-8 bg-gray-900 flex flex-col justify-center">
    <div class="selector-container">
      <label for="continentSelector" class="text-white">Select Continent:</label>
      <select id="continentSelector" v-model="selectedContinent" @change="updateGeoJson">
        <option value="africa">Africa</option>
        <option value="americas">Americas</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
    </div>
    <geo-chart :geojson="geojsonData"></geo-chart>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import GeoChart from "~/components/geoChart.vue";
import africaData from "~/public/data/geoJson/africa.geo.json";
import americasData from "~/public/data/geoJson/americas.geo.json";
import asiaData from "~/public/data/geoJson/asia.geo.json";
import europeData from "~/public/data/geoJson/europe.geo.json";
import oceaniaData from "~/public/data/geoJson/oceania.geo.json";

export default defineComponent({
  components: {
    GeoChart,
  },
  setup() {
    const selectedContinent = ref("africa");
    const geojsonData = ref(africaData);

    const geoJsonFiles = {
      africa: africaData,
      americas: americasData,
      asia: asiaData,
      europe: europeData,
      oceania: oceaniaData,
    };

    const updateGeoJson = () => {
      geojsonData.value = geoJsonFiles[selectedContinent.value];
    };

    return {
      selectedContinent,
      geojsonData,
      updateGeoJson,
    };
  },
});
</script>

<style scoped>
.container {
  max-width: 100%;
  height: calc(100vh - 7.3rem);
}

.selector-container {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

#continentSelector {
  margin-left: 10px;
  padding: 5px;
}
</style>
