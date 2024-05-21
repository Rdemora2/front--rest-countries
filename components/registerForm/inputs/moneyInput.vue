<template>
  <div class="mt-3">
    <label :for="id">{{ label }}</label>
    <UInput
      type="text"
      :id="id"
      v-model="completeValue"
      @input="onInput"
      required
    />
    <p v-if="showMinValueWarning" class="text-red-500 text-sm mt-1">
      O valor mínimo é R$ 1.000,00
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { formatCurrency, checkMinimumValue } from "@/helpers/helpers";

const emits = defineEmits(["updateIncome", "showMinValueWarning"]);
const id = "income";
const inputValue = ref("");
const label = "Renda mensal";
const showMinValueWarning = ref(false);

function onInput(event: InputEvent): void {
  let value = (event.target as HTMLInputElement).value;

  if (!/^\d*\.?\d*$/.test(value)) {
    (event.target as HTMLInputElement).value = value.replace(/[^\d]/g, "");
    value = (event.target as HTMLInputElement).value;
  }

  const completeValue = formatCurrency(value);
  inputValue.value = completeValue;
  const isMinValue = checkMinimumValue(value);
  showMinValueWarning.value = isMinValue;
  emits("showMinValueWarning", isMinValue);
  emits("updateIncome", parseFloat(value.replace(/[^\d]/g, "")) / 100);
}

const completeValue = computed(() => inputValue.value);
</script>
