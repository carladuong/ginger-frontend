<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

import ChatListComponent from "@/components/Chat/ChatListComponent.vue";
import GetBuddy from "@/components/Match/GetBuddy.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>Chats</h1>
    <GetBuddy />
    <ChatListComponent />
  </main>
</template>
