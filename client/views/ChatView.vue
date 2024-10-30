<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

import ChatListComponent from "@/components/Chat/ChatListComponent.vue";
import GetBuddy from "@/components/Match/GetBuddy.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <h1>Chats</h1>
  <div class="container">
    <main>
      <ChatListComponent />
    </main>
    <div class="secondColumn">
      <GetBuddy />
    </div>
  </div>
</template>

<style scoped>
h1 {
  padding-top: 30px;
  padding-left: 50px;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 550;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #e98024;
}

main {
  padding-left: 50px;
}

.container {
  display: flex;
  flex-direction: row;
  gap: 50px;
}
</style>
