<template>
  <div
    class="w-screen max-w-full min-h-screen flex items-center justify-center"
  >
    <UForm
      class="w-5/6 lg:w-1/4"
      :state="formData"
      @submit.prevent="handleSubmit"
    >
      <Step1 v-if="currentstep === 1" />
      <Step2 v-else-if="currentstep === 2" />
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { formData, handleSubmit, step } from "../helpers/helpers";
import Step1 from "@/components/registerForm/steps/step1.vue";
import Step2 from "@/components/registerForm/steps/step2.vue";

let currentstep = ref(1);
currentstep = step;
</script>

<style scoped>
.min-h-screen {
  min-height: calc(100vh - 7.3rem);
}
</style>
