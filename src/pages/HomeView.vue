 <template>
  <div  class="w-full h-full justify-center items-center flex">
    <div class="w-44 h-44" v-if="step==='init'">
      <img src="/img/logo.svg" />
    </div>
    <init-component v-else :steps="stepObjects"/>
  </div>
 </template>
 <script>
import initComponent from '@/components/initComponent.vue';
 export default {
  components: { initComponent },
  data(){
    return{
      step:'init',
      stepObjects:[
      {
        id:1,
        title:"Bem Vindo(a)",
        text:'Os Jogos mais divertidos reunidos em um só lugar',
        image:'/img/lampada.svg',
        position:1,
      },
      {
        id:2,
        title: "Competir",
        text:'Dispute pontuações ou jogue com seus amigos',
        image:'/img/espada.svg',
        position:2,
      },
      {
        id:3,
        title:"Vencer",
        text:'Escale no ranking jogando seus jogos favoritos',
        image:'/img/trofeus.svg',
        position:3,
      }
      ]
    }
  },
  mounted(){
    setTimeout(() => {
      this.step = 'welcome'
    }, 2000);
  }
 }
 </script>
 <style lang="">
  
 </style>