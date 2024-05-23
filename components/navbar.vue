<template>
  <div class="w-full bg-blue h-18 flex flex-row">
    <div class="w-1/6">

    </div>

    <UHorizontalNavigation v-if="isRegistered" :links="filteredLinks"
      class="flex justify-center items-center h-full w-4/6">
      <template #default="{ link }">
        <span class="group-hover:text-primary relative text-base md:text-base lg:text-lg xl:text-lg">
          {{ link.label }}
        </span>
      </template>
    </UHorizontalNavigation>
    <UHorizontalNavigation v-else :links="links" class="flex justify-center items-center h-full">
      <template #default="{ link }">
        <span class="group-hover:text-primary relative text-base md:text-base lg:text-lg xl:text-lg">
          {{ link.label }}
        </span>
      </template>
    </UHorizontalNavigation>

    <div class="w-1/6 flex flex-row h-full align-center">
      <a @click="toggleUserMenu">
        <UAvatar size="md" alt="Benjamin Canac" />
      </a>
      <UModal v-model="userMenuOpen" position="top-right">
        <template #trigger="{ open }">
          <UButton icon="user" @click="open" />
        </template>
        <div class="bg-white p-4">
          <ul>
            <li>
              <UButton @click="viewProfile">Ver Meus Dados</UButton>
            </li>
            <li>
              <UButton @click="logout">Sair</UButton>
            </li>
          </ul>
        </div>
      </UModal>
    </div>
  </div>
</template>

<style scoped>
.flex-row {
  flex-direction: row;
  align-self: center
}
</style>

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
let userMenuOpen = ref(false);

const checkLocalStorage = () => {
  const newValue = process.client ? localStorage.getItem("registered") === "true" : false;

  if (newValue !== isRegistered.value) {
    isRegistered.value = newValue;
  }

  setTimeout(checkLocalStorage, 1000);
};

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value;
};

const viewProfile = () => {
  // Lógica para visualizar os dados do usuário
};

const logout = () => {
  // Lógica para fazer logout do usuário
};

checkLocalStorage();

watchEffect(() => {
  checkLocalStorage();
});
</script>
