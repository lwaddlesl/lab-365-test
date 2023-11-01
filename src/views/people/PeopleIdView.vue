<script setup lang="ts">
import type { HumanResponse, Human } from '@/interfaces/HumanInterfaces'
import { onMounted, ref } from 'vue'
import { useFavorites } from '@/hooks/useFavorites'
import { useRoute } from 'vue-router'
import usePeopleStore from '@/stores/people'

const peopleStore = usePeopleStore()
const route = useRoute()

const { favoritePeoples, addToFavorites, removeFromFavorites } = useFavorites()
const loading = ref(false)
const human = ref({} as Human)
const error = ref('')
const humanFetching = (url: string) => {
  loading.value = true
  fetch(url)
    .then((res) => res.json())
    .then((data: HumanResponse) => {
      if (data.detail === 'Not found') {
        error.value = 'Not found'
        loading.value = false
      } else {
        human.value = data
        human.value.isFavorite = favoritePeoples.value.some((el) => el.url === human.value.url)
        error.value = ''
        loading.value = false
      }
    })
    .catch((err) => {
      error.value = err
      loading.value = false
    })
}
onMounted(() => {
  if (!isNaN(+route.params.id)) {
    humanFetching('https://swapi.dev/api/people/' + route.params.id)
  } else {
    error.value = 'id should be a number'
  }
})
</script>

<template>
  <main>
    <table v-if="!loading && !error">
      <tr>
        <th v-for="title in peopleStore.humanTitles" :key="title">
          {{ title }}
        </th>
        <th>favorite</th>
      </tr>
      <tr>
        <td v-for="title in peopleStore.humanTitles" :key="title">
          <div v-if="human && human[title]">
            {{ human[title] }}
          </div>
        </td>
        <td>
          <button v-if="human.isFavorite" @click="removeFromFavorites(human)">
            Remove from favorites
          </button>
          <button v-else @click="addToFavorites(human)">Add to favorites</button>
        </td>
      </tr>
    </table>
    <div v-else-if="!error">Loading...</div>
    <div class="error" v-if="error">{{ error }}</div>
  </main>
</template>
