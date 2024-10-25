<script setup lang="ts">
import ChatComponent from "@/components/Chat/ChatComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import StartChatForm from "./StartChatForm.vue";

const { isLoggedIn } = storeToRefs(useUserStore());

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
  <StartChatForm @refresh-chats="getChats" />
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
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border: solid;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
