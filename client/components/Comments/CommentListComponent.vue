<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import AddCommentForm from "./AddCommentForm.vue";
import CommentComponent from "./CommentComponent.vue";

const props = defineProps(["post"]);
const loaded = ref(false);
let comments = ref<Array<Record<string, string>>>([]);

async function getComments() {
  let commentResults;
  const idString = props.post;
  try {
    commentResults = await fetchy(`/api/post/comments/${idString}`, "GET");
  } catch (_) {
    return;
  }
  comments.value = commentResults;
}

onBeforeMount(async () => {
  await getComments();
  loaded.value = true;
});
</script>

<template>
  <AddCommentForm :post="props.post" @refresh-comments="getComments" />
  <section class="posts" v-if="loaded && comments.length !== 0">
    <article v-for="comment in comments" :key="comment._id">
      <CommentComponent :comment="comment" />
    </article>
  </section>
  <p v-else-if="loaded">No comments yet.</p>
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
