<template>
  <div class="container mx-auto px-8 py-8 bg-gray-900 min-h-screen flex flex-wrap justify-center">
    <CountrySearch />
    </div>
</template>

<style scoped>
.container {
  max-width: 100%;
  min-height: calc(100vh - 7.3rem);
}
</style>

<script>
import CountrySearch from '~/components/CountrySearch.vue';

export default {
  components: {
    CountrySearch,
  },
};
</script>