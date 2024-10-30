<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["post"]);
let postObject = ref<Record<string, string>>({});
let postAuthor = ref("");

async function getPostObject() {
  postObject.value = await fetchy(`/api/posts/${props.post}`, "GET");
}

async function getPostAuthor() {
  let result = await fetchy(`/api/users/id/${postObject.value.author}`, "GET");
  postAuthor.value = result.username;
}

onBeforeMount(async () => {
  await getPostObject();
  await getPostAuthor();
});
</script>

<template>
  <main>
    <h1>{{ postAuthor }}</h1>
    <p>{{ postObject.content }}</p>
  </main>
</template>

<style scoped>
main {
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  background-color: #a7cc82;
  color: #596e42;
  max-width: 70%;
  padding: 10px 30px;
  border-radius: 20px;
}

h1 {
  font-weight: normal;
  font-weight: 500;
}

p {
  font-size: 20px;
}
</style>
