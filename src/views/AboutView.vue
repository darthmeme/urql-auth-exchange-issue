<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@urql/vue';

const result = useQuery({
  query: `
    query AllFilms {
      allFilms {
        films {
          id
          title
        }
      }
    }
  `,
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
