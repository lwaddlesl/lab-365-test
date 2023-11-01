<script setup lang="ts">
import UniversalTable from '@/components/UniversalTable.vue'
import { useFavorites } from '@/hooks/useFavorites'
import usePeopleStore from '@/stores/people'

const peopleStore = usePeopleStore()
const { favoritePeoples, removeFromFavorites } = useFavorites()
</script>

<template>
  <main>
    <universal-table
      :personTitles="peopleStore.personTitles"
      :peoples="favoritePeoples"
      :nameLink="true"
      @removeFromFavorites="removeFromFavorites"
      v-if="favoritePeoples.length"
    />
    <span v-else>favorite peoples is empty</span>
  </main>
</template>
