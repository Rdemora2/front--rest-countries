<template>
  <div
    class="container mx-auto px-4 py-8 bg-gray-900 min-h-screen flex flex-wrap justify-center"
  >
    <UCard class="mb-12 mx-4 w-80 text-center">
      <template #header>
        <h2 class="text-2xl font-bold mb-4 text-white">Sobre o Projeto</h2>
      </template>
      <p class="text-lg text-gray-400 mb-4">
        Meu objetivo é criar uma aplicação web capaz de obter dados de uma API
        pública com informações de países e fornecer funcionalidades para
        cadastro de usuários.
      </p>
    </UCard>

    <UCard class="mb-12 mx-4 w-80 text-center">
      <template #header>
        <h2 class="text-2xl font-bold mb-4 text-white">Funcionalidades</h2>
      </template>
      <ul class="text-lg text-gray-400 list-disc pl-8 mb-4">
        <li>Formulário de cadastro com validação de dados.</li>
        <li>Visualização de países da América com suas capitais.</li>
        <li>Busca por país.</li>
        <li>
          Gráfico mostrando área e população de países por região geográfica.
        </li>
      </ul>
    </UCard>

    <UCard class="mb-12 mx-4 w-80 text-center">
      <template #header>
        <h2 class="text-2xl font-bold mb-4 text-white">
          Tecnologias Utilizadas
        </h2>
      </template>
      <ul class="text-lg text-gray-400 list-disc pl-8 mb-4">
        <li>Vue 3</li>
        <li>Nuxt 3</li>
        <li>Nuxt UI</li>
        <li>Leaflet</li>
      </ul>
    </UCard>
  </div>
</template>
