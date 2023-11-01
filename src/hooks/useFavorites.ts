import { ref } from 'vue'
import type { People } from '@/interfaces/PeopleInterfaces'

export const useFavorites = () => {
  const favoritePeoples = ref(
    JSON.parse(localStorage.getItem('favoritePeoples') || '[]') as People[]
  )

  const addToFavorites = (people: People) => {
    favoritePeoples.value.push(people)
    people.isFavorite = true
    localStorage.setItem('favoritePeoples', JSON.stringify(favoritePeoples.value))
  }

  const removeFromFavorites = (people: People) => {
    favoritePeoples.value = favoritePeoples.value.filter((el) => el.url !== people.url)
    people.isFavorite = false
    localStorage.setItem('favoritePeoples', JSON.stringify(favoritePeoples.value))
  }

  return { favoritePeoples, addToFavorites, removeFromFavorites }
}
