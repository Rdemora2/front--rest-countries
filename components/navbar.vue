<template>
  <div class="w-full bg-blue h-24">
    <UHorizontalNavigation :links="links" class="flex justify-center items-center h-full">
      <template #default="{ link }">
        <span class="group-hover:text-primary relative text-lg md:text-xl lg:text-2xl xl:text-3xl">
          {{ link.label }}
            </span>
          </template>
        </UHorizontalNavigation>
  </div>
  </template>
  
  <script setup lang="ts">
  const route = useRoute()
  
  const links = [{
    label: 'Home',
    to: '/'
  }, {
    label: 'Register',
    to: '/register'
  }, {
    label: 'Countries',
    to: '/countries'
  }, {
    label: 'Search',
    to: '/search'
  }, {
    label: 'Chart',
    to: '/chart'
  }]
  </script>
  