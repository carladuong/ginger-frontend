<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername } = storeToRefs(useUserStore());

const props = defineProps(["message"]);
</script>

<template>
  <div class="message">
    <p>{{ props.message.content }}</p>
  </div>
</template>

<style scoped>
p {
  margin-top: 10px;
  margin-bottom: 10px;
}

.message {
  max-width: px;
  padding: 5px 10px;
  border-radius: 30px;
  font-size: 20px;
  line-height: 1;
  display: inline-block;
  word-wrap: break-word;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  text-align: center;
}
</style>
