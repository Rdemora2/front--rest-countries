<template>
  <div class="container mx-auto px-8 bg-gray-900 flex flex-col justify-around">
    <div class="selector-container mx-auto mt-5">
      <h1></h1>
      <label for="continentSelector" class="text-white"
        >Selecione o continente:</label
      >
      <select id="continentSelector" v-model="selectedContinent">
        <option value="África">Africa</option>
        <option value="América">Americas</option>
        <option value="Ásia">Asia</option>
        <option value="Europa">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <UButton @click="updateGeoJson" class="update-button">Ver dados</UButton>
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
    const selectedContinent = ref("Ásia");
    const geojsonData = ref(asiaData);

    const geoJsonFiles = {
      África: africaData,
      América: americasData,
      Ásia: asiaData,
      Europa: europeData,
      Oceania: oceaniaData,
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

.update-button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #4caf50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

.update-button:hover {
  background-color: #45a049;
}
</style>
