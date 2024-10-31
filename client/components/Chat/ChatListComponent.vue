<script setup lang="ts">
import ChatComponent from "@/components/Chat/ChatComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import StartChatForm from "./StartChatForm.vue";

const loaded = ref(false);
let chats = ref<Array<Record<string, string>>>([]);

async function getChats() {
  let chatResults;
  try {
    chatResults = await fetchy("/api/chats", "GET");
  } catch (_) {
    return;
  }
  chats.value = chatResults;
}

onBeforeMount(async () => {
  await getChats();
  loaded.value = true;
});
</script>

<template>
  <section>
    <StartChatForm @refresh-chats="getChats" />
  </section>
  <section class="chats" v-if="loaded && chats.length !== 0">
    <article v-for="chat in chats" :key="chat._id">
      <ChatComponent :chat="chat" />
    </article>
  </section>
  <p v-else-if="loaded">No chats found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding-bottom: 1em;
}

section,
p,
.row {
  max-width: 60em;
}

article {
  border-radius: 1em;
  background-color: #ffe6b5;
  border: solid 2px #e98024;
  color: #e98024;
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

.posts {
  padding: 1em;
}

p {
  color: #e98024;
}
</style>
