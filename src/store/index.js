import { createStore } from 'vuex'

export default createStore({
  state: {
    users: [],
    goods: [],
  },
  getters: {
  },
  mutations: {
    setUsers: (state, users) => {
      state.users = users;
    },
  },
  actions: {
    loadUsers: (context, users) => {
      context.commit('setUsers', users);
    },
  },
  modules: {
  }
})
