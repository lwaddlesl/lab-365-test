export interface PeopleResponse {
  count: number
  next: null | string
  previous: null | string
  results: PeopleFetch[]
}

export interface PeopleFetch {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

type PeopleAdditionalProperties = {
  isFavorite?: boolean
  id?: string
}
export type People = PeopleFetch & PeopleAdditionalProperties
