<template>
  <div class="mt-3">
    <label for="cpf">{{ label }}</label>
    <UInput
      type="text"
      id="cpf"
      v-model="formattedCPF"
      @input="handleInput"
      required
    />
    <p v-if="cpfInvalid" class="text-red-500 text-sm mt-1">CPF inválido</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { validateCPF } from "@/helpers/helpers";

const emits = defineEmits(["cpfInvalid", "updateCpf"]);
const label = "CPF";
const formattedCPF = ref("");
const cpfInvalid = ref(false);

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const { formatted, isValid } = validateCPF(input.value);
  formattedCPF.value = formatted;
  cpfInvalid.value = !isValid;
  emits("updateCpf", formatted);
  emits("cpfInvalid", !isValid);

  input.value = formatted;
};
</script>
