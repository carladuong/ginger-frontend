<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["post"]);
let postObject = ref<Record<string, string>>({});

async function getPostObject() {
  postObject.value = await fetchy(`/api/posts/${props.post}`, "GET");
}

onBeforeMount(async () => {
  await getPostObject();
});
</script>

<template>
  <main>
    <h1>{{ postObject.author }}</h1>
    <p>{{ postObject.content }}</p>
  </main>
</template>
