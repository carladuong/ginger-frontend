<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["community"]);
const { currentUsername } = storeToRefs(useUserStore());
let numMembers = ref(0);

const getNumberOfMembers = async () => {
  let members = await fetchy(`/api/communities/members/${props.community.labelName}`, "GET");
  console.log(members);
  numMembers.value = members.length;
};

const goToCommunityPage = async () => {
  void router.push({ name: "CommunityPage", params: { communityName: props.community.labelName } });
};

onBeforeMount(async () => {
  await getNumberOfMembers();
});
</script>

<template>
  <div v-on:click="goToCommunityPage">
    <p class="name">{{ props.community.labelName }}</p>
    <p class="numberMembers">{{ `${numMembers} members` }}</p>
  </div>
</template>

<style scoped>
p {
  margin: 0em;
}

.name {
  font-weight: bold;
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

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
