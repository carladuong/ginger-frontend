<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import OptInOut from "../components/Setting/OptInOut.vue";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

async function logout() {
  await logoutUser();
  void router.push({ name: "Home" });
}

async function delete_() {
  await deleteUser();
  void router.push({ name: "Home" });
}
</script>

<template>
  <main>
    <h1>Settings for {{ currentUsername }}</h1>
    <hr class="line-separator" />
    <UpdateUserForm />
    <hr class="line-separator" />
    <OptInOut />
    <hr class="line-separator" />
    <div class="row">
      <button class="pure-button pure-button-primary" @click="logout">Logout</button>
      <button class="button-error pure-button" @click="delete_">Delete User</button>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 20px;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: start;
}

h1 {
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 450;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #aa5a13;
}

.row {
  padding-top: 20px;
  display: flex;
  gap: 50px;
  flex-direction: row;
}

button {
  font-family: "Fredoka", serif;
  font-optical-sizing: auto;
  font-weight: 450;
  font-style: normal;
  text-align: center;
  font-variation-settings: "wdth" 100;
}

.line-separator {
  border: none; /* Remove default border */
  height: 2px; /* Line height */
  background-color: #ffcb9d; /* Line color */
  margin: 20px 0; /* Space above and below the line */
}
</style>
