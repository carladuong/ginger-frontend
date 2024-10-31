import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import ChatView from "../views/ChatView.vue";
import CommunityPageView from "../views/CommunityPageView.vue";
import ExploreCommunitiesView from "../views/ExploreCommunitiesView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import PostPageView from "../views/PostPageView.vue";
import SearchResultsView from "../views/SearchResultsView.vue";
import SettingView from "../views/SettingView.vue";
import SingleChatView from "../views/SingleChatView.vue";
import UserProfileView from "../views/UserProfileView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value) {
          return { name: "Settings" };
        }
      },
    },
    {
      path: "/chats",
      name: "Chats",
      component: ChatView,
      meta: { requiresAuth: false },
    },
    {
      path: "/explore",
      name: "Explore",
      component: ExploreCommunitiesView,
      meta: { requiresAuth: false },
    },
    {
      path: "/community/:communityName",
      name: "CommunityPage",
      component: CommunityPageView,
      meta: { requiresAuth: false },
    },
    {
      path: "/post/:postId",
      name: "PostPage",
      component: PostPageView,
      meta: { requiresAuth: false },
    },
    {
      path: "/messages/:chatter",
      name: "Messages",
      component: SingleChatView,
      meta: { requiresAuth: false },
    },
    {
      path: "/user/:username",
      name: "UserProfile",
      component: UserProfileView,
      meta: { requiresAuth: false },
    },
    {
      path: "/searchResults",
      name: "SearchResultsPage",
      component: SearchResultsView,
      meta: { requiresAuth: false },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }
});

export default router;
