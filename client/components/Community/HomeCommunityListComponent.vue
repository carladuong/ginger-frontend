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
  try {
    communityResults = await fetchy("/api/communities", "GET");
  } catch (_) {
    return;
  }
  communities.value = communityResults;
}

onBeforeMount(async () => {
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
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  justify-items: start;
}

p {
  color: #e98024;
  padding-left: 50px;
}
</style>
