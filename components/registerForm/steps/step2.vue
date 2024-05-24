<template>
  <div>
    <div class="mt-3">
      <label for="cep">CEP</label>
      <UInput
        type="text"
        id="cep"
        v-model="formData.cep"
        @change="fetchAddress"
        required
      />
    </div>
    <p v-if="!formData.cep && submitClicked" class="text-red-500 text-sm mt-1">Campo obrigatório</p>
    <div class="mt-3">
      <label for="street">Rua</label>
      <UInput
        type="text"
        id="street"
        v-model="formData.street"
        required
      />
    </div>
    <p v-if="!formData.street && submitClicked" class="text-red-500 text-sm mt-1">Campo obrigatório</p>
    <div class="mt-3">
      <label for="neighborhood">Bairro</label>
      <UInput
        type="text"
        id="neighborhood"
        v-model="formData.neighborhood"
        required
      />
    </div>
    <p v-if="!formData.neighborhood && submitClicked" class="text-red-500 text-sm mt-1">Campo obrigatório</p>
    <div class="mt-3">
      <label for="city">Cidade</label>
      <UInput type="text" id="city" v-model="formData.city" required disabled />
    </div>
    <p v-if="!formData.income && submitClicked" class="text-red-500 text-sm mt-1">Campo obrigatório</p>
    <div class="mt-3">
      <label for="state">Estado</label>
      <UInput
        type="text"
        id="state"
        v-model="formData.state"
        maxlength="2"
        required
      />
    </div>
    <p v-if="!formData.state && submitClicked" class="text-red-500 text-sm mt-1">Campo obrigatório</p>
    <UButtonGroup size="xl" orientation="horizontal">
      <UButton class="mt-5 mr-5" @click="prevStep">Voltar</UButton>
      <UButton class="mt-5" @click="submitForm">Enviar</UButton>
    </UButtonGroup>
    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
        class="text-center h-80"
      >
        <template #header>
          <h3>Cadastro Efetuado com Sucesso!</h3>
          <Placeholder class="h-8" />
        </template>
        <p>Seu cadastro foi enviado com sucesso.</p>
        <Placeholder class="h-32" />

        <template #footer>
          <Placeholder class="h-8" />
          <UButton @click="closeModalAndRedirect">Fechar</UButton>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  prevStep,
  formData,
  fetchAddress,
  handleSubmit,
  submitClicked
} from "@/helpers/helpers";

let timerId: NodeJS.Timeout | null = null;
const isOpen = ref(false);
const router = useRouter();
const submitForm = () => {
  submitClicked.value = true;
  if (
    formData.value.cep &&
    formData.value.street &&
    formData.value.neighborhood &&
    formData.value.state
  ) {
    handleSubmit();
  isOpen.value = true;
  startTimer();
  }
};

const startTimer = () => {
  timerId = setTimeout(() => {
    redirectToIndex();
  }, 10000);
};

const closeModalAndRedirect = () => {
  isOpen.value = false;
  redirectToIndex();
};

const redirectToIndex = () => {
  isOpen.value = false;
  router.push('/');
};
</script>
