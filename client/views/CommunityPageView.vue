<script setup lang="ts">
import CommonSymptomComponent from "@/components/Community/CommonSymptomComponent.vue";
import CommunityPostListComponent from "@/components/Community/CommunityPostListComponent.vue";
import JoinCommunityComponent from "@/components/Community/JoinCommunityComponent.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const community = route.params.communityName;
</script>

<template>
  <main>
    <div class="topRow">
      <h1>{{ community }}</h1>
      <CommonSymptomComponent :community="community" />
    </div>
    <JoinCommunityComponent :community="community" />
    <hr class="line-separator" />
    <CommunityPostListComponent :community="community" />
  </main>
</template>

<style scoped>
h1 {
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 550;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #e98024;
  font-size: 60px;
}

.topRow {
  display: flex;
  justify-content: left;
  gap: 20px;
  align-items: center;
  padding-left: 50px;
}

.line-separator {
  border: none;
  height: 2px;
  background-color: #ffcb9d;
  margin: 20px 0;
}
</style>
