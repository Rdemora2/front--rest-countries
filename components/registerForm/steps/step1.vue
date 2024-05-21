<template>
  <div>
    <div class="mt-3">
      <label for="name">Nome Completo</label>
      <UInput id="name" v-model="formData.name" required />
    </div>
    <div class="mt-3">
      <label for="dob">Data de Nascimento</label>
      <UInput type="date" id="dob" v-model="formData.dob" required />
    </div>
    <CPFInput
      @updateCpf="updateCpfFromChild"
      @cpfInvalid="cpfInvalid = $event"
    />
    <div class="mt-3">
      <label for="pet">Espécie do Pet</label>
      <USelect
        id="pet"
        v-model="formData.petType"
        :options="['Cão', 'Gato']"
        @change="updateBreeds"
        class="custom-select"
        required
      />
    </div>
    <div class="mt-3">
      <label for="breed">Raça do Pet</label>
      <USelect
        id="breed"
        v-model="formData.petBreed"
        :options="petBreeds"
        class="custom-select"
        required
      />
    </div>
    <div class="mt-3" v-if="formData.petBreed === 'outro'">
      <label for="otherBreed">Outro</label>
      <UInput
        type="text"
        id="otherBreed"
        v-model="formData.otherBreed"
        required
      />
    </div>
    <MoneyInput
      @updateIncome="updateIncomeFromChild"
      @showMinValueWarning="showMinValueWarning = $event"
    />
    <UButton class="mb-5 mt-5" @click="nextStep">Próximo</UButton>
  </div>
</template>

<script setup lang="ts">
import MoneyInput from "../inputs/moneyInput.vue";
import CPFInput from "../inputs/CPFInput.vue";
import {
  nextStep,
  updateBreeds,
  updateCpfFromChild,
  updateIncomeFromChild,
  cpfInvalid,
  showMinValueWarning,
  formData,
  petBreeds,
} from "@/helpers/helpers";
</script>
