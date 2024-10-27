<script setup lang="ts">
import CommunityPostListComponent from "@/components/Community/CommunityPostListComponent.vue";
import JoinCommunityComponent from "@/components/Community/JoinCommunityComponent.vue";
import { useRoute } from "vue-router";

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
