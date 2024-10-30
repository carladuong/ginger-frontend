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
    <input id="content" v-model="content" placeholder="Enter username" required />
    <button type="submit" class="pure-button-primary pure-button">Start Chat</button>
  </form>
</template>

<style scoped>
form {
  background-color: #ffe6b5;
  border: solid 2px #e98024;
  color: #e98024;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  max-width: 500px;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

input {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: inherit;
  height: 15px;
  padding: 0.5em;
  border: solid 1px gray;
  border-radius: 3px;
  resize: none;
}

button {
  background-color: #84a760;
  border-radius: 8px;
}
</style>
