<template>
  <a-row type="flex" justify="center" align="top">
    <a-col :span="12">
      <div class="results">
        <a-typography class="results__frame">
          <a-typography-title class="results__mainHeader"
            >Результаты!</a-typography-title
          >
          <div class="results__mainBody" v-for="(user, index) in users" :key="user.id">
            <div class="results__card">
              <a-typography-title class="results__cardName" :level="2"
                >Друг {{ user.name }} должен</a-typography-title
              >
              <a-typography-paragraph class="results__cardBody">
                {{ user.debt }} ₽
              </a-typography-paragraph>
            </div>
          </div>
        </a-typography>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import store from "@/store/index.js";

export default {
    setup() {
    const storeUsers = store.getters.getUsersFromStore;
    const users = [];
    const storeGoods = store.getters.getGoodsFromStore;
    const goods = [];
    for (let index = 0; index < storeUsers.length; index++) {
      users.push({ id: storeUsers[index].id, name: storeUsers[index].name, debt: 0.00 });
    }
    for (let index = 0; index < storeGoods.length; index++) {
        goods.push({ id: storeGoods[index].id, name: storeGoods[index].name, price: storeGoods[index].price, goodDescribe: storeGoods[index].goodDescribe })
    }
    const countDebt = () => {
        for (let goodIndex = 0; goodIndex < goods.length; goodIndex++) {
            for (let userIndex = 0; userIndex < users.length; userIndex++) {
                if (goods[goodIndex].goodDescribe.whoAte.includes(users[userIndex].id)){
                    users[userIndex].debt += goods[goodIndex].price / goods[goodIndex].goodDescribe.whoAte.length;
                }
            }
        }
    }
    return {
      users,
      goods,
      countDebt,
    };
  },
  beforeMount(){
    this.countDebt();
  },
};
</script>

<style lang="scss" scoped>
$fontName: "Montserrat Alternates", sans-serif;
$myGreen: #479761;
$myRed: #b22222;
$myPink: #a16e83;
$myGolden: #cebc81;
$myLightGolden: #ebe3ca;
$myWhite: whitesmoke;
$myBlack: #19181a;

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

        .results__cardName{
            color: $myGreen;

        }

        .results__cardBody{
            padding: 5px;
        }

      }
    }
  }
}
</style>
