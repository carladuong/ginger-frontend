<script setup lang="ts">
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import SidebarComponent from "./components/Community/SidebarComponent.vue";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());
const computedKey = computed(() => {
  const communityName = currentRoute.params.communityName;
  return Array.isArray(communityName) ? communityName[0] : communityName || "";
});

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>

<template>
  <header>
    <nav>
      <div class="title">
        <RouterLink :to="{ name: 'Home' }">
          <h1>GINGER</h1>
        </RouterLink>
      </div>
      <ul>
        <li>
          <RouterLink :to="{ name: 'Home' }" :class="{ selected: currentRouteName == 'Home' }"> Home </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'Explore' }" :class="{ selected: currentRouteName == 'Explore' }"> Explore </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Chats' }" :class="{ selected: currentRouteName == 'Chats' }"> Chats </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'UserProfile', params: { username: userStore.currentUsername } }" :class="{ selected: currentRouteName == 'UserProfile' }"> Profile </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Settings' }" :class="{ selected: currentRouteName == 'Settings' }"> Settings </RouterLink>
        </li>
        <li v-else>
          <RouterLink :to="{ name: 'Login' }" :class="{ selected: currentRouteName == 'Login' }"> Login </RouterLink>
        </li>
      </ul>
    </nav>
    <SidebarComponent />
    <article v-if="toast !== null" class="toast" :class="toast.style">
      <p>{{ toast.message }}</p>
    </article>
  </header>
  <div class="content">
    <RouterView :key="computedKey" />
  </div>
</template>

<style scoped>
@import "./assets/toast.css";

nav {
  padding: 1em 2em;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #fff4d7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.title h1 {
  font-size: 2.5em;
  margin: 0;
  color: #e98024;
  -webkit-text-stroke: 0.5px #aa5a13;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-family: "Chewy", serif;
  font-weight: 400;
  font-style: normal;
  color: #e98024;
  letter-spacing: 3px;
}

img {
  height: 2em;
}

a {
  font-size: large;
  color: #e98024;
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #e98024;
}

.underline {
  text-decoration: underline;
}

.selected {
  color: #aa5a13;
}

.content {
  margin-top: 100px; /* For top nav */
  margin-left: 200px; /* For side nav */
}
</style>
