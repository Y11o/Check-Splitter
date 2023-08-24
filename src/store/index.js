import { createStore } from "vuex";

export default createStore({
  /// Создание хранилища Vuex
  state: {
    users: [], /// Список пользователей
    goods: [], /// Список позиций
  },
  getters: {
    /// Геттеры -- возвращают массивы из state
    getUsersFromStore(state) {
      return state.users;
    },
    getGoodsFromStore(state) {
      return state.goods;
    },
  },
  mutations: {
    /// Мутации вызываются из соответствующих Actions сохраняют полученный массив в state
    setUsers: (state, users) => {
      state.users = users;
    },
    setGoods: (state, goods) => {
      state.goods = goods;
    },
    setUsersFromStorage: (state) => {
      if (localStorage.storedUsersData) {
        // Replace the state object with the stored item
        let parsedUsers = [];
        let storedUsers = JSON.parse(localStorage.storedUsersData);
        for (let elem = 0; elem < storedUsers.length; elem++) {
          parsedUsers.push({ id: Date.now(), name: "" });
          const userParsed = JSON.parse(storedUsers[elem]);
          parsedUsers[elem].id = userParsed.id;
          parsedUsers[elem].name = userParsed.name;
        }
        state.users = parsedUsers;
      }
    },
    setGoodsFromStorage: (state) => {
      if (localStorage.storedGoodsData) {
        /// Запись элементов из localStorage из объекта storedGoodsData (при его наличии) в массив позиций
        let parsedGoods = [];
        let storedGoods = JSON.parse(localStorage.storedGoodsData);
        for (let elem = 0; elem < storedGoods.length; elem++) {
          parsedGoods.push({ id: Date.now(), name: "" });
          const goodsParsed = JSON.parse(storedGoods[elem]);
          parsedGoods[elem] = { ...goodsParsed };
        }
        state.goods = parsedGoods;
      }
    },
  },
  actions: {
    /// Actions вызываются в компонентах для сохранения данных в хранилище
    loadUsers: (context, users) => {
      /// принимают контекст и массив, котоырй необходимо сохранить
      context.commit("setUsers", users);
    },
    loadGoods: (context, goods) => {
      context.commit("setGoods", goods);
    },
  },
});
