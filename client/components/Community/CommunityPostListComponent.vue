<script setup lang="ts">
import CreatePostForm from "@/components/Post/CreatePostForm.vue";
import EditPostForm from "@/components/Post/EditPostForm.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import PostComponent from "./PostComponent.vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const props = defineProps(["community"]);
const loaded = ref(false);
let posts = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let searchAuthor = ref("");

async function getPosts() {
  let postResults;
  try {
    postResults = await fetchy(`/api/communities/${props.community}`, "GET");
  } catch (_) {
    return;
  }
  posts.value = postResults;
}

onBeforeMount(async () => {
  await getPosts();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <h2>Create a post:</h2>
    <CreatePostForm @refreshPosts="getPosts" />
  </section>
  <section class="posts" v-if="loaded && posts.length !== 0">
    <article v-for="post in posts" :key="post._id">
      <PostComponent v-if="editing !== post._id" :post="post" @refreshPosts="getPosts" />
      <EditPostForm v-else :post="post" @refreshPosts="getPosts" />
    </article>
  </section>
  <h3 v-else-if="loaded">No posts yet.</h3>
  <h3 v-else>Loading...</h3>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

h2 {
  color: #e98024;
}

h3 {
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 50px;
  color: #e98024;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: #a7cc82;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.posts {
  padding: 1em;
  display: flex;
  gap: 1em;
  color: #596e42;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
