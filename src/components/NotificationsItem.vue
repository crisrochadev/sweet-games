<template>
  <div class="w-full h-[calc(100%_-_60px)] overflow-y-auto p-4 pt-[60px]">
    <draggable
      group="notify"
      ghost-class="invisible"
      :move="move"
      v-model="list"
      @start="start"
      dragClass="dragging"
      :setData="modifyDragItem"
      @end="drop"
      item-key="id"
    >
      <template #item="{ element }">
        <div
          :id="`element-${element.uid}`"
          class="w-full h-20 bg-accet text-white my-2 flex justify-between items-center p-1 rounded shadow-md"
          :class="[moved === element.uid ? '' : '']"
        >
          <div class="flex-1">
            <p class="text-left uppercase text-primary font-extrabold title">
              {{ element.title }}
            </p>
            <p class="text-left text-[#424242] body">{{ element.body }}</p>
          </div>
        </div>
      </template>
    </draggable>
    <draggable
      group="notify"
      item-key="uid"
      ghost-class="hidden"
      v-model="trash"
      class="fixed bottom-0 left-0 w-full h-14 flex justify-center items-center"
    >
      <template #item="{ element }">
        <img :src="`/img/${element.icon}.svg`" class="w-8 h-8" />
      </template>
    </draggable>
  </div>
</template>
<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },

  props: ["items"],
  emits: ["update:items"],
  data() {
    return {
      drag: false,
      moved: null,
      isDrop:false,
      trash: [
        {
          id: "trash",
          icon: "trash",
        },
      ],
      dragging: {
        bg: "#e9b3db",
        beforeDisplay: "none",
        titleColor: "#ff3071",
        bodyColor: "#424242",
      },
      left: 0,
      image: "@/assets/img/logo.svg",
    };
  },
  computed: {
    list: {
      get() {
        return this.items;
      },
      set(newitems) {
        this.$emit("update:items", newitems);
      },
    },
  },
  created() {
    let img = new Image();
    img.src =
      "https://www.google.no/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
    this.dragImg = img;
  },
  methods: {
    start(event) {
      this.drag = true;
    },
    modifyDragItem() {
      console.log("nao funciona");
    },
    move(props, event) {
      this.left = event.clientX + "px";
      const uid = props.draggedContext.element.uid;
      if (props.relatedContext.element.id === "trash") {
        this.dragging["bg"] = "transparent";
        this.dragging["beforeDisplay"] = "block";
        this.dragging["titleColor"] = "transparent";
        this.dragging["bodyColor"] = "transparent";
        this.trash[0].icon = "trash-open";
        this.moved = uid;
        this.isDrop = true;
      } else {
        this.trash[0].icon = "trash";
        this.moved = null;
        this.dragging = {
          bg: "#e9b3db",
          beforeDisplay: "none",
          titleColor: "#ff3071",
          bodyColor: "#424242",
        };
         this.isDrop = false;
      }
    },
    drop(event) {
     if(this.isDrop) this.trash.splice(event.newIndex, 1);
      this.trash[0].icon = "trash";
      this.dragging = {
        bg: "#e9b3db",
        beforeDisplay: "none",
        titleColor: "#ff3071",
        bodyColor: "#424242",
      };
      this.isDrop = false
    },
  },
};
</script>
<style>
.dragging {
  background: v-bind(dragging.bg);
  box-shadow:none !important;
}
.dragging .title{
    color:v-bind(dragging.titleColor)
}
.dragging .body{
    color:v-bind(dragging.bodyColor)
}
.dragging::before {
  content: "o";
  display: v-bind(dragging.beforeDisplay);
  width: 30px;
  height: 30px;
  background: white;
  position: absolute;
  left: v-bind(left);
  transform: translateX(-50%);
  background-image: url("../assets/img/paper2.svg");
  background-size: cover;
}
</style>
