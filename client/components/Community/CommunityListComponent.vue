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
let editing = ref("");
let searchAuthor = ref("");

async function getCommunities() {
  let communityResults;
  try {
    communityResults = await fetchy("/api/allCommunities", "GET");
  } catch (_) {
    return;
  }
  console.log(communityResults);
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
