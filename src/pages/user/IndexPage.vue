<template>
  <spinner v-if="!apiIsReady" />
  <div v-else class="w-full h-full overflow-hidden p-4">
    <notifications />
    <div>
      <div
        :class="[
          $route.name === 'user_home' || $route.name === 'user'
            ? 'transition-all delay-200 text-4xl font-bold text-primary uppercase'
            : 'transition-all delay-200 w-full h-6 flex justify-between gap-4 mb-2 font-bold text-primary uppercase text-md',
        ]"
      >
        <span
          v-if="$route.name !== 'user_home' && $route.name !== 'user'"
          @click="$router.go(-1)"
          class="material-icons-outlined"
          >arrow_back</span
        >
        <span class="block overflow-x-hidden">{{
          user.username ? user.username : user.email
        }}</span>
      </div>
    </div>
    <div
      :class="[
        $route.name === 'user_home' || $route.name === 'user'
          ? 'grid grid-cols-3 justify-center items-end gap-4 my-8'
          : 'w-full grid grid-cols-3 my-1',
      ]"
    >
      <div
        :class="{
          'transition-all delay-200 ':
            $route.name === 'user_home' || $route.name === 'user',
          'flex-col': $route.name === 'user_home' || $route.name === 'user',
        }"
        class="transition-all delay-200 flex justify-center items-center h-full"
      >
        <img
          v-if="position <= 3"
          :class="[
            $route.name === 'user_home' || $route.name === 'user'
              ? 'w-14 h-14'
              : 'w-8 h-8',
          ]"
          :src="`/img/${position}.svg`"
          alt="podium"
        />
        <p
          v-else
          class="flex transition-all delay-200 justify-start items-center text-4xl text-primary"
        >
          <span
            style="font-size: 35px !important"
            class="material-icons-outlined"
            >arrow_downward</span
          >{{ position }}º
        </p>
      </div>
      <div
        :class="{
          'transition-all delay-200 ':
            $route.name === 'user_home' || $route.name === 'user',
          'flex-col': $route.name === 'user_home' || $route.name === 'user',
        }"
        class="transition-all delay-200 flex justify-center items-center gap-2 h-full"
      >
        <img
          :class="[
            $route.name === 'user_home' || $route.name === 'user'
              ? 'transition-all delay-200 w-14 h-14'
              : 'transition-all delay-200 w-8 h-8',
          ]"
          :src="`/img/coins.svg`"
          alt="moedas"
        />
        <p
          class="transition-all delay-200 flex justify-start items-center text-xl font-bold text-[#fae246]"
        >
          {{ maxPoints }}
        </p>
      </div>
      <div
        @click="
          $router.push({ name: 'users', params: { uid: $route.params.uid } })
        "
        :class="{
          'transition-all delay-200 ':
            $route.name === 'user_home' || $route.name === 'user',
          'flex-col': $route.name === 'user_home' || $route.name === 'user',
        }"
        class="transition-all delay-200 flex justify-center items-center gap-2 h-full"
      >
        <img
          :class="[
            $route.name === 'user_home' || $route.name === 'user'
              ? 'transition-all delay-200 w-14 h-14'
              : 'transition-all delay-200 w-8 h-8',
          ]"
          :src="`/img/friends.svg`"
          alt="moedas"
        />
        <p
          class="transition-all delay-200 flex justify-start items-center text-xl font-bold text-[#ab5ff1]"
        >
          {{ friends }}
        </p>
      </div>
    </div>
    <div class="w-full h-[calc(100%_-_70px)] mt-4 pb-16">
      <router-view :key="$route.path" />
    </div>
    <div class="w-full h-14 fixed bottom-0 left-0 grid grid-cols-4 border-t shadow-md border-accet">
      <button @click="$router.push({name:'users', params:{uid:$route.params.uid}})" class="w-full h-14 flex justify-center items-center relative">
        <img src="/img/friends.svg" class="w-10 h-10 object-cover" />
      </button>
      <button @click="$router.push({name:'user', params:{uid:$route.params.uid}})" class="w-full h-14 flex justify-center items-center relative">
        <img src="/img/logo.svg" class="w-10 h-10 object-cover" />
      </button>
      <button @click="$router.push({name:'ranking', params:{uid:$route.params.uid}})" class="w-full h-14 flex justify-center items-center relative">
        <img src="/img/trofeu.svg" class="w-10 h-10 object-cover" />
      </button>
      <button @click="$router.push({name:'user_config', params:{uid:$route.params.uid}})" class="w-full h-14 flex justify-center items-center relative">
        <img :src="store.user.photoURL ? store.user.photoURL : '/img/user.svg'" class="w-10 h-10 object-cover" />
      </button>
    </div>
  </div>
</template>
<script>
import { useAuth } from "@/store/auth";
import Spinner from "@/components/Spinner.vue";
import Notifications from '@/components/Notifications.vue';
export default {
  components: { Spinner, Notifications },
  data() {
    const store = useAuth();
    return {
      store,
      apiIsReady: false,
    };
  },
  computed: {
    users() {
      return this.store.users;
    },
    position() {
      const orderScores = this.store.users.sort(
        (a, b) => b.maxScore - a.maxScore
      );
      const index = orderScores.findIndex(
        (user) => user.uid == this.store.userId
      );

      return index + 1;
    },
    maxPoints() {
      return this.store.user.maxScore ? this.store.user.maxScore : 0;
    },
    friends() {
      const users = this.store.users.filter(
        (user) => user.players && user.players[this.store.userId]
      );

      return users.length;
    },
    user: {
      get() {
        return this.store.user;
      },
      set(newuser) {
        this.store.updateUser(newuser.uid, newuser);
      },
    },
  },
  async mounted() {
    await this.store.getUserById(this.$route.params.uid);
    this.store.getUsers();
    this.apiIsReady = true;
  },
};
</script>
<style lang=""></style>
