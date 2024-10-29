<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const optedIn = ref(false);
const buttonColor = ref("green");
const buttonText = ref("Opt in");
const message = ref("You are currently opted out of matching.");

const toggleOpt = async () => {
  if (optedIn.value) {
    await fetchy("/api/matches/optout", "DELETE");
    optedIn.value = false;
    buttonText.value = "Opt in";
    buttonColor.value = "#84a760";
    message.value = "You are currently opted out of matching.";
  } else {
    await fetchy("/api/matches/optin", "POST");
    optedIn.value = true;
    buttonText.value = "Opt out";
    buttonColor.value = "#D0430C";
    message.value = "You are currently opted into matching. You may receive messages from people in your communities looking for a buddy!";
  }
};

const getOptStatus = async () => {
  const isMatchable = await fetchy("/api/matches", "GET");
  if (isMatchable) {
    optedIn.value = true;
    buttonText.value = "Opt out";
    buttonColor.value = "#D0430C";
    message.value = "You are currently opted into matching. You may receive messages from people in your communities looking for a buddy!";
  } else {
    optedIn.value = false;
    buttonText.value = "Opt in";
    buttonColor.value = "#84a760";
    message.value = "You are currently opted out of matching.";
  }
};

onBeforeMount(async () => {
  await getOptStatus();
});
</script>

<template>
  <section>
    <h2>Matching</h2>
    <div>
      {{ message }}
      <button v-on:click="toggleOpt" v-bind:style="{ backgroundColor: buttonColor }">{{ buttonText }}</button>
    </div>
  </section>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

button {
  width: 125px;
  height: 35px;
  border-radius: 3px;
  border-color: transparent;
  color: white;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 450;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

section {
  display: flex;
  flex-direction: column;
  justify-content: start;
  color: #aa5a13;
  padding-bottom: 20px;
}
</style>
