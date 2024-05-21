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
    <div class="mt-3">
      <label for="street">Rua</label>
      <UInput
        type="text"
        id="street"
        v-model="formData.street"
        required
        disabled
      />
    </div>
    <div class="mt-3">
      <label for="neighborhood">Bairro</label>
      <UInput
        type="text"
        id="neighborhood"
        v-model="formData.neighborhood"
        required
        disabled
      />
    </div>
    <div class="mt-3">
      <label for="city">Cidade</label>
      <UInput type="text" id="city" v-model="formData.city" required disabled />
    </div>
    <div class="mt-3">
      <label for="state">Estado</label>
      <UInput
        type="text"
        id="state"
        v-model="formData.state"
        maxlength="2"
        required
        disabled
      />
    </div>
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
          <UButton @click="isOpen">Fechar</UButton>
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
} from "@/helpers/helpers";

const isOpen = ref(false);

const submitForm = () => {
  handleSubmit();
  isOpen.value = true;
};
</script>
