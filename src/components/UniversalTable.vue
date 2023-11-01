<script setup lang="ts">
import type { People } from '@/interfaces/PeopleInterfaces'

interface Props {
  peoples: People[]
  personTitles: (keyof People)[]
  previousPage?: string | null
  nextPage?: string | null
  nameLink?: Boolean
}

defineProps<Props>()
defineEmits(['peoplesFetching', 'addToFavorites', 'removeFromFavorites'])
</script>

<template>
  <table>
    <tr>
      <th v-for="title in personTitles" :key="title">
        {{ title }}
      </th>
      <th>favorites</th>
    </tr>
    <tr v-for="people in peoples" :key="people.url">
      <td v-for="title in personTitles" :key="title">
        <router-link v-if="nameLink && title === 'name'" :to="`/people/${people.id}`">
          {{ people[title] }}
        </router-link>
        <span v-else>
          {{ people[title] }}
        </span>
      </td>
      <td>
        <button v-if="people.isFavorite" @click="$emit('removeFromFavorites', people)">
          Remove from favorites
        </button>
        <button v-else @click="$emit('addToFavorites', people)">Add to favorites</button>
      </td>
    </tr>
    <td v-if="nextPage || previousPage" :colspan="personTitles.length + 1">
      <div class="pagination">
        <div>
          <button v-if="previousPage" @click="$emit('peoplesFetching', previousPage)">
            previous page
          </button>
        </div>
        <div>
          <button v-if="nextPage" @click="$emit('peoplesFetching', nextPage)">next page</button>
        </div>
      </div>
    </td>
  </table>
</template>

<style scoped>
table {
  width: 100%;
}
.pagination {
  display: flex;
  justify-content: space-between;
}
</style>
