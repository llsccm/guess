export interface SearchResult {
  name: string
  id: number
}

export interface Character {
  id: number
  name: string
  sex: number
  country: number
  hp: number
  skill: number
  skillType: string[]
  skillTag: string[]
}

export interface GuessData {
  id: {
    value: number
    class: string
  }
  name: {
    value: string
    class: string
  }
  sex: {
    value: number
    class: string
  }
  country: {
    value: number
    class: string
  }
  hp: {
    value: number
    class: string
  }
  skill: {
    value: number
    class: string
  }
  skillType: { value: string; class: string }[]
  skillTag: { value: string; class: string }[]
}
