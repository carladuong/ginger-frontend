<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const emit = defineEmits(["refreshPosts"]);

const createPost = async (content: string) => {
  try {
    await fetchy("/api/posts", "POST", {
      body: { content },
    });
  } catch (_) {
    return;
  }
  emit("refreshPosts");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="createPost(content)">
    <label for="content">Have something to share?</label>
    <textarea id="content" v-model="content" placeholder="Write your post here!" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Create Post</button>
  </form>
</template>

<style scoped>
form {
  background-color: #ffe6b5;
  border: 2px solid #e98024;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 450;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #e98024;
}

textarea {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}

button {
  background-color: #84a760;
}
</style>
