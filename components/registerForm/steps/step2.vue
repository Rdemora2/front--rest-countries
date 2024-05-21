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
      <UButton class="mt-5" @click="handleSubmit">Enviar</UButton>
    </UButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { prevStep, formData, fetchAddress, handleSubmit } from "@/helpers/helpers";
</script>
