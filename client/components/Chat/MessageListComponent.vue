<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import ComposeMessageForm from "./ComposeMessageForm.vue";
import MessageComponent from "./MessageComponent.vue";

const { currentUsername } = storeToRefs(useUserStore());

const loaded = ref(false);
let messages = ref<Array<Record<string, string>>>([]);
const props = defineProps(["chatter"]);

async function getMessages() {
  let messageResults;
  try {
    messageResults = await fetchy(`/api/chats/${props.chatter}`, "GET");
  } catch (_) {
    return;
  }
  messages.value = messageResults;
}

onBeforeMount(async () => {
  await getMessages();
  loaded.value = true;
});
</script>

<template>
  <section class="messages" v-if="loaded && messages.length !== 0">
    <article v-for="message in messages" :key="message._id">
      <MessageComponent :message="message" v-bind:style="{ justifyContent: message.from === currentUsername ? 'flexEnd' : 'flexStart' }" />
    </article>
  </section>
  <p v-else-if="loaded">This is the beginning of your conversation. Send the first message!</p>
  <p v-else>Loading...</p>
  <ComposeMessageForm :chatter="chatter" @refresh-messages="getMessages" />
</template>

<style scoped>
.messages {
  display: flex;
  flex-direction: column;
}
</style>
