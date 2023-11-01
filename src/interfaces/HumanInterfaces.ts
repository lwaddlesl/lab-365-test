export interface HumanResponse {
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
  species: any[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
  detail?: string
}

export type Human = HumanResponse & { isFavorite?: boolean }
