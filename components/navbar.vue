<template>
  <div class="w-full bg-blue h-18 flex flex-row">
    <div class="w-1/6"></div>

    <UHorizontalNavigation
      v-if="isRegistered"
      :links="filteredLinks"
      class="flex justify-center items-center h-full w-4/6"
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

    <div class="hv w-1/6 flex flex-row h-full align-center">
      <UDropdown
        class="drop"
        v-if="isRegistered"
        :items="dropdownItems"
        :popper="{ placement: 'bottom-start' }"
      >
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

.drop {
  transition: border-color 0.3s ease-in-out;
  border: 3px solid transparent;
  border-radius: 9999px;
}

.drop:hover {
  border-color: rgb(74, 222, 128);
}
</style>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";

const dropdownItems = ref([
  [
    {
      label: "Olá, usuário",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Meus dados",
      icon: "i-heroicons-user-solid",
      to: "/userData",
    },
  ],
  [
    {
      label: "Sair",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => logout(),
      to: "/",
    },
  ],
]);

const links = [
  { label: "Home", to: "/" },
  { label: "Cadastrar", to: "/register" },
  { label: "Países", to: "/countries" },
  { label: "Mapa demográfico", to: "/demographicMap" },
  { label: "Buscar", to: "/search" },
];

const filteredLinks = [
  { label: "Home", to: "/" },
  { label: "Países", to: "/countries" },
  { label: "Mapa demográfico", to: "/demographicMap" },
  { label: "Buscar", to: "/search" },
];

let isRegistered = ref(
  process.client ? localStorage.getItem("registered") === "true" : false
);
let userName = ref("");

const getUserDataFromLocalStorage = () => {
  if (process.client) {
    const formDataJson = localStorage.getItem("formData");
    if (formDataJson) {
      const formData = JSON.parse(formDataJson);
      userName.value = formData.name;
      isRegistered.value = true;
      dropdownItems.value[0][0].label = `Olá, ${userName.value}`;
    }
  }
};

const checkLocalStorage = () => {
  const newValue = process.client
    ? localStorage.getItem("registered") === "true"
    : false;
  if (newValue !== isRegistered.value) {
    isRegistered.value = newValue;
  }
  setTimeout(checkLocalStorage, 1000);
};

const checkUserNameLocalStorage = () => {
  if (process.client) {
    const formDataJson = localStorage.getItem("formData");
    if (formDataJson) {
      const formData = JSON.parse(formDataJson);
      const newValue = formData.name;
      if (newValue !== userName.value) {
        userName.value = newValue;
      }
    }
  }
  setTimeout(checkUserNameLocalStorage, 3000);
};

const logout = () => {
  localStorage.removeItem("registered");
  localStorage.removeItem("formData");
  isRegistered.value = false;
  userName.value = "";
  dropdownItems.value[0][0].label = "";
};

onMounted(() => {
  getUserDataFromLocalStorage();
  checkLocalStorage();
  checkUserNameLocalStorage();
});

watchEffect(() => {
  checkLocalStorage();
  checkUserNameLocalStorage();
});
</script>
