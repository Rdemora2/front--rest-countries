<template>
  <div class="container mx-auto p-4">
    <UInput
      icon="i-heroicons-magnifying-glass-20-solid"
      size="sm"
      color="white"
      placeholder="Digite o nome de um país"
      class="rounded p-2 w-full"
      v-model="query"
      @input="onSearch"
    />
    <div v-if="countries.length" class="mt-4">
      <h2>Resultados da Busca:</h2>
      <ul>
        <li v-for="country in countries" :key="country.cca3">
          <h3>{{ country.name }}</h3>
          <p><strong>Idiomas:</strong></p>
          <ul>
            <li
              v-for="(lang, code) in country.languages"
              :key="code"
              @click="fetchCountriesByLanguage(lang)"
              class="cursor-pointer text-blue-500"
            >
              {{ lang }}
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div v-if="countriesByLanguage.length" class="mt-4">
      <h2>Países que falam {{ selectedLanguage }}:</h2>
      <ul>
        <li v-for="country in countriesByLanguage" :key="country.cca3">
          {{ country.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { searchCountry, searchCountriesByLanguage } from "../services/api";

export default {
  name: "CountrySearch",
  setup() {
    const query = ref("");
    const countries = ref([]);
    const countriesByLanguage = ref([]);
    const selectedLanguage = ref("");

    const onSearch = async () => {
      if (query.value.length > 2) {
        countries.value = await searchCountry(query.value);
        countriesByLanguage.value = [];
      }
    };

    const fetchCountriesByLanguage = async (language) => {
      selectedLanguage.value = language;
      countriesByLanguage.value = await searchCountriesByLanguage(language);
    };

    return {
      query,
      countries,
      countriesByLanguage,
      selectedLanguage,
      onSearch,
      fetchCountriesByLanguage,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
