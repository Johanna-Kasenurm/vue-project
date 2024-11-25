import { createStore } from "vuex";

export default createStore({
  state: {
    jsonData: [], // Holds posts with their details and likes
  },
  getters: {
    jsonData: (state) => state.jsonData,
  },
  mutations: {
    setJsonData(state, payload) {
      state.jsonData = payload.map((post) => ({
        ...post,
        likes: 0, // Initialize likes for each post
      }));
    },
    incrementLike(state, postId) {
      const post = state.jsonData.find((post) => post.id === postId);
      if (post) post.likes += 1;
    },
    resetLikes(state) {
      state.jsonData.forEach((post) => {
        post.likes = 0;
      });
    },
  },
  actions: {
    async loadJsonData({ commit }) {
      try {
        const response = await fetch("/posts.json");
        const data = await response.json();
        commit("setJsonData", data);
      } catch (error) {
        console.error("Error loading JSON:", error);
      }
    },
    incrementLike({ commit }, postId) {
      commit("incrementLike", postId);
    },
    resetAllLikes({ commit }) {
      commit("resetLikes");
    },
  },
  modules: {},
});
