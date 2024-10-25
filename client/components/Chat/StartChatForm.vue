<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const emit = defineEmits(["refreshChats"]);

const startChat = async (content: string) => {
  try {
    await fetchy("/api/chats/start", "POST", {
      body: { chatter: content },
    });
  } catch (_) {
    return;
  }
  emit("refreshChats");
  emptyForm();
  await router.push({ name: "Messages", params: { chatter: content } });
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="startChat(content)">
    <label for="content">Not seeing who you're looking for? Start a chat with a new user!</label>
    <textarea id="content" v-model="content" placeholder="Enter username" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Start Chat</button>
  </form>
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
  height: 15px;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
