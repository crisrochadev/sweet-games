import { defineStore } from "pinia";
import {
  auth,
  firebase,
  provider,
  faceProvider,
  db,
  push,
  update,
} from "@/services/firebase";
import { useRouter } from "vue-router";
import { useStorage } from "@vueuse/core";
import Swal from "sweetalert2";

export const useAuth = defineStore("auth", {
  state() {
    const router = useRouter();
    return {
      user: null,
      userId: useStorage("@sweet-plays/userId", null),
      userToken: useStorage("@sweet-plays/userToken", null),
      router,
      users: [],
      scoreOrdenedUsers: [],
      notifications: [],
    };
  },
  actions: {
    async login(type) {
      if (type === "google") {
        return await firebase
          .signInWithPopup(auth, provider)
          .then((result) => {
            const credential =
              firebase.GoogleAuthProvider.credentialFromResult(result);
            this.userToken = credential.accessToken;
            this.user = result.user;
            this.userId = this.user.uid;
            firebase
              .get(firebase.child(firebase.ref(db), `users/${this.user.uid}`))
              .then((snapshot) => {
                if (snapshot.exists()) {
                  this.user = snapshot.val();
                } else {
                  firebase.set(firebase.ref(db, "users/" + this.user.uid), {
                    ...this.user,
                    maxScore: 0,
                  });
                }
              })
              .catch((error) => {
                Swal.fire({
                  color: "red",
                  text: "Erro ao autenticar usuário",
                  icon: "error",
                });
              });
            this.router.push({
              name: "user",
              params: {
                uid: this.user.uid,
              },
            });

            return { success: true };
          })
          .catch((error) => {
            Swal.fire({
              color: "red",
              text: error,
            });
            return { success: false, error };
          });
      } else {
        firebase
          .signInWithPopup(auth, faceProvider)
          .then((result) => {
            const credential =
              firebase.FacebookAuthProvider.credentialFromResult(result);
            this.userToken = credential.accessToken;
            this.user = result.user;
            this.router.push({
              name: "user",
              params: {
                uid: this.user.uid,
              },
            });
          })
          .catch((error) => {
            console.log(error);
            // ...
          });
      }
    },
    async updateUser(id, data) {
      const updates = {};
      updates["/users/" + id] = data;

      update(ref(db), updates);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuário atualizado com sucesso",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async getUserById(id) {
      const res = await firebase
        .get(firebase.child(firebase.ref(db), `users/${id}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            return {
              success: true,
              data: snapshot.val(),
            };
          } else {
            return {
              success: false,
              data: null,
            };
          }
        })
        .catch((error) => {
          return {
            success: false,
            error,
          };
        });
      if (res.success) {
        this.user = res.data;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Não foi possivel conectar aos dados de usuário",
          footer: '<a href="/infos">Precisa de mais informações?</a>',
        });
      }
    },
    addDataInArray(
      objecToConvert,
      arrayToAdd,
      compareUId = null,
      callbackData = null
    ) {
      Object.entries(objecToConvert).forEach(([key, value]) => {
        if (compareUId === null || key !== compareUId) {
          let data = {
            uid: key,
            ...value,
          };
          if (callbackData) {
            data = callbackData(data);
          }
          if (arrayToAdd.some((user) => user.uid === key)) {
            const index = arrayToAdd.findIndex((user) => user.uid === key);
            arrayToAdd[index] = data;
          } else {
            arrayToAdd.push(data);
          }
        }
      });
    },
    getUsers() {
      const starCountRef = firebase.ref(db, "users");
      firebase.onValue(starCountRef, (snapshot) => {
        if (snapshot.exists()) {
          this.addDataInArray(snapshot.val(), this.users, this.userId);
          this.scoreOrdenedUsers = this.users.sort(
            (a, b) => b.maxScore - a.maxScore
          );
        } else {
          Swal.fire({
            color: "red",
            icon: "error",
            text: "Erro ao buscar os dados",
          });
        }
      });
    },
    updateUser(key, value) {
      firebase.set(firebase.ref(db, "user/" + this.userId + "/" + key), value);
    },
    getNotifications() {
      const starCountRef = firebase.ref(db, "notifications/" + this.userId);
      firebase.onValue(starCountRef, (snapshot) => {
        if (snapshot.exists()) {
          this.addDataInArray(
            snapshot.val(),
            this.notifications,
            null,
            (val) => {
              const newdata = { ...val };
              newdata["date"] = val.uid.split("T")[0].replace(/-/g, "/");
              newdata["time"] = val.uid.split("T")[1].replace(/-/g, ":");
              return newdata;
            }
          );
        } else {
          Swal.fire({
            color: "red",
            icon: "error",
            text: "Erro ao buscar os dados",
          });
        }
      });
    },
    sendNotification(id, date, value) {
      firebase.set(firebase.ref(db, "notifications/" + id + "/" + date), value);

      return {
        success: true,
      };
    },
  },
});
