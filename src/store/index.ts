import type { TableProps } from 'tdesign-vue-next'
import http from '../api/request'
import type { Character, GuessData, SearchResult } from '../types/api'

interface game {
  answer: number
  currentSelection: number
  guessLeft: number
  tableData: TableProps<GuessData>['data']
  gameover: boolean
}

const gameInfo = ref<game>({
  answer: 0,
  currentSelection: 0,
  guessLeft: 8,
  tableData: [],
  gameover: false
})

const charactersMap = new Map<string, number>()

async function play() {
  gameInfo.value.gameover = false
  const res = await http.request<Character>({
    url: '/random',
    method: 'get'
  })

  if (res.code === 0) {
    gameInfo.value.guessLeft = 8
    gameInfo.value.tableData = []
    gameInfo.value.answer = res.data.id
  }
}

async function search(value: string) {
  const res = await http.request<SearchResult[]>({
    url: '/search',
    method: 'get',
    params: {
      keyword: value
    }
  })

  if (res.code === 0) {
    return res.data.map((Character) => {
      if (!charactersMap.has(Character.name)) charactersMap.set(Character.name, Character.id)

      return {
        id: Character.id,
        label: Character.name,
        avatar: `https://web.sanguosha.com/220/h5_2/res/runtime/pc/general/skinShop/${Character.id}00.png`
      }
    })
  }

  return []
}

function handelSelect(value: string) {
  gameInfo.value.currentSelection = charactersMap.get(value) || 0
}

async function guess() {
  gameInfo.value.guessLeft--

  if (gameInfo.value.guessLeft <= 0) {
    gameInfo.value.guessLeft = 0
    gameInfo.value.gameover = true
    return
  }

  const res = await http.request<GuessData>({
    url: '/comparisons',
    method: 'post',
    data: {
      curID: gameInfo.value.currentSelection,
      tarID: gameInfo.value.answer,
      version: 'ol'
    }
  })

  if (res.code === 0) {
    gameInfo.value.tableData?.push(res.data)
    gameInfo.value.gameover = gameInfo.value.currentSelection === gameInfo.value.answer
  }
}

export function useGameStore() {
  return { gameInfo, play, search, handelSelect, guess }
}
