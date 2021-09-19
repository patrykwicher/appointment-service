import { createStore } from 'vuex';

export default createStore({
  state: {
    chosenServices: [],
  },
  mutations: {
    declareChosenServices(state, chosenServices) {
      state.chosenServices = chosenServices;
    }
  },
  actions: {
  },
  modules: {
  }
})
