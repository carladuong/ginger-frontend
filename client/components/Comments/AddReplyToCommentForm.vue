<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const emit = defineEmits(["refreshReplies"]);
const props = defineProps(["comment"]);
let showReplyBox = ref(false);

const addReply = async (content: string) => {
  try {
    await fetchy(`/api/post/comments/reply/${props.comment}`, "POST", {
      body: { content },
    });
  } catch (_) {
    return;
  }
  emit("refreshReplies");
  emptyForm();
  await toggleReplyBox();
};

const toggleReplyBox = async () => {
  if (showReplyBox.value) {
    showReplyBox.value = false;
  } else {
    showReplyBox.value = true;
  }
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <div v-if="showReplyBox">
    <button v-on:click="toggleReplyBox">Cancel reply</button>
    <form @submit.prevent="addReply(content)">
      <textarea id="content" v-model="content" placeholder="Write a comment here..." required> </textarea>
      <button type="submit" class="pure-button-primary pure-button">Post Comment</button>
    </form>
  </div>
  <div v-else>
    <button v-on:click="toggleReplyBox">Reply to this comment</button>
  </div>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
