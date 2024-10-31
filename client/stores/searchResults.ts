import { fetchy } from "@/utils/fetchy";
import { defineStore } from "pinia";
import { ref } from "vue";
import router from "../router";

export const useSearchResultStore = defineStore("search", () => {
  const results = ref();
  const symptoms = ref(["", ""]);

  const resetStore = () => {
    results.value = [];
  };

  const getSearchResults = async (selected: Array<string>) => {
    symptoms.value = selected;
    let symptomSearchResults;
    try {
      const stringSymptoms = selected.join("P");
      console.log("SYMPTOMS HERE");
      console.log(stringSymptoms);
      symptomSearchResults = await fetchy(`/api/communities/search/${stringSymptoms}`, "GET");
    } catch (_) {
      console.log("problem");
      return;
    }
    results.value = symptomSearchResults;
    console.log(results.value);
    void router.push({ name: "SearchResultsPage" });
  };

  return { results, symptoms, resetStore, getSearchResults };
});
