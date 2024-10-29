<script setup lang="ts">
import CommunityPostListComponent from "@/components/Community/CommunityPostListComponent.vue";
import JoinCommunityComponent from "@/components/Community/JoinCommunityComponent.vue";
import router from "@/router";
import { watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const community = route.params.communityName;

watch(
  route,
  (newRoute) => {
    console.log(newRoute.params.communityName);
    void router.push({ name: "CommunityPage", params: { communityName: newRoute.params.communityName } });
    console.log("route changed");
  },
  { immediate: true },
);
</script>

<template>
  <main>
    <h1>{{ community }}</h1>
    <JoinCommunityComponent :community="community" />
    <CommunityPostListComponent :community="community" />
  </main>
</template>
