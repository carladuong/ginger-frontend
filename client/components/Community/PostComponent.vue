<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
const emit = defineEmits(["editPost", "refreshPosts"]);
const { currentUsername } = storeToRefs(useUserStore());
let author = ref("");
let communities = ref("");

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

async function getAuthor() {
  author.value = (await fetchy(`/api/users/id/${props.post.author}`, "GET")).username;
}

const goToPostPage = async () => {
  void router.push({ name: "PostPage", params: { postId: props.post._id } });
};

const goToUserPage = async () => {
  void router.push({ name: "UserProfile", params: { username: author.value } });
};

onBeforeMount(async () => {
  await getAuthor();
  await getPostCommunities();
});
</script>

<template>
  <div v-on:click="goToPostPage">
    <p class="author">
      <b>{{ author }}</b> posted in <b>{{ communities }}</b>
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

div {
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

.author {
  font-weight: 500;
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
