<template>
  <div class="w-full bg-blue h-18">
    <UHorizontalNavigation
      v-if="isRegistered"
      :links="filteredLinks"
      class="flex justify-center items-center h-full"
    >
      <template #default="{ link }">
        <span
        class="group-hover:text-primary relative text-base md:text-base lg:text-lg xl:text-lg"
        >
          {{ link.label }}
        </span>
      </template>
    </UHorizontalNavigation>
    <UHorizontalNavigation
      v-else
      :links="links"
      class="flex justify-center items-center h-full"
    >
      <template #default="{ link }">
        <span
          class="group-hover:text-primary relative text-base md:text-base lg:text-lg xl:text-lg"
        >
          {{ link.label }}
        </span>
      </template>
    </UHorizontalNavigation>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const links = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Cadastrar",
    to: "/register",
  },
  {
    label: "Países",
    to: "/countries",
  },
  {
    label: "Gráfico",
    to: "/chart",
  },
  {
    label: "Buscar",
    to: "/search",
  },
];

const filteredLinks = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Países",
    to: "/countries",
  },
  {
    label: "Gráfico",
    to: "/chart",
  },
  {
    label: "Buscar",
    to: "/search",
  },
];

let isRegistered = ref(process.client ? localStorage.getItem("registered") === "true" : false);

const checkLocalStorage = () => {
  const newValue = process.client ? localStorage.getItem("registered") === "true" : false;
  
  if (newValue !== isRegistered.value) {
    isRegistered.value = newValue;
  }
  
  setTimeout(checkLocalStorage, 1000);
};

checkLocalStorage();

watchEffect(() => {
  checkLocalStorage();
});
</script>
