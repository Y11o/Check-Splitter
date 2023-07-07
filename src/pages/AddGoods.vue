<template>
  <a-row type="flex" justify="center" align="top">
    <a-col :span="12">
      <div class="goods_form">
        <a-form class="goods" @submit.prevent>
          <a-space
            class="goods_form__list"
            v-for="(good, index) in goods"
            :key="good.id"
            align="baseline"
          >
            <a-form-item
              class="form"
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
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons-vue";
import router from "@/router/index.js";
export default {
  components: {
    DeleteOutlined,
    PlusOutlined,
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
    };
  },
  methods: {
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
      this.$store.dispatch("loadGoods", this.goods);
      goodAdder.classList.remove("error");
      goodAdder.innerHTML = "Добавь позицию";
    },
    removeGood(item) {
      let index = this.goods.indexOf(item);
      if (index !== -1) {
        this.goods.splice(index, 1);
      }
      this.$store.dispatch("loadGoods", this.goods);
    },
    checkGoods() {
      let errorFlag = false;
      for (let index = 0; index < this.goods.length; index++) {
        const element = this.goods[index];
        if (
          element.name === "" ||
          element.name === " " ||
          element.price === undefined
        ) {
          errorFlag = true;
        }
      }
      if (errorFlag) {
        goodAdder.classList.add("error");
        goodAdder.innerHTML = "Пожалуйста, введи всю информацию о позиции!";
        errorFlag = false;
      } else {
        this.$store.dispatch("loadGoods", this.goods);
        router.push("/results");
      }
    },
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.goods_form {
  font-family: $fontName;
  margin-top: 100px;
  background-color: $myGolden;
  border: none;
  border-radius: 20px;
  display: flex;
  flex-direction: column;

  .goods_form__list {
    display: flex;
    margin-bottom: 10px;
    margin-top: 10px;
    justify-content: center;

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

      &:hover {
        background-color: $myPink;
      }
    }

    .error {
      background-color: $myRed;
    }
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
