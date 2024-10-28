<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["chat"]);
const { currentUsername } = storeToRefs(useUserStore());
let chatter = ref("");
let lastMessage = ref("");

const getChatter = async () => {
  const currentId = (await fetchy(`/api/users/${currentUsername.value}`, "GET"))._id;
  if (props.chat.chatter1.toString() === currentId.toString()) {
    chatter.value = (await fetchy(`/api/users/id/${props.chat.chatter2.toString()}`, "GET")).username;
  } else if (props.chat.chatter2.toString() === currentId.toString()) {
    chatter.value = (await fetchy(`/api/users/id/${props.chat.chatter1.toString()}`, "GET")).username;
  } else {
    return;
  }
};

const getLastMessage = async () => {
  const messages = await fetchy(`/api/chats/${chatter.value}`, "GET");
  if (messages.length === 0) {
    lastMessage.value = "No messages to show.";
  } else {
    lastMessage.value = messages[messages.length - 1].content;
  }
};

const goToChat = async () => {
  void router.push({ name: "Messages", params: { chatter: chatter.value } });
};

onBeforeMount(async () => {
  await getChatter();
  await getLastMessage();
});
</script>

<template>
  <div v-on:click="goToChat">
    <p class="chatter">{{ chatter }}</p>
    <p class="lastMessage">{{ lastMessage }}</p>
  </div>
</template>

<style scoped>
p {
  margin: 0em;
}

.chatter {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
