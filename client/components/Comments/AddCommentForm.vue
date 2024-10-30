<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const emit = defineEmits(["refreshComments"]);
const props = defineProps(["post"]);

const addComment = async (content: string) => {
  try {
    await fetchy(`/api/post/comments/add/${props.post}`, "POST", {
      body: { content },
    });
  } catch (_) {
    return;
  }
  emit("refreshComments");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <div>
    <form @submit.prevent="addComment(content)">
      <textarea id="content" v-model="content" placeholder="Write a comment here..." required> </textarea>
      <button type="submit" class="pure-button-primary pure-button">Post Comment</button>
    </form>
  </div>
</template>

<style scoped>
div {
  padding-top: 20px;
}

form {
  background-color: #d1ebb6;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  max-width: 700px;
}

button {
  background-color: #84a760;
  border-radius: 2em;
}

textarea {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
