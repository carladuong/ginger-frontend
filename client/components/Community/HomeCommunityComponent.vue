<script setup lang="ts">
import router from "@/router";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["communityName"]);
let numMembers = ref(0);

const getNumberOfMembers = async () => {
  let members = await fetchy(`/api/communities/members/${props.communityName}`, "GET");
  numMembers.value = members.length;
};

const goToCommunityPage = async () => {
  void router.push({ name: "CommunityPage", params: { communityName: props.communityName } });
};

onBeforeMount(async () => {
  await getNumberOfMembers();
});
</script>

<template>
  <div class="gridItem" v-on:click="goToCommunityPage">
    <p class="name">{{ props.communityName }}</p>
    <p class="numberMembers">{{ `${numMembers} members` }}</p>
  </div>
</template>

<style scoped>
p {
  margin: 0em;
}

.name {
  /* font-weight: bold; */
  font-size: 1.5em;
}

.gridItem {
  background-color: #a7cc82;
  padding: 20px;
  text-align: left;
  border: 2px solid #ccc;
  border-color: #84a760;
  border-radius: 8px;
  width: 260px;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: bold;
  color: #445434;
  font-variation-settings: "width" 100;
}
</style>
