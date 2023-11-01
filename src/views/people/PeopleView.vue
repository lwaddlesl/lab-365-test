<script setup lang="ts">
import { onMounted } from 'vue'
import UniversalTable from '@/components/UniversalTable.vue'
import SearchDropdown from '@/components/SearchDropdown.vue'
import { useFavorites } from '@/hooks/useFavorites'
import { usePeoples } from '@/hooks/usePeoples'
import usePeopleStore from '@/stores/people'

const peopleStore = usePeopleStore()
const { addToFavorites, removeFromFavorites } = useFavorites()
const { loading, peoples, error, nextPage, previousPage, peoplesFetching } = usePeoples()

onMounted(() => {
  peoplesFetching('https://swapi.dev/api/people/')
})
</script>

<template>
  <main>
    <div class="dropdown-wrapper">
      <SearchDropdown />
    </div>
    <universal-table
      :personTitles="peopleStore.personTitles"
      :peoples="peoples"
      :nameLink="true"
      :nextPage="nextPage"
      :previousPage="previousPage"
      @removeFromFavorites="removeFromFavorites"
      @addToFavorites="addToFavorites"
      @peoplesFetching="peoplesFetching"
      v-if="!loading"
    />
    <div v-else>Loading...</div>
    <div class="error" v-if="error">{{ error }}</div>
  </main>
</template>
<style scoped>
main {
  display: flex;
  flex-direction: column;
}
.dropdown-wrapper {
  display: flex;
  justify-content: center;
}
.error {
  color: red;
}
</style>
