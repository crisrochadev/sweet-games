<template>

  <div class="w-full h-full overflow-hidden p-4">
    <div class="grid grid-cols-2 justify-center items-end gap-4 my-8">
      <router-link
        :to="{ name: game.pagename, params: { uid: $route.params.uid } }"
        v-for="game in games"
        :key="game.id"
        class="w-full bg-white shadow-md flex hover:bg-accet transition-all delay-100 focus:bg-accet flex-col justify-start items-center p-2"
      >
        <img
          :src="'/img/' + game.img + '.svg'"
          class="w-11/12"
          :title="game.title"
        />
      </router-link>
    </div>
  </div>
</template>
<script>
export default {

  data() {
    return {
      games: [
        {
          id: 1,
          name: "Jogo da memória",
          pagename: "memory",
          img: "memory",
        },
        {
          id: 2,
          name: "Acerte os números",
          pagename: "numbers",
          img: "numbers",
        },
        {
          id: 3,
          name: "Jogo da velha",
          pagename: "tic-tac-toe",
          img: "tic-tac-toe",
        },
        {
          id: 4,
          name: "Que palavra é",
          pagename: "word",
          img: "word",
        },
      ],
    };
  },
 

};
</script>
<style lang=""></style>
