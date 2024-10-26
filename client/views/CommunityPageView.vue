<script setup lang="ts">
import CommunityPostListComponent from "@/components/Community/CommunityPostListComponent.vue";
import JoinCommunityComponent from "@/components/Community/JoinCommunityComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const route = useRoute();
const community = route.params.communityName;
</script>

<template>
  <main>
    <h1>{{ community }}</h1>
    <JoinCommunityComponent :community="community" />
    <CommunityPostListComponent :community="community" />
  </main>
</template>
