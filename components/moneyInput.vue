<template>
  <div>
    <label class="mt-3">{{ label }}</label>
    <UInput
      type="text"
      :id="id"
      v-model="completeValue"
      @input="onInput"
      required
    />
    <p v-if="showMinValueWarning" class="min-value-warning">
      O value mínimo é R$ 1.000,00
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";

const emits = defineEmits(["updateIncome", "showMinValueWarning"]);
const id = "income";
const inputValue = ref("");
const label = "Renda mensal";
const showMinValueWarning = ref(false);

function checkMinimumValue(value: string): void {
  const valueNumeric = parseFloat(value.replace(/[^\d]/g, ""));
  if (valueNumeric < 100000) {
    showMinValueWarning.value = true;
  } else {
    showMinValueWarning.value = false;
  }
}

function formatCurrency(value: string): string {
  const valueNumeric = value.replace(/[^\d]/g, "");

  const numericFormatedValue = (parseFloat(valueNumeric) / 100)
    .toFixed(2)
    .replace(".", ",")
    .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
  const completeValue = `R$ ${numericFormatedValue}`;
  const formatedNumber = parseFloat(valueNumeric) / 100;
  const formFormatNumber = Math.floor(formatedNumber);
  emits("updateIncome", formFormatNumber);
  emits("showMinValueWarning", showMinValueWarning.value);
  return completeValue;
}

function onInput(event: InputEvent): void {
  let value = (event.target as HTMLInputElement).value;

  if (!/^\d*\.?\d*$/.test(value)) {
    (event.target as HTMLInputElement).value = value.replace(/[^\d]/g, "");
    value = (event.target as HTMLInputElement).value;
  }

  const valueFormatted = formatCurrency(value);
  inputValue.value = valueFormatted;
  checkMinimumValue(value);
}

const completeValue = computed(() => inputValue.value);
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
