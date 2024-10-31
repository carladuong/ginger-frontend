<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const dropdown1 = ref("");
const dropdown2 = ref("");
const dropdown3 = ref("");
const emit = defineEmits(["refreshPosts"]);
const props = defineProps(["community"]);
let communities = ref<Array<Record<string, string>>>([]);

async function getCommunities() {
  let communityResults;
  try {
    communityResults = await fetchy("/api/allCommunities", "GET");
  } catch (_) {
    return;
  }
  communities.value = communityResults;
}

onBeforeMount(async () => {
  await getCommunities();
});

const createPost = async (content: string, community2: string, community3: string) => {
  const selectedCommunities = [props.community, community2, community3];
  const distinct = Array.from(new Set(selectedCommunities.filter((item) => item !== "")));
  console.log(selectedCommunities);
  console.log(distinct);
  if (distinct.length === 0) {
    return;
  }
  try {
    if (distinct.length === 1) {
      let community1 = distinct[0];
      await fetchy("/api/posts", "POST", {
        body: { content, community1 },
      });
    } else if (distinct.length === 2) {
      let community1 = distinct[0];
      let community2 = distinct[1];
      await fetchy("/api/posts", "POST", {
        body: { content, community1, community2 },
      });
    } else if (distinct.length === 3) {
      let community1 = distinct[0];
      let community2 = distinct[1];
      let community3 = distinct[2];
      await fetchy("/api/posts", "POST", {
        body: { content, community1, community2, community3 },
      });
    }
  } catch (_) {
    return;
  }
  emit("refreshPosts");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
  dropdown1.value = "";
  dropdown2.value = "";
  dropdown3.value = "";
};
</script>

<template>
  <form @submit.prevent="createPost(content, dropdown2, dropdown3)">
    <label for="content">Have something to share? Write your thoughts to post to this community! If you wish, select up to two additional communities to cross-post on.</label>
    <textarea id="content" v-model="content" placeholder="Write your post here!" required> </textarea>

    <label for="dropdown2">Community 2:</label>
    <select id="dropdown2" v-model="dropdown2">
      <option disabled value="">Please select a community</option>
      <option v-for="community in communities" :key="community.labelName" :value="community.labelName">
        {{ community.labelName }}
      </option>
    </select>

    <label for="dropdown3">Community 3:</label>
    <select id="dropdown3" v-model="dropdown3">
      <option disabled value="">Please select a community</option>
      <option v-for="community in communities" :key="community.labelName" :value="community.labelName">
        {{ community.labelName }}
      </option>
    </select>

    <button type="submit" class="pure-button-primary pure-button">Create Post</button>
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
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 450;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #e98024;
}

textarea {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}

button {
  background-color: #84a760;
}
</style>
