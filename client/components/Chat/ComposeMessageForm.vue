<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const props = defineProps(["chatter"]);
const emit = defineEmits(["refreshMessages"]);

const composeMessage = async (content: string) => {
  try {
    await fetchy(`/api/chats/send/${props.chatter}`, "POST", {
      body: { content },
    });
  } catch (_) {
    return;
  }
  emit("refreshMessages");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="composeMessage(content)">
    <textarea id="content" v-model="content" placeholder="Write a message here..." required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Send Message</button>
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
