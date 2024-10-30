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
let selfId = ref("");

async function getMyId() {
  let userResults;
  try {
    userResults = await fetchy(`/api/users/${currentUsername.value}`, "GET");
  } catch (_) {
    return;
  }
  selfId.value = userResults._id.toString();
}

onBeforeMount(async () => {
  await getMyId();
});

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
  await getMyId();
  console.log(messages);
  loaded.value = true;
});
</script>

<template>
  <section class="messages" v-if="loaded && messages.length !== 0">
    <article v-for="message in messages" :key="message._id" :class="[message.from === selfId ? 'from-me' : 'from-other']">
      <MessageComponent :message="message" />
    </article>
  </section>
  <p v-else-if="loaded">This is the beginning of your conversation. Send the first message!</p>
  <p v-else>Loading...</p>
  <section class="compose">
    <ComposeMessageForm :chatter="chatter" @refresh-messages="getMessages" />
  </section>
</template>

<style scoped>
p {
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  text-align: center;
}

.compose {
  padding-left: 50px;
  padding-right: 50px;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 20px;
}

.from-me {
  align-self: flex-end;
  background-color: #a7cc82;
  color: #596e42;
  max-width: 400px;
  padding: 0px 15px;
  border-radius: 30px;
  font-size: 20px;
  line-height: 1;
  word-wrap: break-word;
}

.from-other {
  align-self: flex-start;
  background-color: #ffe6b5;
  color: #e98024;
  max-width: 400px;
  padding: 0px 15px;
  border-radius: 30px;
  font-size: 20px;
  line-height: 1;
  word-wrap: break-word;
}
</style>
