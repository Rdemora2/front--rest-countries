<template>
  <div>
    <navbar />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script>
export default {
  components: {
  Navbar: '~/components/navbar.vue',
  Footer: '~/components/footer.vue'
}
}
</script>