<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { currentUsername } = storeToRefs(useUserStore());

const props = defineProps(["message"]);
const bubbleColor = ref(props.message.from === currentUsername ? "white" : "gray");
</script>

<template>
  <div class="message" v-bind:style="{ backgroundColor: bubbleColor }">
    <p>{{ props.message.content }}</p>
  </div>
</template>

<style scoped>
.message {
  max-width: 250px;
  padding: 5px 15px;
  color: #333;
  border-radius: 30px;
  font-size: 20px;
  line-height: 1;
  display: inline-block;
  word-wrap: break-word;
}
</style>
