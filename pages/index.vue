<template>
  <div>
    <NotRegisteredHome v-if="!isRegistered" />
    <RegisteredHome v-else />
  </div>
</template>

<script setup>
import NotRegisteredHome from "@/components/index/notRegisteredHome.vue";
import RegisteredHome from "@/components/index/registeredHome.vue";

let isRegistered = ref(process.client ? localStorage.getItem("registered") === "true" : false);

const checkLocalStorage = () => {
  const newValue = process.client ? localStorage.getItem("registered") === "true" : false;
  
  if (newValue !== isRegistered.value) {
    isRegistered.value = newValue;
  }
  
  setTimeout(checkLocalStorage, 1000);
};

checkLocalStorage();

watchEffect(() => {
  checkLocalStorage();
});
</script>

<style scoped>
.min-h-screen {
  min-height: calc(100vh - 7.3rem);
}
</style>
