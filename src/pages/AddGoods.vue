<template>
  <a-row type="flex" justify="center" align="top">
    <a-col :xs="{span: 32}" :sm="{span: 18}" :md="{span: 16}" :lg="{span: 8}">
      <div class="goods_form">
        <a-form class="goods" @submit.prevent>
          <a-space
            class="goods_form__list"
            v-for="(good, index) in goods"
            :key="good.id"
            align="baseline"
          >
            <div class="goods_form__goodCard">
              <div class="goods_form__cardsName">
                <a-form-item
                  class="form"
                  style="margin-right: 10px"
                  :rules="{
                    required: true,
                    message: 'Введите название продукта',
                  }"
                >
                  <a-input
                    v-bind:value="goods[index].name"
                    @input="goods[index].name = $event.target.value"
                    class="goods_form__input_form"
                    placeholder="Название"
                  />
                </a-form-item>
                <a-form-item
                  class="form"
                  :rules="{
                    required: true,
                    message: 'Введите цену продукта',
                  }"
                >
                  <a-input
                    v-bind:value="goods[index].price"
                    @input="goods[index].price = $event.target.value"
                    class="goods_form__input_form"
                    type="number"
                    placeholder="Цена"
                  />
                </a-form-item>
                <DeleteOutlined
                  class="goods_form__delete_good"
                  @click="removeGood(good)"
                  v-if="goods.length > 2"
                />
              </div>
              <div class="goods_form__cardsDescription">
                <a-collapse
                  v-model:activeKey="activeKey"
                  style="background-color: #ebe3ca"
                  :bordered="false"
                  :accordion="true"
                >
                  <template #expandIcon="{ isActive }">
                    <caret-right-outlined :rotate="isActive ? 90 : 0" />
                  </template>
                  <a-collapse-panel :key="good.id" header=""> 
                    <div class="goods_form__cardsDescriptionContent">
                      <div
                        class="goods_form__whoAte"
                        v-for="(user, userIndex) in users"
                        :key="user.id"
                      >
                        <div class="avatar">
                          <a-avatar
                            v-if="!goods[index].goodDescribe.whoAte.includes(user.id)"
                            class="avatarPink"
                            ><div v-if="user !== undefined">
                              {{ user.name[0] }}
                            </div></a-avatar
                          >

                          <a-avatar
                            v-if="goods[index].goodDescribe.whoAte.includes(user.id)"
                            class="avatarGreen"
                            ><div v-if="user !== undefined">
                              {{ user.name[0] }}
                            </div></a-avatar
                          >
                        </div>
                        <input
                          type="checkbox"
                          class="goods_form__checkbox"
                          :value="user.id"
                          v-model="goods[index].goodDescribe.whoAte"
                        />
                        <label class="goods_form__userName">{{
                          user.name
                        }}</label>
                        <div class="goods_form__check"></div>
                      </div>
                      <div class="goods_form__whoPaid"></div>
                    </div>
                  </a-collapse-panel>
                </a-collapse>
              </div>
            </div>
          </a-space>
          <a-form-item class="goods_form__add_btn_form">
            <a-button
              block
              @click="addGood"
              id="goodAdder"
              class="goods_form__add_good"
            >
              <PlusOutlined />
              Добавь позицию
            </a-button>
          </a-form-item>
          <a-form-item class="goods_form__continue_btn_form">
            <a-button class="goods_form__continue_btn" @click="checkGoods()"
              >К результатам</a-button
            >
          </a-form-item>
        </a-form>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import {
  DeleteOutlined,
  PlusOutlined,
  CaretRightOutlined,
} from "@ant-design/icons-vue";
import store from "@/store/index.js";
import { ref } from "vue";
import router from "@/router/index.js";
export default {
  components: {
    DeleteOutlined,
    PlusOutlined,
    CaretRightOutlined,
    store,
  },
  data() {
    return {
      goods: [
        {
          id: Date.now() + 1,
          name: "",
          price: undefined,
          goodDescribe: {
            whoPaid: "",
            whoAte: [],
          },
        },
        {
          id: Date.now() + 2,
          name: "",
          price: undefined,
          goodDescribe: {
            whoPaid: "",
            whoAte: [],
          },
        },
      ],
      users:[],
    };
  },
  methods: {
    setGoods() {
      this.$store.dispatch("loadGoods", this.goods);
    },
    addGood() {
      const newGood = {
        id: Date.now(),
        name: "",
        price: undefined,
        goodDescribe: {
          whoPaid: "",
          whoAte: [],
        },
      };
      this.goods.push(newGood);
      this.setGoods();
      goodAdder.classList.remove("error");
      goodAdder.innerHTML = "Добавь позицию";
    },
    removeGood(item) {
      let index = this.goods.indexOf(item);
      if (index !== -1) {
        this.goods.splice(index, 1);
      }
      this.setGoods();
    },
    checkGoods() {
      let errorFlag = false;
      let countFlag = false;
      if (this.goods.length < 2) countFlag = true;
      for (let index = 0; index < this.goods.length; index++) {
        const element = this.goods[index];
        if (
          element.name === "" ||
          element.name === " " ||
          element.price === undefined ||
          element.price === "" ||
          element.price === " " ||
          element.goodDescribe.whoAte === []
        ) {
          errorFlag = true;
        }
      }
      if (errorFlag) {
        goodAdder.classList.add("error");
        goodAdder.innerHTML = "Пожалуйста, введи всю информацию о позиции!";
        errorFlag = false;
      } else if (countFlag) {
        goodAdder.classList.add("error");
        goodAdder.innerHTML = "Пожалуйста, введи хотя бы две позиции!";
        countFlag = false;
      } else {
        let jsonGoods = [];
        for (let elem = 0; elem < this.goods.length; elem++) {
          const element = JSON.stringify(this.goods[elem]);
          jsonGoods.push(element);
        }
        localStorage.setItem("storedGoodsData", JSON.stringify(jsonGoods));
        this.setGoods();
        router.push("/results");
      }
    },
  },
  setup() {
    const activeKey = ref(["1"]);
    return {
      activeKey,
    };
  },
  mounted() {
    if (localStorage.storedGoodsData) {
      let storedGoods = JSON.parse(localStorage.storedGoodsData);
      for (let elem = 0; elem < storedGoods.length; elem++) {
        this.goods.push({ id: Date.now(), name: "" });
        const goodsParsed = JSON.parse(storedGoods[elem]);
        this.goods[elem].id = goodsParsed.id;
        this.goods[elem].name = goodsParsed.name;
        this.goods[elem].price = goodsParsed.price;
        this.goods[elem].goodDescribe = goodsParsed.goodDescribe;
      }
    }
    this.goods.length = this.goods.length - 2;
    localStorage.clear;
  },
  beforeMount() {
    this.setGoods();
    let storedUsers = JSON.parse(localStorage.storedUsersData);
    for (let elem = 0; elem < storedUsers.length; elem++) {
      this.users.push({ id: Date.now(), name: "" });
      const userParsed = JSON.parse(storedUsers[elem]);
      this.users[elem].id = userParsed.id;
      this.users[elem].name = userParsed.name;
    }
    this.$store.dispatch("loadUsers", this.users);
  },
};
</script>

<style lang="scss" scoped>

.goods_form {
  font-family: $fontName;
  margin-top: 100px;
  margin-bottom: 100px;
  padding: 10px;
  background-color: $myGolden;
  border: none;
  border-radius: 20px;
  display: flex;
  flex-direction: column;

  .goods_form__goodCard {
    .goods_form__cardsName {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .goods_form__cardsDescription {
      display: flex;
      flex-direction: row;
      justify-content: center;
      background-color: $myLightGolden;

      .goods_form__cardsDescriptionContent {
        .goods_form__whoPaid {
        }
        .goods_form__whoAte {
          margin: auto 5px;
          display: flex;
          flex-direction: row;

          .goods_form__userName {
            margin: 5px 20px;
          }
          .avatar {
            margin: 3px 20px;
          }
        }
      }
    }
  }

  .goods_form__list {
    display: flex;
    padding: 10px;
    margin-bottom: 5px;
    margin-top: 10px;
    justify-content: center;
    border-color: $myPink;

    .goods_form__input_form {
      background-color: $myLightGolden;
      color: $myGreen;

      &:hover {
        border-color: $myPink;
      }
      &:focus {
        border-color: $myPink;
        box-shadow: 2px 2px 2px 0px $myPink;
        filter: drop-shadow(2px 2px 2px $myPink);
      }
    }

    .goods_form__delete_good {
      color: $myRed;
      margin-left: 10px;
      margin-bottom: 30px;
      &:hover {
        color: $myPink;
      }
    }
  }

  .goods_form__add_btn_form {
    margin-top: 10px;

    .goods_form__add_good {
      color: $myWhite;
      background-color: $myGreen;
      border: none;
      padding: 0px;

      &:hover {
        background-color: $myPink;
      }
    }

    .error {
      background-color: $myRed;
    }
  }

  .avatarPink {
    background-color: $myPink;
  }
  .avatarGreen {
    background-color: $myGreen;
  }

  .goods_form__continue_btn_form {
    display: flex;
    justify-content: center;
  }

  .goods_form__continue_btn {
    color: $myWhite;
    font-size: 1em;
    border: none;
    border-radius: 20px;
    background-color: $myGreen;
    display: flex;
    justify-content: center;
    margin: 0 auto;

    &:hover {
      background-color: $myPink;
    }
  }
}
</style>
