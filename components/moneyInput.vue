<template>
    <div>
      <label class="mt-3">{{ label }}</label>
      <UInput
        type="text"
        :id="id"
        v-model="formatedValue"
        @input="onInput"
        required
      />
      <p v-if="showMinValueWarning" class="min-value-warning">O valor mínimo é R$ 1.000,00</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, defineEmits } from 'vue';
  
  const emits = defineEmits(['updateIncome']);
  const id = 'income';
  const inputValue = ref('');
  const label = 'Renda mensal';
  const showMinValueWarning = ref(false);
  
  function formatarMoeda(valor: string): string {
    const valorNumerico = valor.replace(/[^\d]/g, '');
  
  const numericFormatedValue = (parseFloat(valorNumerico) / 100).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
  const formatedValue = `R$ ${numericFormatedValue}`;
  const formatNumber = parseFloat(valorNumerico) / 100;
  const formatedNumber = Math.floor(formatNumber);
  emits('updateIncome', formatedNumber);
  return formatedValue; 
}
  
  function verificarValorMinimo(valor: string): void {
    const valorNumerico = parseFloat(valor.replace(/[^\d]/g, ''));
    if (valorNumerico < 100000) {
      showMinValueWarning.value = true;
    } else {
      showMinValueWarning.value = false;
    }
  }
  
  function onInput(event: InputEvent): void {
    let valor = (event.target as HTMLInputElement).value;
  
    if (!/^\d*\.?\d*$/.test(valor)) {
      (event.target as HTMLInputElement).value = valor.replace(/[^\d]/g, '');
      valor = (event.target as HTMLInputElement).value;
    }
  
    const valorFormatado = formatarMoeda(valor);
    inputValue.value = valorFormatado;
    verificarValorMinimo(valor);
  }
  
  const formatedValue = computed(() => inputValue.value);
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
  