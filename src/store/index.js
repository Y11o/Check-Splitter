import { createStore } from 'vuex'

export default createStore({      /// Создание хранилища Vuex
  state: {
    users: [],      /// Список пользователей 
    goods: [],      /// Список позиций
  },
  getters: {        /// Геттеры -- возвращают массивы из state
    getUsersFromStore(state) {
      return state.users
    },
    getGoodsFromStore(state) {
      return state.goods
    },
  },
  mutations: {    /// Мутации вызываются из соответствующих Actions сохраняют полученный массив в state
    setUsers: (state, users) => {
      state.users = users;
    },
    setGoods: (state, goods) => {
      state.goods = goods;
    }
  },
  actions: {        /// Actions вызываются в компонентах для сохранения данных в хранилище
    loadUsers: (context, users) => {        /// принимают контекст и массив, котоырй необходимо сохранить
      context.commit('setUsers', users);
    },
    loadGoods: (context, goods) => {
      context.commit('setGoods', goods);
    }
  },
  modules: {
  }
})
