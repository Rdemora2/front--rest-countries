<template>
  <div class="container mx-auto px-8 bg-gray-900 flex flex-wrap justify-center">
    <geo-chart :geojson="africaData"></geo-chart>
  </div>
</template>

<style scoped>
.container {
  max-width: 100%;
  height: calc(100vh - 7.3rem);
}
</style>

<script>
import { defineComponent } from "vue";
import GeoChart from "~/components/geoChart.vue";
import africaData from "~/public/data/geoJson/africa.geo.json";

export default defineComponent({
  components: {
    GeoChart,
  },
  data() {
    return {
      africaData: africaData,
    };
  },
});
</script>
