<template>
  <div class="mt-3">
    <label for="dob">Data de Nascimento</label>
    <UInput
      type="date"
      id="dob"
      v-model="dob"
      @change="validateDateOfBirth"
      required
    />
    <p v-if="!validAge" class="text-red-500 text-sm mt-1">
      A idade deve estar entre 18 e 65 anos.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { formData, validateAge } from "@/helpers/helpers";

const dob = ref("");
let validAge = true;

function validateDateOfBirth(): void {
  const isoDate = new Date(dob.value).toISOString().split("T")[0];
  formData.value.dob = isoDate;
  validAge = validateAge(isoDate);
}
</script>
