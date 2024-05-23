<template>
  <div class="container mx-auto px-8 py-8 bg-gray-900 min-h-screen flex flex-wrap justify-center">
    <UCard>
      <template #header>
        <h1 class="text-white text-xl font-bold mb-4">Dados do Usuário</h1>
        <Placeholder class="h-8" />
      </template>
      <Placeholder class="h-32" />
      <p class="text-white">Nome: {{ userData.name }}</p>
      <p class="text-white">Data de Nascimento: {{ userData.dob }}</p>
      <p class="text-white">CPF: {{ userData.cpf }}</p>
      <p class="text-white">Tipo de Animal: {{ userData.petType }}</p>
      <p v-if="userData.petBreed != Outro" class="text-white">Raça: {{ userData.petBreed }}</p>
      <p v-if="userData.petBreed === Outro" class="text-white">Raça: {{ userData.otherBreed }}</p>
      <template #footer>
        <Placeholder class="h-8" />
        <p class="text-white">CEP: {{ userData.cep }}</p>
        <p v-if="userData.street != ''" class="text-white">Rua: {{ userData.street }}</p>
        <p v-if="userData.neighborhood != ''" class="text-white">Bairro: {{ userData.neighborhood }}</p>
        <p v-if="userData.city != ''" class="text-white">Cidade: {{ userData.city }}</p>
        <p v-if="userData.state != ''" class="text-white">UF: {{ userData.state }}</p>
      </template>
    </UCard>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const userData = ref({});

const getLocalStorageData = () => {
  const localStorageData = localStorage.getItem('formData');
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
