<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let communities = ref([]);

async function getCommunities() {
  let communityResults;
  try {
    communityResults = await fetchy("/api/communities", "GET");
  } catch (_) {
    console.log("did not get communities");
    return;
  }
  console.log(communityResults);
  communities.value = communityResults;
}

onBeforeMount(async () => {
  await getCommunities();
  console.log(communities.value);
  loaded.value = true;
});
</script>

<template>
  <div class="side-nav">
    <h2>My Communities</h2>
    <div class="content" v-if="isLoggedIn && communities.length !== 0">
      <ul>
        <li v-for="community in communities" :key="community">
          <RouterLink :to="{ name: 'CommunityPage', params: { communityName: community } }"> {{ community }} </RouterLink>
        </li>
      </ul>
    </div>
    <div v-else-if="isLoggedIn">
      <p>No communities yet.</p>
    </div>
    <div v-else>
      <p>Log in to view your communities!</p>
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: #e98024;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

.side-nav {
  background-color: #ffe6b5;
  color: #e98024;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  width: 200px;
  height: 100vh;
  position: fixed;
  top: 82px; /* Below the top nav */
  left: 0;
  padding-top: 20px;
}
</style>
