<template>
    <div>
      <h6>{{ label }}</h6>
      <UInput
        type="text"
        :id="id"
        v-model="formattedValue"
        @input="formatarMoeda"
        required
      />
      <p v-if="showMinValueWarning" class="min-value-warning">O valor mínimo é R$ 1.000,00</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  
  const id = 'income';
  const value = ref('');
  const label = 'Campo formatado Moeda';
  const showMinValueWarning = ref(false);
  
  function formatarMoeda(event: InputEvent) {
    const valor = (event.target as HTMLInputElement).value;
  
    const valorNumerico = valor.replace(/\D/g, '');
  
    if (parseInt(valorNumerico) < 100000) {
      showMinValueWarning.value = true;
      return;
    }
  
    showMinValueWarning.value = false;
  
    let valorFormatado = (parseFloat(valorNumerico) / 100).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    
    valorFormatado = `R$ ${valorFormatado}`;
  
    value.value = valorFormatado;
  }
  
  const formattedValue = computed(() => value.value);
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