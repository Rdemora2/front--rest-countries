<template>
  <div>
    <div class="mt-3">
      <label for="name">Nome Completo</label>
      <UInput id="name" v-model="formData.name" required />
    </div>
    <p
      v-if="!formData.name && nextStepClicked"
      class="text-red-500 text-sm mt-1"
    >
      Campo obrigatório
    </p>
    <DateOfBirthInput v-model="formData.dob" />
    <p
      v-if="!formData.dob && nextStepClicked"
      class="text-red-500 text-sm mt-1"
    >
      Campo obrigatório
    </p>
    <CPFInput
      @updateCpf="updateCpfFromChild"
      @cpfInvalid="cpfInvalid = $event"
    />
    <p
      v-if="!formData.cpf && nextStepClicked"
      class="text-red-500 text-sm mt-1"
    >
      Campo obrigatório
    </p>
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
    <p
      v-if="!formData.petType && nextStepClicked"
      class="text-red-500 text-sm mt-1"
    >
      Campo obrigatório
    </p>
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
    <p
      v-if="!formData.petBreed && nextStepClicked"
      class="text-red-500 text-sm mt-1"
    >
      Campo obrigatório
    </p>
    <div class="mt-3" v-if="formData.petBreed === 'outro'">
      <label for="otherBreed">Outro</label>
      <UInput
        type="text"
        id="otherBreed"
        v-model="formData.otherBreed"
        required
      />
    </div>
    <p
      v-if="
        formData.petBreed === 'outro' && !formData.otherBreed && nextStepClicked
      "
      class="text-red-500 text-sm mt-1"
    >
      Campo obrigatório
    </p>
    <MoneyInput
      @updateIncome="updateIncomeFromChild"
      @showMinValueWarning="showMinValueWarning = $event"
    />
    <p
      v-if="!formData.income && nextStepClicked"
      class="text-red-500 text-sm mt-1"
    >
      Campo obrigatório
    </p>
    <UButton class="mb-5 mt-5" @click="nextStep">Próximo</UButton>
  </div>
</template>

<script setup lang="ts">
import MoneyInput from "../inputs/moneyInput.vue";
import CPFInput from "../inputs/CPFInput.vue";
import DateOfBirthInput from "../inputs/DateOfBirthInput.vue";
import {
  nextStep,
  updateBreeds,
  updateCpfFromChild,
  updateIncomeFromChild,
  cpfInvalid,
  showMinValueWarning,
  formData,
  petBreeds,
  nextStepClicked,
} from "@/helpers/helpers";
</script>
