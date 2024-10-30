<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import AddCommonSymptomForm from "./AddCommonSymptomForm.vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const props = defineProps(["community"]);
const loaded = ref(false);
let symptoms = ref();
let isCommunityMember = ref(false);

async function getCommonSymptoms() {
  let symptomResults;
  try {
    symptomResults = await fetchy(`/api/symptoms/${props.community}`, "GET");
  } catch (_) {
    return;
  }
  symptoms.value = symptomResults;
}

async function getMemberStatus() {
  let queryResults;
  try {
    queryResults = await fetchy(`/api/communities/check/${props.community}`, "GET");
  } catch (_) {
    return;
  }
  isCommunityMember.value = queryResults;
}

async function removeSymptom(symptom: string) {
  try {
    await fetchy(`/api/communities/symptoms/${props.community}/${symptom}`, "DELETE");
  } catch (_) {
    console.log("did not delete");
    return;
  }
  await getCommonSymptoms();
}

onBeforeMount(async () => {
  await getMemberStatus();
  await getCommonSymptoms();
  loaded.value = true;
});
</script>

<template>
  <section class="symptoms" v-if="loaded && symptoms.length !== 0">
    <article v-for="symptom in symptoms" :key="symptom" v-on:click="removeSymptom(symptom)">
      <p>{{ symptom }}</p>
    </article>
  </section>
  <p v-else-if="loaded">No symptoms listed yet.</p>
  <p v-else>Loading...</p>
  <section class="form" v-if="isLoggedIn && isCommunityMember">
    <AddCommonSymptomForm v-on:refresh-symptoms="getCommonSymptoms" :community="community" />
  </section>
</template>

<style scoped>
article {
  background-color: #fff4d7;
  border-radius: 2em;
  border: 2px solid #e98024;
  line-height: 1px;
  padding: 0px 20px;
  text-align: center;
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #e98024;
}

.symptoms {
  display: flex;
  justify-content: left;
  gap: 10px;
  padding-left: 30px;
  flex-wrap: wrap;
  max-width: 500px;
  padding-top: 10px;
}

.form {
  padding-top: 10px;
}

p {
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #e98024;
}
</style>
