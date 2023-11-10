import { defineStore } from 'pinia'

export const useGames = defineStore('games', {
  state: () => ({ games: [
    {
      id:1,
      title:"Jogo da memória",
      meta:'game',
      to:'memory',
      img:'memory_game'
    },
    {
      id:2,
      title:"Acerte os números",
      meta:'game',
      to:'numbers',
      img:'/img/numbers_game.svg'
    }
  ]}),
 
})
