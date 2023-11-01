import { defineStore } from 'pinia'
import type { People } from '@/interfaces/PeopleInterfaces'
import type { Human } from '@/interfaces/HumanInterfaces'

const usePeopleStore = defineStore('people', () => {
  const personTitles: (keyof People)[] = ['name', 'height', 'mass', 'hair_color']
  const humanTitles: (keyof Human)[] = [
    'name',
    'height',
    'mass',
    'hair_color',
    'skin_color',
    'eye_color',
    'birth_year',
    'gender'
  ]
  return { personTitles, humanTitles }
})
export default usePeopleStore
