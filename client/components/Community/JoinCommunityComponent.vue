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
  <div>
    <button @click="toggleButton">{{ buttonText }}</button>
  </div>
</template>

<style scoped>
div {
  padding-left: 50px;
}

button {
  background-color: #84a760;
  border-radius: 2em;
  border: 2px solid #5d7149;
  padding: 6px 20px;
  text-align: center;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: white;
}
</style>
