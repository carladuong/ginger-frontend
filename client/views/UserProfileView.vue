<script setup lang="ts">
// import PostComponent from "@/components/Community/PostComponent.vue";
import PostComponent from "@/components/Post/PostComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const username = route.params.username;
let userCommunities = ref();
let userId = ref("");
const loaded = ref(false);
let editing = ref("");
let posts = ref<Array<Record<string, string>>>([]);

async function getPosts(author?: string) {
  let query: Record<string, string> = author !== undefined ? { author } : {};
  let postResults;
  try {
    postResults = await fetchy("/api/posts", "GET", { query });
  } catch (_) {
    return;
  }
  posts.value = postResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

async function getUserCommunities() {
  console.log("getting user com");
  let comResults;
  try {
    comResults = await fetchy(`/api/communities/user/${userId.value}`, "GET");
  } catch (_) {
    return;
  }
  userCommunities.value = comResults;
}

async function getUserId() {
  console.log("working");
  let idResults;
  try {
    idResults = await fetchy(`/api/users/${username}`, "GET");
  } catch (_) {
    console.log("failed");
    return;
  }
  console.log(idResults._id);
  userId.value = idResults._id;
}

onBeforeMount(async () => {
  await getUserId();
  await getUserCommunities();
  await getPosts(username.toString());
  loaded.value = true;
});
</script>

<template>
  <main>
    <h1>{{ username }}</h1>
    <div class="communities">
      <article class="community" v-for="community in userCommunities" :key="community">
        {{ community }}
      </article>
    </div>
    <hr class="line-separator" />
    <section class="posts" v-if="loaded && posts.length !== 0">
      <article class="post" v-for="post in posts" :key="post._id">
        <PostComponent :post="post" @refreshPosts="getPosts" />
      </article>
    </section>
  </main>
</template>

<style scoped>
hr {
  background-color: #ffe6b5;
  border: none;
  height: 2px;
}

main {
  padding-left: 50px;
  color: #596e42;
}

.communities {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.community {
  background-color: #e98024;
  border-radius: 2em;
  border: 2px solid #e98024;
  line-height: 25px;
  padding: 0px 20px;
  text-align: center;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: white;
}

h1 {
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #e98024;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}

.post {
  background-color: #a7cc82;
  padding: 20px;
  text-align: left;
  border: 2px solid #ccc;
  border-color: #84a760;
  width: 360px;
  border-radius: 1.75em;
}
</style>
