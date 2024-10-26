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
    console.log(props.community);
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
  <p v-else-if="loaded">No posts found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
