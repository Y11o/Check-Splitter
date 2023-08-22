<template>
  <a-row type="flex" justify="center" align="top">
    <a-col
      :xs="{ span: 32 }"
      :sm="{ span: 18 }"
      :md="{ span: 16 }"
      :lg="{ span: 8 }"
    >
<<<<<<< HEAD
      <!-- Результаты. Указание кто сколько должен -->
      <div class="results">
        <a-typography class="results__frame">
          <!-- Главный заголовок -->
          <a-typography-title class="results__mainHeader" :level="1">
            Результаты!
          </a-typography-title>
          <div class="results__mainBody" v-for="user in users" :key="user.id">
            <!-- Карточка для каждого пользователя -->
            <div class="results__card">
              <a-typography-title class="results__cardName" :level="2">
                Друг {{ user.name }} должен
              </a-typography-title>
=======
    <!-- Результаты. Указание кто сколько должен -->
      <div class="results">
        <a-typography class="results__frame">
          <!-- Главный заголовок -->
          <a-typography-title class="results__mainHeader" :level="1"
            >Результаты!</a-typography-title
          >
          <div
            class="results__mainBody"
            v-for="(user) in users"
            :key="user.id"
          >
          <!-- Карточка для каждого пользователя -->
            <div class="results__card">
              <a-typography-title class="results__cardName" :level="2"
                >Друг {{ user.name }} должен</a-typography-title
              >
>>>>>>> 0e2dec6 (Adding files to Master)
              <!-- Если долг превышает 0, то указывается сумма, которую должен пользователь (float с округлением до сотых) -->
              <a-typography-title
                class="results__cardBody"
                v-if="user.debt > 0"
                :level="4"
              >
                {{ user.debt.toFixed(2) }} ₽
              </a-typography-title>
              <!-- Если сумма долга равна нулю (пользователь не был отмечен в списках ранее) -->
              <div v-if="user.debt === 0" class="results__cardBody">
                <a-typography-title :level="4">
                  {{ user.name }} никому ничего не должен!
                </a-typography-title>
                <LikeFilled style="color: #19181a; font-size: 25px" />
              </div>
            </div>
          </div>
        </a-typography>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import store from "@/store/index.js";
import { LikeFilled } from "@ant-design/icons-vue";
export default {
  components: {
    LikeFilled,
    store,
  },
  setup() {
<<<<<<< HEAD
    const users = []; /// Список пользователей инициализация
    const goods = []; /// Список позиций инициализация

    const setArrays = () => {
      let storedUsers = JSON.parse(localStorage.storedUsersData); /// Распаковка массива пользователей из localStorage.storedUsersData
      let storedGoods = JSON.parse(localStorage.storedGoodsData); /// Распаковка массива позиций из localStorage.storedGoodsData
      const goodsToVuexStore = storedGoods.map(item => JSON.parse(item)); /// Установка значений в массив
      const usersToVuexSrote = storedUsers.map(item => JSON.parse(item));

      store.dispatch("loadGoods", goodsToVuexStore); /// Заполнение Store (vuex) на странице результатов
      store.dispatch("loadUsers", usersToVuexSrote); /// значениями распакованных массивов

      const storeGoods = store.getters.getGoodsFromStore; /// Заполнение массива позиций, иницилизированного в этом компоненте
=======
    const users = [];   /// Список пользователей инициализация
    const goods = [];   /// Список позиций инициализация

    const setArrays = () => {   /// Установка значений в массив
      const goodsToVuexStore = [];
      const usersToVuexSrote = [];
      let storedGoods = JSON.parse(localStorage.storedGoodsData);
      for (let elem = 0; elem < storedGoods.length; elem++) {       /// Распаковка массива позиций из localStorage.storedGoodsData
        goodsToVuexStore.push({ id: Date.now(), name: "" });
        const goodsParsed = JSON.parse(storedGoods[elem]);
        goodsToVuexStore[elem].id = goodsParsed.id;
        goodsToVuexStore[elem].name = goodsParsed.name;
        goodsToVuexStore[elem].price = goodsParsed.price;
        goodsToVuexStore[elem].goodDescribe = goodsParsed.goodDescribe;
      }
      let storedUsers = JSON.parse(localStorage.storedUsersData);   /// Распаковка массива пользователей из localStorage.storedUsersData
      for (let elem = 0; elem < storedUsers.length; elem++) {
        usersToVuexSrote.push({ id: Date.now(), name: "" });
        const userParsed = JSON.parse(storedUsers[elem]);
        usersToVuexSrote[elem].id = userParsed.id;
        usersToVuexSrote[elem].name = userParsed.name;
      }
      store.dispatch("loadGoods", goodsToVuexStore);        /// Заполнение Store (vuex) на странице результатов
      store.dispatch("loadUsers", usersToVuexSrote);        /// значениями распакованных массивов

      const storeGoods = store.getters.getGoodsFromStore;  /// Заполнение массива позиций, иницилизированного в этом компоненте
>>>>>>> 0e2dec6 (Adding files to Master)
      for (let index = 0; index < storeGoods.length; index++) {
        goods.push({
          id: storeGoods[index].id,
          name: storeGoods[index].name,
          price: storeGoods[index].price,
          goodDescribe: storeGoods[index].goodDescribe,
        });
      }
<<<<<<< HEAD
      const storeUsers = store.getters.getUsersFromStore; /// Заполнение массива пользователей, иницилизированного в этом компоненте
=======
      const storeUsers = store.getters.getUsersFromStore;   /// Заполнение массива пользователей, иницилизированного в этом компоненте
>>>>>>> 0e2dec6 (Adding files to Master)
      for (let index = 0; index < storeUsers.length; index++) {
        users.push({
          id: storeUsers[index].id,
          name: storeUsers[index].name,
<<<<<<< HEAD
          debt: 0.0, /// Добавление нового поля debt, отвечающего за сумму, которую пользователь должен заплатить
=======
          debt: 0.0,                                        /// Добавление нового поля debt, отвечающего за сумму, которую пользователь должен заплатить
>>>>>>> 0e2dec6 (Adding files to Master)
        });
      }
    };

<<<<<<< HEAD
    const countDebt = () => {
      /// Подсчёт долга для каждого пользователя
      for (let goodIndex = 0; goodIndex < goods.length; goodIndex++) {
        for (let userIndex = 0; userIndex < users.length; userIndex++) {
          if (
            goods[goodIndex].goodDescribe.whoAte.includes(users[userIndex].id) /// Если пользователь отмечен как употребивший этот товар из списка позиций
          ) {
            users[userIndex].debt += /// К сумме его долга добавляется
              goods[goodIndex].price / /// стоимость товара,
              goods[goodIndex].goodDescribe.whoAte.length; /// разделенная на количество пользователей, которые также употребили этого товар
=======
    const countDebt = () => {                             /// Подсчёт долга для каждого пользователя
      for (let goodIndex = 0; goodIndex < goods.length; goodIndex++) {
        for (let userIndex = 0; userIndex < users.length; userIndex++) {
          if (
            goods[goodIndex].goodDescribe.whoAte.includes(users[userIndex].id)  /// Если пользователь отмечен как употребивший этот товар из списка позиций
          ) {
            users[userIndex].debt +=                                            /// К сумме его долга добавляется
              goods[goodIndex].price /                                          /// стоимость товара, 
              goods[goodIndex].goodDescribe.whoAte.length;                      /// разделенная на количество пользователей, которые также употребили этого товар
>>>>>>> 0e2dec6 (Adding files to Master)
          }
        }
      }
    };
    return {
      users,
      goods,
      setArrays,
      countDebt,
    };
  },
  beforeCreate() {
<<<<<<< HEAD
    this.setArrays(); /// Заполнение массивов перед загрузкой компонента
    this.countDebt(); /// Вызов функции подсчёта долга
=======
    this.setArrays();        /// Заполнение массивов перед загрузкой компонента
    this.countDebt();        /// Вызов функции подсчёта долга
>>>>>>> 0e2dec6 (Adding files to Master)
  },
};
</script>

<style lang="scss" scoped>
<<<<<<< HEAD
@import "@/assets/styles/styles.scss";
=======
@import '@/assets/styles/styles.scss';
>>>>>>> 0e2dec6 (Adding files to Master)
</style>
