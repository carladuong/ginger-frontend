<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import CommunityComponent from "./CommunityComponent.vue";
import NewCommunityForm from "./NewCommunityForm.vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let communities = ref<Array<Record<string, string>>>([]);

async function getCommunities() {
  let communityResults;
  try {
    communityResults = await fetchy("/api/allCommunities", "GET");
  } catch (_) {
    return;
  }
  communities.value = communityResults;
}

onBeforeMount(async () => {
  await getCommunities();
  loaded.value = true;
});
</script>

<template>
  <NewCommunityForm @refresh-communities="getCommunities" />
  <section class="posts" v-if="loaded && communities.length !== 0">
    <article v-for="community in communities" :key="community._id">
      <CommunityComponent :community="community" />
    </article>
  </section>
  <p v-else-if="loaded">No communities found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
article {
  background-color: #a7cc82;
  padding: 20px;
  text-align: left;
  border: 2px solid #ccc;
  border-color: #84a760;
  border-radius: 8px;
  width: 360px;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  color: #445434;
  font-variation-settings: "width" 100;
}

.posts {
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 420px);
  gap: 10px 5px;
}
</style>
