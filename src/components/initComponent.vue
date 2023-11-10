<template>
  <div
    class="w-full h-full flex flex-col justify-between items-center"
    @touchstart="touchstart"
    @touchend="touchend"
  >
    <div class="flex-1 flex justify-center items-center flex-col gap-8 px-4">
      <div class="w-44 h-44">
        <img :src="step.image" />
      </div>
      <h2 class="text-2xl font-bold">{{ step.title }}</h2>
      <p class="text-xl text-[#424242]">{{ step.text }}</p>
    </div>
    <div class="w-full flex justify-between items-center px-2 h-10">
      <button
        @click="
          () => {
            if (position > 0) {
              position--;
            }
          }
        "
        class="material-icons-outlined"
        style="font-size: 28px !important"
        :style="{
          color: position > 0 ? '#ff3071 !important' : '#e9b3db !important',
        }"
        v-bind="
          position > 0
            ? {}
            : {
                disabled: true,
              }
        "
      >
        arrow_back
      </button>
      <div class="flex flex-1 justify-center items-center gap-4">
        <button
          @click="position = 0"
          class="rounded-full w-4 h-4"
          :class="[position === 0 ? 'bg-primary' : 'bg-accet']"
        ></button>
        <button
          @click="position = 1"
          class="rounded-full w-4 h-4"
          :class="[position === 1 ? 'bg-primary' : 'bg-accet']"
        ></button>
        <button
          @click="position = 2"
          class="rounded-full w-4 h-4"
          :class="[position === 2 ? 'bg-primary' : 'bg-accet']"
        ></button>
      </div>
      <button
        @click="
          () => {
            if (position < 2) {
              position++;
            } else {
              $router.push({ name: 'login' });
            }
          }
        "
        class="material-icons-outlined"
        style="font-size: 28px !important"
        :style="{
          color: position < 3 ? '#ff3071 !important' : '#e9b3db !important',
        }"
        v-bind="
          position < 3
            ? {}
            : {
                disabled: true,
              }
        "
      >
        arrow_forward
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["steps"],
  data() {
    return {
      position: 0,
      posI: null,
      posE: null,
      posIY: null,
      posEY: null,
    };
  },
  computed: {
    step() {
      console.log(this.steps);
      return this.steps[this.position];
    },
  },
  methods: {
    touchstart(event) {
      this.posI = event.touches[0].clientX;
      this.posIY = event.touches[0].clientY;
    },
    touchend(event) {
      this.posE = event.changedTouches[0].clientX;
      this.posEY = event.changedTouches[0].clientY;

      if (Math.abs(this.posE - this.posI) > Math.abs(this.posEY - this.posI)) {
        if (this.posE < this.posI) {
          if (this.position < 2) {
            this.position++;
          } else if (this.position >= 2) {
            this.$router.push({ name: "login" });
          }
        } else {
          if (this.position > 0) {
            this.position--;
          }
        }
      }
    },
  },
};
</script>
<style lang=""></style>
