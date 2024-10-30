<script setup lang="ts">
import router from "@/router";
import { fetchy } from "../../utils/fetchy";

const getMatch = async () => {
  let match;
  try {
    match = await fetchy("/api/match", "POST");
  } catch (_) {
    throw new Error("Must be opted in to matching! Head to settings to opt in.");
  }

  try {
    await fetchy(`/api/users/${match}`, "GET");
  } catch (_) {
    return;
  }
  void router.push({ name: "Messages", params: { chatter: match } });
};
</script>

<template>
  <container>
    <h3>Buddy Match</h3>
    <p>Want to meet people in your communities? Click here to be matched with one!</p>
    <button v-on:click="getMatch">Get Matched</button>
  </container>
</template>

<style scoped>
container {
  border-radius: 1em;
  background-color: #a7cc82;
  border: solid 2px #596e42;
  color: #596e42;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  max-width: 200px;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  text-align: center;
}

p {
  margin-block-start: 0px;
  margin-block-end: 0px;
}

h3 {
  margin-block-start: 0px;
  margin-block-end: 0px;
  font-weight: 550;
}

button {
  background-color: #596e42;
  color: white;
  border-radius: 8px;
}
</style>
