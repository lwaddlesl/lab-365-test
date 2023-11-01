<script setup lang="ts">
import { usePeoples } from '@/hooks/usePeoples'
import { onMounted, onUnmounted, ref } from 'vue'

const searchTerm = ref('')
const showDropdown = ref(false)
const dropdownRef = ref<HTMLDivElement | null>(null)

const { peoplesFetching, loading, error, peoples } = usePeoples()

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  peoplesFetching('https://swapi.dev/api/people/?search=' + searchTerm.value)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
const searchHandler = () => {
  showDropdown.value = true
  peoplesFetching('https://swapi.dev/api/people/?search=' + searchTerm.value)
}
</script>

<template>
  <div class="search-dropdown" ref="dropdownRef">
    <input
      v-model="searchTerm"
      @input="searchHandler"
      @focus="showDropdown = true"
      tabindex="0"
      placeholder="Search..."
    />
    <ul v-show="showDropdown">
      <div v-if="!loading && !error">
        <li
          v-for="people in peoples"
          :key="people.url"
          @click="$router.push(`/people/${people.id}`)"
        >
          <span>
            {{ people.name }}
          </span>
        </li>
      </div>
      <div v-else-if="loading">Loading...</div>
      <div v-else-if="!loading && error" class="error">{{ error }}</div>
    </ul>
  </div>
</template>

<style scoped>
.search-dropdown {
  position: relative;
  margin-bottom: 10px;
  width: fit-content;
}

.search-dropdown input {
  width: 300px;
  padding: 5px;
  border-radius: 5px;
  background-color: gray;
  border: 1px solid var(--color-border);
}
::placeholder {
  color: rgb(205, 205, 205);
}

.search-dropdown ul {
  position: absolute;
  top: 100%;
  left: 0;
  border-radius: 5px;
  width: 300px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  padding: 0;
  margin: 0;
  list-style: none;
}

.search-dropdown ul li {
  padding: 5px;
  cursor: pointer;
  border: 1px solid var(--color-border);
}

.search-dropdown ul li:hover {
  background: var(--color-background);
}
.error {
  padding: 5px;
  color: red;
}
</style>
