<script setup lang="ts">
import HomeCommunityListComponent from "@/components/Community/HomeCommunityListComponent.vue";
import CreatePostForm from "@/components/Post/CreatePostForm.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <section>
      <h1 v-if="isLoggedIn">Welcome {{ currentUsername }}!</h1>
      <h1 v-else>Please login!</h1>
    </section>
    <section class="post-form" v-if="isLoggedIn">
      <CreatePostForm />
    </section>
    <section>
      <h1>See what's happening in your communities.</h1>
    </section>
    <section class="community-grid" v-if="isLoggedIn">
      <HomeCommunityListComponent />
    </section>
  </main>
</template>

<style scoped>
h1 {
  padding-top: 10px;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 550;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #e98024;
}

section {
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  gap: 1em;
  max-width: 60em;
}

.post-form {
  padding-bottom: 30px;
}

.community-grid {
  padding-left: 50px;
  padding-bottom: 50px;
  padding-left: 10px;
}
</style>
