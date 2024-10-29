<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let communities = ref([]);
const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);

async function getCommunities() {
  let communityResults;
  try {
    communityResults = await fetchy("/api/communities", "GET");
  } catch (_) {
    console.log("did not get communities");
    return;
  }
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
      <ul class="list">
        <li v-for="community in communities" :key="community">
          <RouterLink :to="{ name: 'CommunityPage', params: { communityName: community } }"> {{ community }} </RouterLink>
        </li>
        <li class="findNew">
          <RouterLink :to="{ name: 'Explore' }" :class="{ selected: currentRouteName == 'Explore' }"> Find new communities </RouterLink>
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
  padding-top: 10px;
  text-align: center;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.list {
  list-style-type: none;
  padding: 0px;
  margin: 15px;
}

.list li {
  margin-bottom: 15px;
}

.list a {
  text-decoration: none;
  color: #e98024;
  text-align: left;
  font-weight: 400;
  font-size: 20px;
}

.selected {
  color: #aa5a13 !important;
}

.findNew a {
  font-weight: 500;
}

.list li:last-child {
  margin-top: 30px; /* Add extra space below the last item */
}
</style>
