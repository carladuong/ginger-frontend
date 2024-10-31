// import { defineStore } from "pinia";
// import { computed, ref } from "vue";

// import { fetchy } from "@/utils/fetchy";

// export const useCommunityStore = defineStore('cartoon', () => {
//   // Imagine this is some data I fetched from my backend REST API
//   const cartoons = ref([
//     {
//       title: "ThunderCats",
//       desc: "ThunderCats is an American media franchise, featuring a fictional group of cat-like humanoid aliens.",
//       votes: {yay: 7, nay: 3}
//     },
//     {
//       title: "Captain Planet",
//       desc: "Our world is in peril. Gaia, the spirit of the Earth, can no longer stand the terrible destruction plaguing our planet. She sends five magic rings to five special young people.",
//       votes: {yay: 8, nay: 2}
//     },
//     {
//       title: "Top Cat",
//       desc: "The title character is the leader of a gang of Manhattan alley cats who constantly hatch get-rich-quick schemes through scams, but most of them usually backfire.",
//       votes: {yay: 1, nay: 9}
//     },
//     {
//       title: "Dexter's Labratory",
//       desc: "The series follows Dexter, an enthusiastic boy-genius with a hidden science laboratory in his room full of inventions, which he keeps secret from his clueless parents.",
//       votes: {yay: 6, nay: 4}
//     }
//   ]);

//   function voteYay(title) {
//     const toon = cartoons.value
//       .find(c => c.title === title);

//     toon.votes.yay++
//   }

//   function voteNay(title) {
//     const toon = cartoons.value
//       .find(c => c.title === title);

//     toon.votes.nay++
//   }

//   return {cartoons, voteYay, voteNay};
// });
