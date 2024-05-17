<template>
    <div>
      <h6>{{ label }}</h6>
      <UInput
        type="text"
        :id="id"
        v-model="formattedValue"
        @input="onInput"
        required
      />
      <p v-if="showMinValueWarning" class="min-value-warning">O valor mínimo é R$ 1.000,00</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  
  const id = 'income';
  const inputValue = ref('');
  const label = 'Renda mensal';
  const showMinValueWarning = ref(false);
  
  function formatarMoeda(valor: string): string {
    // Remove todos os caracteres não numéricos
    const valorNumerico = valor.replace(/[^\d]/g, '');
  
    // Formata o valor
    let valorFormatado = (parseFloat(valorNumerico) / 100).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    valorFormatado = `R$ ${valorFormatado}`;
    return valorFormatado;
  }
  
  function verificarValorMinimo(valor: string): void {
    const valorNumerico = parseFloat(valor.replace(/[^\d]/g, ''));
    if (valorNumerico < 1000) {
      showMinValueWarning.value = true;
    } else {
      showMinValueWarning.value = false;
    }
  }
  
  function onInput(event: InputEvent): void {
    let valor = (event.target as HTMLInputElement).value;
  
    // Verifica se o valor contém apenas números
    if (!/^\d*\.?\d*$/.test(valor)) {
      (event.target as HTMLInputElement).value = valor.replace(/[^\d]/g, '');
      valor = (event.target as HTMLInputElement).value;
    }
  
    const valorFormatado = formatarMoeda(valor);
    inputValue.value = valorFormatado;
    verificarValorMinimo(valor);
  }
  
  const formattedValue = computed(() => inputValue.value);
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
  