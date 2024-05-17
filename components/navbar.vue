<template>
    <div class="w-full flex justify-center items-center h-24">
      <UHorizontalNavigation :links="links" class="w-full flex justify-center items-center h-full">
        <template #default="{ link }">
          <span class="group-hover:text-primary relative" style="font-size: 1.5rem;">
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
  