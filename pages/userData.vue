<template>
  <div
    class="container mx-auto px-8 py-8 bg-gray-900 min-h-screen flex flex-wrap flex-col justify-center"
  >
    <UCard class="w-fit p-3 mx-auto">
      <template #header>
        <h1 class="text-white text-2xl font-bold text-center">Dados:</h1>
        <Placeholder class="h-8" />
      </template>
      <Placeholder class="h-32" />
      <p class="text-white">
        <span class="font-bold text-green-400">Nome:</span>
        <span class="ml-2">{{ userData.name }}</span>
      </p>
      <p class="text-white">
        <span class="font-bold text-green-400">Nascimento:</span>
        <span class="ml-2">{{ userData.dob }}</span>
      </p>
      <p class="text-white">
        <span class="font-bold text-green-400">CPF:</span>
        <span class="ml-2">{{ userData.cpf }}</span>
      </p>
      <p class="text-white">
        <span class="font-bold text-green-400">Animal:</span>
        <span class="ml-2">{{ userData.petType }}</span>
      </p>
      <p v-if="userData.petBreed != 'Outro'" class="text-white">
        <span class="font-bold text-green-400">Raça:</span>
        <span class="ml-2">{{ userData.petBreed }}</span>
      </p>
      <p v-if="userData.petBreed === 'Outro'" class="text-white">
        <span class="font-bold text-green-400">Raça:</span>
        <span class="ml-2">{{ userData.otherBreed }}</span>
      </p>
      <template #footer>
        <Placeholder class="h-8" />
        <p class="text-white">
          <span class="font-bold text-green-400">CEP:</span>
          <span class="ml-2">{{ userData.cep }}</span>
        </p>
        <p v-if="userData.street != ''" class="text-white">
          <span class="font-bold text-green-400">Rua:</span>
          <span class="ml-2">{{ userData.street }}</span>
        </p>
        <p v-if="userData.neighborhood != ''" class="text-white">
          <span class="font-bold text-green-400">Bairro:</span>
          <span class="ml-2">{{ userData.neighborhood }}</span>
        </p>
        <p v-if="userData.city != ''" class="text-white">
          <span class="font-bold text-green-400">Cidade:</span>
          <span class="ml-2">{{ userData.city }}</span>
        </p>
        <p v-if="userData.state != ''" class="text-white">
          <span class="font-bold text-green-400">Estado:</span>
          <span class="ml-2">{{ userData.state }}</span>
        </p>
      </template>
    </UCard>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const userData = ref({});

const getLocalStorageData = () => {
  const localStorageData = localStorage.getItem("formData");
  if (localStorageData) {
    userData.value = JSON.parse(localStorageData);
  }
};

onMounted(() => {
  getLocalStorageData();
});
</script>

<style scoped>
.container {
  max-width: 100%;
  min-height: calc(100vh - 7.3rem);
}
</style>
