<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import HomeCommunityComponent from "./HomeCommunityComponent.vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let communities = ref([]);

async function getUserCommunities() {
  let communityResults;
  console.log("ABOUT TO GET COMMUNITIES");
  try {
    communityResults = await fetchy("/api/communities", "GET");
  } catch (_) {
    return;
  }
  console.log("COMMUNITIES");
  console.log(communityResults);
  communities.value = communityResults;
}

onBeforeMount(async () => {
  console.log("on before mount");
  await getUserCommunities();
  loaded.value = true;
});
</script>

<template>
  <section class="posts" v-if="loaded && communities.length !== 0">
    <article v-for="community in communities" :key="community">
      <HomeCommunityComponent :communityName="community" />
    </article>
  </section>
  <p v-else-if="loaded">You're not in any communities yet.</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
.posts {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Creates 3 equal columns */
  gap: 16px; /* Space between items */
  justify-items: start; /* Aligns items to the left within their grid cells */
}
</style>
