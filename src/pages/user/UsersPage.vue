<template>
  <div class="w-fullh-full">
    <div class="w-full h-10 flex justify-between items-center gap-2">
      <div
        class="w-full h-10 border border-accet rounded flex justify-between items-center"
      >
        <input
          v-model="search"
          class="flex-1 h-full focus:outline-none px-2"
          type="text"
        />
        <button class="w-10 h-full flex justify-center items-center text-accet">
          <span class="material-icons-outlined">search</span>
        </button>
      </div>
      <button
        @click="type = type === 'close' ? 'group' : 'close'"
        class="w-10 h-full flex justify-center items-center text-primary hover:text-secondary"
      >
        <span class="material-icons-outlined">{{ type }}</span>
      </button>
    </div>
    <div class="w-full h-[calc(100%_-_3.5rem)] overflow-y-auto mt-4 pb-14">
      <div
        @click="openUserData(user)"
        class="w-full relative flex justify-between items-center border-b border-accet rounded my-2"
        v-for="user in users"
        :key="user.uid"
      >
        <div
          v-if="user.players && user.players[store.userId]"
          class="material-icons-outlined w-14 h-full flex justify-center items-center text-green"
        >
          radio_button_checked
        </div>
        <div
          v-else
          class="material-icons-outlined w-14 h-full flex justify-center items-center text-primary"
        >
          radio_button_unchecked
        </div>
        <div
          class="flex-1 flex flex-col justify-between items-start py-1 pl-2 relative overflow-hidden"
        >
          <span
            class="font-bold text-secondary text-lg mr-2 flex overflow-x-hidden flex-1"
            >{{ user.username ? user.username : user.email }}</span
          >
          <div class="mr-2 my-1 flex w-10 justify-start items-center gap-2">
            <img src="/img/coins.svg" class="w-6 h-6" />
            <span>{{ user.maxScore }}</span>
          </div>
        </div>

        <div class="w-10 h-full flex justify-center items-center text-primary">
          {{ getPosition(user) }}º
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useAuth } from "@/store/auth";
import Swal from "sweetalert2";
import moment from "moment";
export default {
  data() {
    const store = useAuth();
    return {
      store,
      search: "",
      type: "group",
    };
  },
  computed: {
    users() {
      const defaultUser = JSON.parse(JSON.stringify(this.store.users));
      if (this.type === "group") {
        return defaultUser.filter(
          (user) =>
            (user.username &&
              user.username
                .toLowerCase()
                .includes(this.search.toLowerCase())) ||
            user.email.toLowerCase().includes(this.search.toLocaleLowerCase())
        );
      } else {
        return defaultUser
          .filter((user) => user.players && user.players[this.store.userId])
          .filter(
            (user) =>
              (user.username &&
                user.username
                  .toLowerCase()
                  .includes(this.search.toLowerCase())) ||
              user.email.toLowerCase().includes(this.search.toLocaleLowerCase())
          );
      }
    },
  },
  methods: {
    getPosition(user) {
      const index = this.store.scoreOrdenedUsers.findIndex(
        (u) => u.uid == user.uid
      );

      return index + 1;
    },
    openUserData(user) {
      Swal.fire({
        title: user.username ? user.username : user.email,
        html:
          "<span class='text-white'>" +
          (user.players && user.players[this.store.userId]
            ? "Este jogador já está adicionado a sua lista de players"
            : "Este jogador ainda não está adicionado a sua lista de players") +
          "</span>",
        imageUrl: user.photoURL ? user.photoURL : "/img/user.svg",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: user.username ? user.username : user.email,
        closeButtonHtml:
          "<span class='material-icons-outlined text-white'>close</span>",
        showCloseButton: true,
        confirmButtonColor: "#af237b",
        confirmButtonText: "Adicionar",
        showConfirmButton: !user.players || !user.players[this.store.userId],
      }).then((res) => {
        if (res.isConfirmed) {
          const res = this.store.sendNotification(
            user.uid,
            moment().format("DD-MM-YYYYTHH:MM:mmmm"),
            {
              body:
                "O usuário " + user.username
                  ? user.username
                  : user.email + " enviou um convite!",
              command: {
                data: this.store.userId,
                type: "add-user",
              },
              title: "Convite",
            }
          );
          if (res.success) {
            Swal.fire({
              icon: "success",
              color: "white",
              html:
                "<span class='text-white'>Enviamos uma notificação para " +
                (user.username ? user.username : user.email) +
                ", assim que confirmado, fará parte da sua lista de jogadores.</span>",
            });
          } else {
            Swal.fire({
              icon: "error",
              color: "red",
              text: res.msg,
            });
          }
        }
      });
    },
  },
};
</script>
<style lang=""></style>
