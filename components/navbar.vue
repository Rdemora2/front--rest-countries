<template>
  <div class="w-full bg-blue h-18 flex flex-row">
    <div class="w-1/6"></div>

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
      <UDropdown v-if="isRegistered" :items="dropdownItems" :popper="{ placement: 'bottom-start' }">
        <UAvatar :size="'md'" :alt="userName" />
      </UDropdown>
    </div>
  </div>
</template>

<style scoped>
.flex-row {
  flex-direction: row;
  align-self: center;
}
</style>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';

const dropdownItems = ref([
  [{
    label: 'Olá, usuário',
    slot: 'account',
    disabled: true
  }], [{
    label: 'Meus dados',
    icon: 'i-heroicons-user-solid',
    click: () => viewProfile()
  }, {
    label: 'Ver repositório',
    icon: 'i-heroicons-computer-desktop-20-solid'
  }], [{
    label: 'Sair',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: () => logout()
  }]
]);

const links = [
  { label: "Home", to: "/" },
  { label: "Cadastrar", to: "/register" },
  { label: "Países", to: "/countries" },
  { label: "Gráfico", to: "/chart" },
  { label: "Buscar", to: "/search" },
];

const filteredLinks = [
  { label: "Home", to: "/" },
  { label: "Países", to: "/countries" },
  { label: "Gráfico", to: "/chart" },
  { label: "Buscar", to: "/search" },
];

let isRegistered = ref(process.client ? localStorage.getItem("registered") === "true" : false);
let userMenuOpen = ref(false);
let userName = ref("");
let petType = ref("");

const getUserDataFromLocalStorage = () => {
  if (process.client) {
    const formDataJson = localStorage.getItem("formData");
    if (formDataJson) {
      const formData = JSON.parse(formDataJson);
      userName.value = formData.name;
      petType.value = formData.petType
      isRegistered.value = true;
      dropdownItems.value[0][0].label = `Olá, ${userName.value}`;
    }
  }
};

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
  alert(`Nome: ${userName.value}\n, dono de um ${petType.value}\n`);
};

const logout = () => {
  localStorage.removeItem("registered");
  localStorage.removeItem("formData");
  isRegistered.value = false;
  userName.value = "";
  dropdownItems.value[0][0].label = "rob@example.com";
};

onMounted(() => {
  getUserDataFromLocalStorage();
  checkLocalStorage();
});

watchEffect(() => {
  checkLocalStorage();
});
</script>
