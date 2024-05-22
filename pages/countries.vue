<template>
  <div
    class="container mx-auto px-4 py-8 bg-gray-900 min-h-screen flex flex-col flex-wrap justify-center"
  >
    <h1 class="text-left text-xl text-green-400 font-bold pb-8">
      Países da América
    </h1>
    <hr class="mb-8 border-green-400" />
    <div class="flex flex-row flex-wrap justify-around">
      <div
        v-for="country in countries"
        class="w-72 h-80 mb-9 mx-2 flex-row"
        :key="country.name.official"
      >
        <UCard class="w-72 h-80 text-center flex flex-col">
          <template #header>
            <img
              :src="country.flags.svg"
              :alt="`Bandeira de ${country.name.common}`"
              class="w-full h-40 object-cover mb-2"
            />
            <Placeholder class="h-8" />
          </template>
          <template #footer>
            <div class="flex flex-col justify-around h-20">
              <a @click="openGoogleMaps(country)">{{ country.name.common }}</a>
              <p>{{ country.capital[0] }}</p>
            </div>
            <Placeholder class="h-8" />
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 100%;
  min-height: calc(100vh - 9.73rem);
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { GridLayout } from "vue-grid-layout";

const countries = ref([]);

const fetchCountries = async () => {
  try {
    const response = await axios.get(
      "https://restcountries.com/v3.1/region/americas"
    );
    countries.value = response.data;
  } catch (error) {
    console.error("Erro ao obter países:", error);
  }
};

const openGoogleMaps = (country) => {
  if (country.name.official > 0) {
    const country = country.name.official;
    window.open(`https://www.google.com/maps/place/${conuntry}`, "_blank");
  } else {
    console.error("Capital não encontrada para o país:", country.name.official);
  }
};

fetchCountries();
</script>
