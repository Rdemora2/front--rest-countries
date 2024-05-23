<template>
  <div
    class="container mx-auto px-8 py-8 bg-gray-900 min-h-screen flex flex-wrap justify-center"
  >
    <q-page>
      <l-map v-if="!loading" :markers="markers" :geojsonData="geojsonData" />
    </q-page>
  </div>
</template>

<style scoped>
.container {
  max-width: 100%;
  min-height: calc(100vh - 7.3rem);
}
</style>

<script>
import { defineComponent, ref, onMounted } from "vue";
import LMap from "~/components/geoChart.vue";
import africaData from "~/public/data/geoJson/africa.geo.json";

export default defineComponent({
  name: "MapPage",
  components: {
    LMap,
  },
  setup() {
    const markers = ref([]);
    const loading = ref(true);
    const geojsonData = ref(africaData);

    onMounted(() => {
      loading.value = false;
    });

    return {
      markers,
      loading,
      geojsonData,
    };
  },
});
</script>
