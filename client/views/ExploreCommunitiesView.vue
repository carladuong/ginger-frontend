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
    <h1>Find people who get it.</h1>
    <CommunityListComponent />
  </main>
</template>

<style scoped>
main {
  padding-left: 50px;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

h1 {
  padding-top: 30px;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 550;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #e98024;
}
</style>
