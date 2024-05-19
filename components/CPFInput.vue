<template>
    <div class="mt-3">
      <label for="cpf">{{ label }}</label>
      <UInput
        type="text"
        id="cpf"
        v-model="formattedCPF"
        @input="formatCPF"
        required
      />
      <p v-if="cpfInvalid" class="text-red-500 text-sm mt-1">CPF inválido</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { cpf } from 'cpf-cnpj-validator';
  
  const formattedCPF = ref('');
  const cpfInvalid = ref(false);
  const label = 'CPF';
  
  const formatCPF = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const unformattedCPF = input.value.replace(/[^\d]/g, '');
    const formatted = cpf.format(unformattedCPF);
    formattedCPF.value = formatted;
    input.value = formatted;
    validateCPF()
  };

const validateCPF = () => {
  const isValidCPF = cpf.isValid(formattedCPF.value);
  cpfInvalid.value = !isValidCPF;
  if (!isValidCPF) {
    console.error('CPF inválido');
    return;
  }
};

  </script>
  
  <style scoped>
  .min-value-warning {
    color: red;
    margin-top: 5px;
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: white;
  }
  </style>
  