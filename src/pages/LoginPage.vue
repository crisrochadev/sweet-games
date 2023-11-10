<template>
  <spinner v-if="loading" />
  <div v-else class="w-full h-full flex justify-center items-center flex-col">
    <div class="flex-1 flex justify-center items-center flex-col gap-8 px-4">
      <div class="w-44 h-44">
        <img src="/img/logo.svg" />
      </div>
      <h2 class="text-2xl font-bold">Vamos Jogar</h2>
      <p class="text-xl text-[#424242]">
        Por favor faça login ou cadastre-se para jogar.
      </p>
    </div>
    <div
      class="w-full h-[200px] flex justify-start items-center px-4 flex-col gap-2"
    >
      <button
        @click="login('google')"
        class="border flex justify-center items-center border-[#eb4335] w-full h-[50px] gap-4 rounded cursor-pointer"
      >
        <img src="/img/google.svg" alt="google" class="w-6 h-6" />
        <span>Entrar com google</span>
      </button>
      <!-- <button @click="store.login('facebook')" class="border flex justify-center items-center border-[#0c86ee] w-full h-[50px] gap-2 rounded cursor-pointer">
            <img src="/img/facebook.svg" alt="facebook" class="w-6 h-6">
            <span>Entrar com facebook</span>
        </button> -->
    </div>
  </div>
</template>
<script>
import { useAuth } from "@/store/auth";
import Spinner from "@/components/Spinner.vue";
export default {
  components: { Spinner },
  data() {
    const store = useAuth();
    return { store, loading:false };
  },
  methods:{
   async login(provider){
      this.loading = true
      await this.store.login(provider)
      this.loading = false
    }
  }
};
</script>
<style lang=""></style>
