<template>
  <a-row type="flex" justify="center" align="top">
    <a-col :span="12">
      <div class="goods_form">
        <a-form
          ref="formRef"
          name="dynamic_form_nest_item"
          :model="dynamicValidateFormGoods"
          @finish="onFinish"
        >
          <a-space
            class="goods_form__list"
            v-for="(user, index) in dynamicValidateFormGoods.goods"
            :key="user.id"
            style="display: flex; margin-bottom: 8px"
            align="baseline"
          >
            <a-form-item
              :name="['goods', index, 'goodName']"
              :rules="{
                required: true,
                message: 'Введите название продукта',
              }"
            >
              <a-input
                v-model:value="user.goodName"
                class="goods_form__input_form"
                placeholder="Название"
              />
            </a-form-item>
            <a-form-item
              :name="['goods', index, 'goodPrice']"
              :rules="{
                required: true,
                message: 'Введите цену продукта',
              }"
            >
              <a-input
                v-model:value="user.goodPrice"
                class="goods_form__input_form"
                type="number"
                placeholder="Цена"
              />
            </a-form-item>
            <DeleteOutlined
              class="goods_form__delete_good"
              @click="removeGood(user)"
            />
          </a-space>
          <a-form-item class="goods_form__add_btn_form">
            <a-button
              type="dashed"
              block
              @click="addGood"
              id="goodAdder"
              class="goods_form__add_good"
            >
              <PlusOutlined />
              Добавить позицию
            </a-button>
          </a-form-item>
          <a-form-item class="goods_form__continue_btn_form">
            <a-button
              type="primary"
              html-type="submit"
              class="goods_form__continue_btn"
              @click="checkGoods"
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
import { defineComponent, reactive, ref } from "vue";
import router from "@/router/index.js";
import users from "@/pages/AddUsers.vue";
export default defineComponent({
  components: {
    DeleteOutlined,
    PlusOutlined,
    users,
  },
  setup() {
    const formRef = ref();
    const listOfFriends = sessionStorage.getItem('friendListStorage');
    const dynamicValidateFormGoods = reactive({
      goods: [],
    });
    const removeGood = (item) => {
      let index = dynamicValidateFormGoods.goods.indexOf(item);
      if (index !== -1) {
        dynamicValidateFormGoods.goods.splice(index, 1);
      }
    };
    const addGood = () => {
      dynamicValidateFormGoods.goods.push({
        goodName: "",
        goodPrice: "",
        id: Date.now(),
      });
      console.log(users);
    };
    const checkGoods = () => {
      let choosenFlag = false;
      for (
        let index = 0;
        index < dynamicValidateFormGoods.goods.length;
        index++
      ) {
        const element = dynamicValidateFormGoods.goods[index];
        if (element.name === "" || element.name === " ") {
          choosenFlag = true;
        }
      }
      if (dynamicValidateFormGoods.goods.length < 2 || choosenFlag) {
        if (dynamicValidateFormGoods.goods.length < 2) {
          goodAdder.classList.add("error");
          goodAdder.innerHTML = "Пожалуйста, добавь хотя бы две позиции!";
        }
        if (choosenFlag) {
          goodAdder.classList.add("error");
          goodAdder.innerHTML = "Пожалуйста, введи имя друга!";
          choosenFlag = false;
        }
      } else {
        router.push("/results");
      }
    };
    const onFinish = (values) => {
      console.log("Received values of form:", values);
      console.log(
        "dynamicValidateFormGoods.goods:",
        dynamicValidateFormGoods.goods
      );
    };
    return {
      formRef,
      dynamicValidateFormGoods,
      onFinish,
      removeGood,
      addGood,
      checkGoods,
    };
  },
});
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