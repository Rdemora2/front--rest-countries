<template>
  <div>
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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

    onMounted(() => {
      createMapLayer();
    });

    onBeforeUnmount(() => {
      if (map) {
        map.remove();
      }
    });

    const createMapLayer = () => {
      map = L.map("mapContainer").setView([-26.8560346, -49.239189], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      if (props.geojson) {
        setGeoJSON();
      }
    };

    const setGeoJSON = () => {
      geojsonLayer = L.geoJSON(props.geojson).addTo(map);
      map.fitBounds(geojsonLayer.getBounds());
    };
  },
});
</script>

<style scoped>
#mapContainer {
  width: 100vw;
  height: calc(100vh - 50px);
}
</style>
