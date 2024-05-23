<template>
  <div class="container mx-auto p-4 text-center">
    <UInput
      icon="i-heroicons-magnifying-glass-20-solid"
      size="sm"
      color="white"
      placeholder="Digite o nome de um país"
      class="rounded p-2 w-full"
      v-model="query"
      @input="onSearch"
    />
    <div v-if="showResults" class="mt-4">
      <h2 v-if="showResults">Resultados da Busca:</h2>
      <ul v-if="showResults">
        <li v-for="country in countries" :key="country.cca3">
          <p><strong>País:</strong></p>
          <h3>{{ country.name }}</h3>
          <p><strong>Idioma:</strong></p>
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
          <hr class="my-2">
        </li>
      </ul>
    </div>

    <div v-if="countriesByLanguage.length || query === ''" class="mt-4">
      <h2 v-if="countriesByLanguage.length">Países que falam {{ selectedLanguage }}:</h2>
      <ul v-if="countriesByLanguage.length">
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
      } else {
        countries.value = [];
      }
    };

    const fetchCountriesByLanguage = async (language) => {
      selectedLanguage.value = language;
      countriesByLanguage.value = await searchCountriesByLanguage(language);
    };

    const showResults = ref(false);

    return {
      query,
      countries,
      countriesByLanguage,
      selectedLanguage,
      onSearch,
      fetchCountriesByLanguage,
      showResults
    };
  },
  watch: {
    query(value) {
      this.showResults = value.length > 0;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
