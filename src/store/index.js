import { createStore } from "vuex";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})


/*
export default createStore({
  state: {
    jsonData: [], // Holds posts with their details and likes
  },
  // Getters are functions that allow you to access the state 
  getters: {
    jsonData: (state) => state.jsonData,
  },
  // Mutations are synchronous functions that modify the state 
  mutations: {
    // Takes payload (array of posts) and initializes the jsonData state with it
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
  // Actions are asynchronous functions that can commit mutations
  actions: {
    async loadJsonData({ commit }) {
      try {
        // Fetches JSON data from a specific URL
        const response = await fetch("/posts.json");
        // Converts response to JavaScript  object
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
*/
