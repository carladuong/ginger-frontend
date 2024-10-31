<script setup lang="ts">
import { useSearchResultStore } from "@/stores/searchResults";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const resultsStore = useSearchResultStore();
let allSymptoms = ref();
let selected = ref([]);

const getSymptoms = async () => {
  let symptomResults;
  try {
    symptomResults = await fetchy("/api/allSymptoms", "GET");
  } catch (_) {
    return;
  }
  allSymptoms.value = symptomResults;
};

const emptyForm = () => {
  content.value = "";
};

onBeforeMount(async () => {
  await getSymptoms();
});
</script>

<template>
  <form @submit.prevent="resultsStore.getSearchResults(selected)">
    <h2>Symptom Search</h2>
    <h3>
      Although this is not a substitute for a diagnosis, it can be helpful to find communities where people are talking about how to manage symptoms that you may have. Select one or more symptoms and
      find communities tagged with them.
    </h3>
    <div class="checkboxContainer">
      <label v-for="symptom in allSymptoms" :key="symptom">
        <input type="checkbox" :value="symptom.labelName" v-model="selected" />
        {{ symptom.labelName }}
      </label>
    </div>
    <button type="submit" class="pure-button-primary pure-button">Search</button>
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

h2 {
  margin-bottom: 0px;
  margin-top: 10px;
}

h3 {
  margin-top: 0px;
  margin-bottom: 10px;
  font-weight: normal;
}

.checkboxContainer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
}

button {
  background-color: #84a760;
  border-radius: 8px;
}
</style>
