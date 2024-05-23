<template>
  <div class="container mx-auto px-8 py-8 bg-gray-900 min-h-screen flex flex-wrap justify-center">
    <div>
      <h1 class="text-white text-xl font-bold mb-4">Dados do Usuário</h1>
      <p class="text-white">Nome: {{ userData.name }}</p>
      <p class="text-white">Data de Nascimento: {{ userData.dob }}</p>
      <p class="text-white">CPF: {{ userData.cpf }}</p>
      <p class="text-white">Tipo de Animal de Estimação: {{ userData.petType }}</p>
      <!-- Adicione mais campos conforme necessário -->
    </div>
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
