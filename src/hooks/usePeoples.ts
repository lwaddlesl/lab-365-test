import { useFavorites } from './useFavorites'
import type { People, PeopleResponse } from '@/interfaces/PeopleInterfaces'
import { ref } from 'vue'

export const usePeoples = () => {
  const peoples = ref([] as People[])
  const loading = ref(false)
  const nextPage = ref(null as null | string)
  const previousPage = ref(null as null | string)
  const error = ref('')
  const { favoritePeoples } = useFavorites()
  const peoplesFetching = (url: string) => {
    loading.value = true
    fetch(url)
      .then((res) => res.json())
      .then((data: PeopleResponse) => {
        if (data.results && data.results.length) {
          peoples.value = data.results
          nextPage.value = data.next
          previousPage.value = data.previous
          for (const people of peoples.value) {
            people.isFavorite = favoritePeoples.value.some((el) => el.url === people.url)
            people.id = people.url.split('/').filter(Boolean).pop()
          }
          error.value = ''
        } else {
          peoples.value = []
          error.value = 'No data'
        }
        loading.value = false
      })
      .catch((err) => {
        error.value = err
        loading.value = false
      })
  }
  return { peoples, loading, error, nextPage, previousPage, peoplesFetching }
}
