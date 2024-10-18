<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";

const getMatch = async () => {
  if (!(await fetchy("api/match", "POST"))) {
    throw new Error("Must be opted in to matching! Head to settings to opt in.");
  }
  await fetchy("/api/match", "POST");
};
</script>

<template>
  <h2>Buddy Match</h2>
  <p>Want to meet people in your communities? Click here to be matched with one!</p>
  <button v-on:click="getMatch" style="color: steelblue">Get Matched</button>
</template>
