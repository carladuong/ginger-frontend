<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import CommunityListComponent from "@/components/Community/CommunityListComponent.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const route = useRoute();
const chatter = route.params.chatter;
</script>

<template>
  <main>
    <h1>Find your people here.</h1>
    <CommunityListComponent />
  </main>
</template>
