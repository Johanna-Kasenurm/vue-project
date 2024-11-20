import { createStore } from 'vuex'

export default createStore({
  state: {
    jsonData: []
  },
  getters: {
    jsonData: (state) => state.jsonData
  },
  mutations: {
    // Mutation to update the state
    setJsonData(state, payload) {
      state.jsonData = payload;
    }
  },
  actions: {
    async loadJsonData({ commit }) {
      try {
        const response = await fetch("/posts.json");
        const data = await response.json();
        commit('setJsonData', data)
      } catch (error) {
        console.error('Error loading JSON:', error);
      }
    }
  },
  modules: {
  }
})
