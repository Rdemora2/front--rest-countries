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
      <h2 v-if="showResults && countries.length > 0">Resultados da Busca:</h2>
      <ul v-if="showResults">
        <li v-for="country in countries" :key="country.cca3">
          <hr class="my-2" />
          <p class="text-green-400"><strong>País:</strong></p>
          <h3>{{ country.name }}</h3>
          <p class="text-green-400"><strong>Idioma:</strong></p>
          <ul
            v-for="(lang, code) in country.languages"
            @click="fetchCountriesByLanguage(lang)"
          >
            <li :key="code" class="cursor-pointer text-blue-500">
              {{ lang }}
            </li>
          </ul>
        </li>
      </ul>
      <p v-if="countries.length <= 0">Nenhum país encontrado.</p>
    </div>

    <div
      v-if="modalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-blue p-8 rounded-lg overflow-auto">
        <h2 class="text-xl font-bold mb-4 text-green-400">
          Países que falam {{ selectedLanguage }}
        </h2>
        <ul>
          <li v-for="country in paginatedCountries" :key="country.cca3">
            {{ country.name }}
          </li>
        </ul>
        <div class="flex justify-between mt-4">
          <UButton
            @click="prevPage"
            :disabled="currentPage === 1"
            class="mx-2 text-blue-500"
            >Anterior</UButton
          >
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <UButton
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="mx-2 text-blue-500"
            >Próxima</UButton
          >
        </div>
        <UButton @click="modalOpen = false" class="mt-4 text-blue-500"
          >Fechar</UButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { searchCountry, searchCountriesByLanguage } from "../services/api";

export default {
  name: "CountrySearch",
  setup() {
    const query = ref("");
    const countries = ref([]);
    const countriesByLanguage = ref([]);
    const selectedLanguage = ref("");
    const modalOpen = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = ref(10);

    const onSearch = async () => {
      if (query.value.length > 2) {
        countries.value = await searchCountry(query.value);
        countriesByLanguage.value = [];
      } else {
        countries.value = [];
      }
    };

    const languageMap = {
      Africâner: "Afrikaans",
      Albanês: "Albanian",
      Amárico: "Amharic",
      Árabe: "Arabic",
      Armênio: "Armenian",
      Azerbaijano: "Azerbaijani",
      Basco: "Basque",
      Bielorrusso: "Belarusian",
      Bengali: "Bengali",
      Bósnio: "Bosnian",
      Búlgaro: "Bulgarian",
      Catalão: "Catalan",
      Cebuano: "Cebuano",
      Chichewa: "Chichewa",
      Chinês: "Chinese",
      Córsico: "Corsican",
      Croata: "Croatian",
      Tcheco: "Czech",
      Dinamarquês: "Danish",
      Holandês: "Dutch",
      Inglês: "English",
      Esperanto: "Esperanto",
      Estoniano: "Estonian",
      Filipino: "Filipino",
      Finlandês: "Finnish",
      Francês: "French",
      Frísio: "Frisian",
      Galego: "Galician",
      Georgiano: "Georgian",
      Alemão: "German",
      Grego: "Greek",
      Guzerate: "Gujarati",
      Haitiano: "Haitian Creole",
      Hausa: "Hausa",
      Havaiano: "Hawaiian",
      Hebraico: "Hebrew",
      Hindi: "Hindi",
      Hmong: "Hmong",
      Húngaro: "Hungarian",
      Islandês: "Icelandic",
      Igbo: "Igbo",
      Indonésio: "Indonesian",
      Irlandês: "Irish",
      Italiano: "Italian",
      Japonês: "Japanese",
      Javanês: "Javanese",
      Canarês: "Kannada",
      Cazaque: "Kazakh",
      Khmer: "Khmer",
      Kinyarwanda: "Kinyarwanda",
      Coreano: "Korean",
      "Curdo (Kurmanji)": "Kurdish (Kurmanji)",
      Quirguiz: "Kyrgyz",
      Laosiano: "Lao",
      Latim: "Latin",
      Letão: "Latvian",
      Lituano: "Lithuanian",
      Luxemburguês: "Luxembourgish",
      Macedônio: "Macedonian",
      Malgaxe: "Malagasy",
      Malaio: "Malay",
      Malaiala: "Malayalam",
      Maltês: "Maltese",
      Maori: "Maori",
      Marata: "Marathi",
      Mongol: "Mongolian",
      "Mianmarense (Birmanês)": "Myanmar (Burmese)",
      Nepalês: "Nepali",
      Norueguês: "Norwegian",
      Pastó: "Pashto",
      Persa: "Persian",
      Polonês: "Polish",
      Português: "Portuguese",
      Panjabi: "Punjabi",
      Romeno: "Romanian",
      Russo: "Russian",
      Samoano: "Samoan",
      "Gaélico Escocês": "Scots Gaelic",
      Sérvio: "Serbian",
      "Soto do Sul": "Sesotho",
      Shona: "Shona",
      Sindhi: "Sindhi",
      Cingalês: "Sinhala",
      Eslovaco: "Slovak",
      Esloveno: "Slovenian",
      Somali: "Somali",
      Espanhol: "Spanish",
      Sundanês: "Sundanese",
      Suaíli: "Swahili",
      Sueco: "Swedish",
      Tadjique: "Tajik",
      Tâmil: "Tamil",
      Telugo: "Telugu",
      Tailandês: "Thai",
      Turco: "Turkish",
      Ucraniano: "Ukrainian",
      Urdu: "Urdu",
      Uzbeque: "Uzbek",
      Vietnamita: "Vietnamese",
      Galês: "Welsh",
      Xhosa: "Xhosa",
      Iídiche: "Yiddish",
    };

    const fetchCountriesByLanguage = async (language) => {
      const apiLanguage = languageMap[language];
      if (apiLanguage) {
        selectedLanguage.value = language;
        countriesByLanguage.value = await searchCountriesByLanguage(
          apiLanguage
        );
        modalOpen.value = true;
        currentPage.value = 1;
      } else {
        console.error("Language not supported by API:", language);
      }
    };

    const paginatedCountries = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return countriesByLanguage.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(countriesByLanguage.value.length / itemsPerPage.value);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    };

    const showResults = ref(false);

    return {
      query,
      countries,
      countriesByLanguage,
      selectedLanguage,
      onSearch,
      fetchCountriesByLanguage,
      showResults,
      modalOpen,
      paginatedCountries,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
    };
  },
  watch: {
    query(value) {
      this.showResults = value.length > 0;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
