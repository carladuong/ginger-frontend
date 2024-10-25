<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import MessageListComponent from "@/components/Chat/MessageListComponent.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const route = useRoute();
const chatter = route.params.chatter;
</script>

<template>
  <main>
    <h1>{{ chatter }}</h1>
    <MessageListComponent :chatter="chatter" />
  </main>
</template>
