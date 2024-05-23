<template>
  <div>
    <geo-chart :geojson="africaData"></geo-chart>
  </div>
</template>

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
