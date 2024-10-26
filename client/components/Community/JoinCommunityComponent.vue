<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

let buttonText = ref("");
const props = defineProps(["community"]);

const getButtonText = async () => {
  const isUserInCommunity = await fetchy(`/api/communities/check/${props.community}`, "GET");
  if (isUserInCommunity) {
    buttonText.value = "Leave Community";
  } else {
    buttonText.value = "Join Community";
  }
};

const toggleButton = async () => {
  if (buttonText.value === "Leave Community") {
    await fetchy(`/api/communities/leave/${props.community}`, "DELETE");
    buttonText.value = "Join Community";
  } else {
    await fetchy(`/api/communities/join/${props.community}`, "POST");
    buttonText.value = "Leave Community";
  }
};

onBeforeMount(async () => {
  await getButtonText();
});
</script>

<template>
  <button @click="toggleButton">{{ buttonText }}</button>
</template>
