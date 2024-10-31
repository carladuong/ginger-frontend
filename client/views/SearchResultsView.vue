<script setup lang="ts">
import CommunityComponent from "@/components/Community/CommunityComponent.vue";
import router from "@/router";
import { useSearchResultStore } from "@/stores/searchResults";

const resultsStore = useSearchResultStore();
const results = resultsStore.results;
const symptoms = resultsStore.symptoms;

const backToExplore = async () => {
  void router.push({ name: "Explore" });
};
</script>

<template>
  <main>
    <button @click="backToExplore">Back</button>
    <h1>Showing communities tagged with {{ symptoms.join(", ") }}</h1>
    <section>
      <article v-for="result in results" :key="result._id">
        <CommunityComponent :community="result" />
      </article>
    </section>
  </main>
</template>

<style scoped>
main {
  padding-left: 50px;
  padding-top: 30px;
}

h1 {
  padding-top: 10px;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 550;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #e98024;
}

section {
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-width: 60em;
}

.post-form {
  padding-bottom: 30px;
}

.community-grid {
  padding-left: 50px;
  padding-bottom: 50px;
  padding-left: 10px;
}

article {
  background-color: #a7cc82;
  padding: 20px;
  text-align: left;
  border: 2px solid #ccc;
  border-color: #84a760;
  border-radius: 8px;
  width: 360px;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  color: #445434;
  font-variation-settings: "width" 100;
}

button {
  background-color: #84a760;
  border-radius: 16px;
  color: white;
  border: transparent;
  padding: 1em;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}
</style>
