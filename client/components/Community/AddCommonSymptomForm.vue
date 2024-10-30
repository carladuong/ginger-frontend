<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const symptom = ref("");
const props = defineProps(["community"]);
const emit = defineEmits(["refreshSymptoms"]);
const inputToggled = ref(false);
const buttonText = ref("Add a common symptom");

const addSymptom = async (symptom: string) => {
  try {
    symptom = symptom.toLowerCase();
    await fetchy(`/api/communities/symptoms/${props.community}`, "POST", {
      body: { symptom },
    });
  } catch (_) {
    return;
  }
  emit("refreshSymptoms");
  emptyForm();
  await toggleInput();
};

const toggleInput = async () => {
  if (inputToggled.value) {
    inputToggled.value = false;
    buttonText.value = "Add a common symptom";
    emptyForm();
  } else {
    inputToggled.value = true;
    buttonText.value = "Hide";
  }
};

const emptyForm = () => {
  symptom.value = "";
};
</script>

<template>
  <div>
    <button v-on:click="toggleInput">{{ buttonText }}</button>
    <form v-if="inputToggled" @submit.prevent="addSymptom(symptom)">
      <input id="content" v-model="symptom" placeholder="Add a common symptom..." maxlength="20" required />
      <button type="submit" class="pure-button-primary pure-button">Add</button>
    </form>
    <p>...or click an existing symptom to remove it.</p>
  </div>
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
  border-radius: 2em;
  border: 2px solid #84a760;
  padding: 6px 20px;
  text-align: center;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: white;
}

p {
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 450;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #e98024;
}

div {
  padding-top: 50px;
}
</style>
