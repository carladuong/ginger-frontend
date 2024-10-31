<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
let communities = ref("");
const emit = defineEmits(["editPost", "refreshPosts"]);
const { currentUsername } = storeToRefs(useUserStore());

const deletePost = async () => {
  try {
    await fetchy(`/api/posts/${props.post._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshPosts");
};

const getPostCommunities = async () => {
  let communitiesResults;
  try {
    communitiesResults = await fetchy(`/api/post/communities/${props.post._id}`, "GET");
  } catch {
    return;
  }
  console.log(communitiesResults);
  communities.value = communitiesResults.join(", ");
};

onBeforeMount(async () => {
  await getPostCommunities();
});

const goToPostPage = async () => {
  void router.push({ name: "PostPage", params: { postId: props.post._id } });
};
</script>

<template>
  <div v-on:click="goToPostPage">
    <p class="author">
      <b>{{ props.post.author }}</b> posted in {{ communities }}
    </p>
    <p>{{ props.post.content }}</p>
    <div class="base">
      <article class="timestamp">
        <p v-if="props.post.dateCreated !== props.post.dateUpdated">Edited on: {{ formatDate(props.post.dateUpdated) }}</p>
        <p v-else>Created on: {{ formatDate(props.post.dateCreated) }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
p {
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
