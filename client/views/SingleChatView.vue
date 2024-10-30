<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import MessageListComponent from "@/components/Chat/MessageListComponent.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const route = useRoute();
const chatter = route.params.chatter;

const backToChats = async () => {
  void router.push({ name: "Chats" });
};
</script>

<template>
  <main>
    <div class="topRow">
      <button @click="backToChats">Back</button>
      <h1>{{ chatter }}</h1>
    </div>
    <hr class="line-separator" />
    <MessageListComponent :chatter="chatter" />
  </main>
</template>

<style scoped>
h1 {
  padding-top: 0px;
  padding-left: 50px;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 550;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #e98024;
  margin-top: 0px;
  margin-bottom: 0px;
}

button {
  background-color: #e98024;
  color: white;
  border: solid transparent;
  padding: 0px 15px;
  border-radius: 30px;
  font-size: 15px;
  line-height: 1;
}

.topRow {
  display: flex;
  flex-direction: row;
  padding-left: 30px;
}

.line-separator {
  border: none;
  height: 2px;
  background-color: #ffcb9d;
  margin: 20px 0;
}
</style>
