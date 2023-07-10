<template>
  <a-row type="flex" justify="center" align="top">
    <a-col
      :xs="{ span: 32 }"
      :sm="{ span: 18 }"
      :md="{ span: 16 }"
      :lg="{ span: 8 }"
    >
      <div class="results">
        <a-typography class="results__frame">
          <a-typography-title class="results__mainHeader" :level="1"
            >Результаты!</a-typography-title
          >
          <div
            class="results__mainBody"
            v-for="(user, index) in users"
            :key="user.id"
          >
            <div class="results__card">
              <a-typography-title class="results__cardName" :level="2"
                >Друг {{ user.name }} должен</a-typography-title
              >
              <a-typography-title
                class="results__cardBody"
                v-if="user.debt > 0"
                :level="4"
              >
                {{ user.debt }} ₽
              </a-typography-title>
              <div v-if="user.debt === 0" class="results__cardBody">
                <a-typography-title :level="4">
                  {{ user.name }} никому ничего не должен!
                </a-typography-title>
                <LikeFilled style="color: $myBlack; font-size: 25px" />
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
    const users = [];
    const goods = [];

    const setArrays = () => {
      const goodsToVuexStore = [];
      const usersToVuexSrote = [];
      let storedGoods = JSON.parse(localStorage.storedGoodsData);
      for (let elem = 0; elem < storedGoods.length; elem++) {
        goodsToVuexStore.push({ id: Date.now(), name: "" });
        const goodsParsed = JSON.parse(storedGoods[elem]);
        goodsToVuexStore[elem].id = goodsParsed.id;
        goodsToVuexStore[elem].name = goodsParsed.name;
        goodsToVuexStore[elem].price = goodsParsed.price;
        goodsToVuexStore[elem].goodDescribe = goodsParsed.goodDescribe;
      }
      let storedUsers = JSON.parse(localStorage.storedUsersData);
      for (let elem = 0; elem < storedUsers.length; elem++) {
        usersToVuexSrote.push({ id: Date.now(), name: "" });
        const userParsed = JSON.parse(storedUsers[elem]);
        usersToVuexSrote[elem].id = userParsed.id;
        usersToVuexSrote[elem].name = userParsed.name;
      }
      store.dispatch("loadGoods", goodsToVuexStore);
      store.dispatch("loadUsers", usersToVuexSrote);

      const storeGoods = store.getters.getGoodsFromStore;
      for (let index = 0; index < storeGoods.length; index++) {
        goods.push({
          id: storeGoods[index].id,
          name: storeGoods[index].name,
          price: storeGoods[index].price,
          goodDescribe: storeGoods[index].goodDescribe,
        });
      }
      const storeUsers = store.getters.getUsersFromStore;
      for (let index = 0; index < storeUsers.length; index++) {
        users.push({
          id: storeUsers[index].id,
          name: storeUsers[index].name,
          debt: 0.0,
        });
      }
    };

    const countDebt = () => {
      for (let goodIndex = 0; goodIndex < goods.length; goodIndex++) {
        for (let userIndex = 0; userIndex < users.length; userIndex++) {
          if (
            goods[goodIndex].goodDescribe.whoAte.includes(users[userIndex].id)
          ) {
            users[userIndex].debt +=
              goods[goodIndex].price /
              goods[goodIndex].goodDescribe.whoAte.length;
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
    this.setArrays();
    this.countDebt();
  },
};
</script>

<style lang="scss" scoped>
.results {
  font-family: $fontName;
  margin-top: 100px;
  margin-bottom: 100px;
  background-color: $myGolden;
  border: none;
  border-radius: 20px;

  .results__frame {
    .results__mainHeader {
      background-color: $myLightGolden;
      color: $myGreen;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      border-radius: 20px 20px 0px 0px;
      height: 100px;
    }

    .results__mainBody {
      padding: 10px;

      .results__card {
        background-color: $myLightGolden;
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 20px;

        .results__cardName {
          color: $myGreen;
        }

        .results__cardBody {
          color: $myBlack;
          font-weight: bold;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .results__like {
            background-color: $myBlack;
          }
        }
      }
    }
  }
}
</style>
