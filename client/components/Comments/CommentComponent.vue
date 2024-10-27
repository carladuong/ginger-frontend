<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import AddReplyToCommentForm from "./AddReplyToCommentForm.vue";

const props = defineProps(["comment"]);
const emit = defineEmits(["editPost", "refreshPosts"]);
const { currentUsername } = storeToRefs(useUserStore());
let showReplies = ref(false);
let replies = ref<Array<Record<string, string>>>([]);
let author = ref("");

const getReplies = async () => {
  let idString = props.comment._id.toString();
  let repliesResults;
  try {
    repliesResults = await fetchy(`/api/post/comments/replies/${idString}`, "GET");
  } catch (_) {
    return;
  }
  replies.value = repliesResults;
};

const toggleReplies = async () => {
  if (showReplies.value) {
    showReplies.value = false;
  } else {
    showReplies.value = true;
  }
};

async function getAuthor() {
  author.value = (await fetchy(`/api/users/id/${props.comment.author}`, "GET")).username;
}

onBeforeMount(async () => {
  await getAuthor();
  await getReplies();
});
</script>

<template>
  <p>{{ author }}</p>
  <p>{{ props.comment.content }}</p>
  <article class="timestamp">
    <p v-if="props.comment.dateCreated !== props.comment.dateUpdated">Edited on: {{ formatDate(props.comment.dateUpdated) }}</p>
    <p v-else>Created on: {{ formatDate(props.comment.dateCreated) }}</p>
    <AddReplyToCommentForm :comment="props.comment._id" v-on:refresh-replies="getReplies" />
  </article>
  <div v-if="replies.length !== 0 && !showReplies">
    <button v-on:click="toggleReplies">Show {{ replies.length }} replies</button>
  </div>
  <div v-else-if="replies.length !== 0">
    <button v-on:click="toggleReplies">Hide replies</button>
    <article v-for="reply in replies" :key="reply._id">
      <p>Replying to {{ author }}</p>
      <CommentComponent :comment="reply" />
    </article>
  </div>
</template>

<style scoped>
p {
  margin: 0em;
}

.author {
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

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
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
