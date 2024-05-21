<template>
  <div>
    <NotRegisteredHome v-if="!registered" />
    <RegisteredHome v-else />
  </div>
</template>

<script setup>
import NotRegisteredHome from "@/components/index/notRegisteredHome.vue";
import RegisteredHome from "@/components/index/registeredHome.vue";

const registered = process.client ? localStorage.getItem("registered") : null;
</script>

<style scoped>
.min-h-screen {
  min-height: calc(100vh - 9.73rem);
}
</style>
