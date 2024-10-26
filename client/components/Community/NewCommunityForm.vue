<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const emit = defineEmits(["refreshCommunities"]);

const createCommunity = async (content: string) => {
  try {
    await fetchy("/api/communities/create", "POST", {
      body: { communityName: content },
    });
  } catch (_) {
    return;
  }
  emit("refreshCommunities");
  emptyForm();
  await router.push({ name: "CommunityPage", params: { communityName: content } });
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="createCommunity(content)">
    <label for="content">Don't see a community that represents you? Start a new one here!</label>
    <textarea id="content" v-model="content" placeholder="Community name" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Create Community</button>
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
