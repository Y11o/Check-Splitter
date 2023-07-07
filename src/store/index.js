import { createStore } from 'vuex'

export default createStore({
  state: {
    users: [],
    goods: [],
  },
  getters: {
    getUsersFromStore(state) {
      return state.users
    },
    getGoodsFromStore(state) {
      return state.goods
    },
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
