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
    setGoods: (state, goods) => {
      state.goods = goods;
    }
  },
  actions: {
    loadUsers: (context, users) => {
      context.commit('setUsers', users);
    },
    loadGoods: (context, goods) => {
      context.commit('setGoods', goods);
    }
  },
  modules: {
  }
})
