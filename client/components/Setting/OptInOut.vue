<script setup lang="ts">
import { ref } from "vue";
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
    buttonColor.value = "green";
    message.value = "You are currently opted out of matching.";
  } else {
    await fetchy("/api/matches/optin", "POST");
    optedIn.value = true;
    buttonText.value = "Opt out";
    buttonColor.value = "red";
    message.value = "You are currently opted into matching.";
  }
};
</script>

<template>
  <h2>Matching</h2>
  {{ message }}
  <button v-on:click="toggleOpt" v-bind:style="{ color: buttonColor }">{{ buttonText }}</button>
</template>
