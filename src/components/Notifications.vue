<template>
  <div
    @click="open = !open"
    class="w-10 h-10 rounded-full flex justify-center items-center bg-primary absolute bottom-16 right-2"
  >
    <span
      class="material-icons-outlined text-white"
      style="font-size: 25px !important"
      >notifications</span
    >
  </div>
  <div
    v-if="open"
    class="w-full h-full absolute z-50 top-0 left-0 bg-[rgba(255,255,255,.90)]"
  >
    <button
      @click="open = false"
      class="material-icons-outlined text-primary absolute top-2 right-2"
      style="font-size: 40px !important"
    >
      close
    </button>
    <notifications-item v-model:items="notifications"/>
  </div>
</template>
<script>
import { useAuth } from "@/store/auth";
import NotificationsItem from './NotificationsItem.vue';
export default {
  components: { NotificationsItem },
  data() {
    const store = useAuth();
    return {
      store,
      open: false,
      dragging: false,
      startY: 0,
      currentIndex: 0,
      dropAreaHover: false,
    };
  },
  computed: {
    notifications:{
      get(){
        return this.store.notifications;
      }   ,
      set(newnotifications){
        this.store.notifications = newnotifications
      }   
    },
  },
  mounted() {
    this.store.getNotifications();
  },
 
};
</script>
<style lang=""></style>
