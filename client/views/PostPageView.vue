<script setup lang="ts">
import CommentListComponent from "@/components/Comments/CommentListComponent.vue";
import PostPortionComponent from "@/components/Comments/PostPortionComponent.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const postId = route.params.postId;
</script>

<template>
  <main>
    <PostPortionComponent :post="postId" />
    <CommentListComponent :post="postId" />
  </main>
</template>

<style scoped>
main {
  padding-left: 50px;
}
</style>
