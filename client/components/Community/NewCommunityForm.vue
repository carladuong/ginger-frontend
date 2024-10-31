<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const emit = defineEmits(["refreshCommunities"]);

const createCommunity = async (content: string) => {
  try {
    await fetchy(`/api/community/${content}`, "POST");
  } catch (_) {
    return;
  }
  const community = content;
  emit("refreshCommunities");
  emptyForm();
  void router.push({ name: "CommunityPage", params: { communityName: community } });
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="createCommunity(content)">
    <h3>Don't see a community that represents you? Start a new one here!</h3>
    <!-- <label for="content">Don't see a community that represents you? Start a new one here!</label> -->
    <input type="text" id="content" v-model="content" placeholder="Community name" required />
    <button type="submit" class="pure-button-primary pure-button">Create Community</button>
  </form>
</template>

<style scoped>
form {
  background-color: #ffe6b5;
  border: 2px solid #e98024;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  width: 800px;
  color: #e98024;
}

input {
  font-size: inherit;
  height: 15px;
  padding: 0.5em;
  resize: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

button {
  background-color: #84a760;
  border-radius: 8px;
}

h3 {
  margin-top: 0px;
  margin-bottom: 10px;
  font-weight: normal;
}
</style>
