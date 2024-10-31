<script setup lang="ts">
import router from "@/router";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["post"]);
let postObject = ref<Record<string, string>>({});
let postAuthor = ref("");
let communities = ref("");

async function getPostObject() {
  postObject.value = await fetchy(`/api/posts/${props.post}`, "GET");
}

async function getPostAuthor() {
  let result = await fetchy(`/api/users/id/${postObject.value.author}`, "GET");
  postAuthor.value = result.username;
}

const getPostCommunities = async () => {
  let communitiesResults;
  try {
    communitiesResults = await fetchy(`/api/post/communities/${postObject.value._id}`, "GET");
  } catch {
    return;
  }
  console.log(communitiesResults);
  communities.value = communitiesResults.join(", ");
};

const goToUserPage = async () => {
  void router.push({ name: "UserProfile", params: { username: postAuthor.value } });
};

onBeforeMount(async () => {
  await getPostObject();
  await getPostAuthor();
  await getPostCommunities();
});
</script>

<template>
  <main>
    <h1 @click="goToUserPage">{{ postAuthor }}</h1>
    <h2>posted in {{ communities }}</h2>
    <p>{{ postObject.content }}</p>
  </main>
</template>

<style scoped>
main {
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  background-color: #a7cc82;
  color: #596e42;
  max-width: 70%;
  padding: 10px 30px;
  border-radius: 20px;
}

h1 {
  font-weight: normal;
  font-weight: 500;
  margin-bottom: 0px;
  color: #38452b;
}

h2 {
  margin-top: 0px;
  color: #38452b;
}

p {
  font-size: 20px;
}
</style>
