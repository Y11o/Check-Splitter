<template>
  <a-row type="flex" justify="center" align="top">
    <a-col
      :xs="{ span: 32 }"
      :sm="{ span: 18 }"
      :md="{ span: 16 }"
      :lg="{ span: 8 }"
    >
      <div class="goods_form">
        <!-- Форма добавления позиций -->
        <a-form class="goods" @submit.prevent>
          <a-space
            class="goods_form__list"
            v-for="(good, index) in goods"
            :key="good.id"
            align="baseline"
          >
            <!-- Форма для каждой отдельной позиции -->
            <!-- Input для названия -->
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
                  <!-- Input для цены -->
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
                <!-- Удаление позиции из списка (появляется при добавлении более двух позиций) -->
                <DeleteOutlined
                  class="goods_form__delete_good"
                  @click="removeGood(good)"
                  v-if="goods.length > 2"
                />
              </div>
              <!-- Информация о том, какие пользователи будут платить за позицию -->
              <div class="goods_form__cardsDescription">
                <a-collapse
                  v-model:activeKey="activeKey"
                  style="background-color: #ebe3ca"
                  :bordered="false"
                  :accordion="true"
                >
                  <!-- Выпадающий список пользователей (свёрнут по умолчанию) -->
                  <template #expandIcon="{ isActive }">
                    <caret-right-outlined :rotate="isActive ? 90 : 0" />
                  </template>
                  <a-collapse-panel :key="good.id" header="">
                    <div class="goods_form__cardsDescriptionContent">
                      <!-- В списке указано имя пользователя из списка, передаваемого с прошлой страницы, аватар и чекбокс -->
                      <div
                        class="goods_form__whoAte"
                        v-for="user in users"
                        :key="user.id"
                      >
                        <!-- Аватар меняет цвет при выборе пользователя. По дефолту розовый цвет, при выборе этого пользователя аватар станет зелёным -->
                        <div class="avatar">
                          <a-avatar
                            v-if="
                              !goods[index].goodDescribe.whoAte.includes(
                                user.id
                              )
                            "
                            class="avatarPink"
                            ><div v-if="user !== undefined">
                              {{ user.name[0] }}
                            </div></a-avatar
                          >

                          <a-avatar
                            v-if="
                              goods[index].goodDescribe.whoAte.includes(user.id)
                            "
                            class="avatarGreen"
                            ><div v-if="user !== undefined">
                              {{ user.name[0] }}
                            </div></a-avatar
                          >
                        </div>
                        <!-- Чекбокс для отметки пользователя -->
                        <div class="goods_form__checkBox">
                          <label class="goods_form__label">
                            <input
                              type="checkbox"
                              class="goods_form__checkbox"
                              :value="user.id"
                              v-model="goods[index].goodDescribe.whoAte"
                            />
                            <span class="goods_form__fakeCheckBox"></span>
                            <span class="goods_form__userName">
                              {{ user.name }}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div class="goods_form__whoPaid"></div>
                    </div>
                  </a-collapse-panel>
                </a-collapse>
              </div>
            </div>
          </a-space>
          <!-- Кнопка добавления позиции -->
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
          <!-- Переход к подсчитанным результатм -->
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
  /// Импорт компонентов из AntDV
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
        /// Список позиций
        {
          id: Date.now() + 1, /// Уникальный ID позиции
          name: "", /// Название позиции
          price: undefined, /// Цена позиции
          goodDescribe: {
            whoPaid: "", /// Для будущих обновлений (указание человека, который платил за позицию и которому должны другие пользователи)
            whoAte: [], /// Между кем будет делится стоимость позиции
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
      users: [], /// Список пользователей
    };
  },
  methods: {
    setGoods() {
      /// Добавление позиций в Store (Vuex)
      this.$store.dispatch("loadGoods", this.goods);
    },
    addGood() {
      /// Добавление позиции в список позиций (создание новой пустой формы)
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
      this.setGoods(); /// Обновление Store
      goodAdder.classList.remove("error"); /// Убирает с элемента кнопки для добавления позиции
      goodAdder.innerHTML = "Добавь позицию"; /// стиль ошибки и меняет надпись на дефолтную
    },
    removeGood(item) {
      /// Удаление позиции из списка
      let index = this.goods.indexOf(item);
      if (index !== -1) {
        this.goods.splice(index, 1);
      }
      this.setGoods();
    },
    checkGoods() {
      /// Проверка корректности введеных данных
      let errorFlag = false;
      let countFlag = false;
      if (this.goods.length < 2) countFlag = true; /// Проверка наличия хотя бы двух позиций
      for (let index = 0; index < this.goods.length; index++) {
        /// Проверка указания имени, цены и пользователей, которые будут платить за позицию
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
        /// Вывод ошибки об отсутсвии необходимых данных
        goodAdder.classList.add("error");
        goodAdder.innerHTML = "Пожалуйста, введи всю информацию о позиции!";
        errorFlag = false;
      } else if (countFlag) {
        /// Вывод ошибки о налиции менее двух позиций в списке
        goodAdder.classList.add("error");
        goodAdder.innerHTML = "Пожалуйста, введи хотя бы две позиции!";
        countFlag = false;
      } else {
        /// Если ошибки отсутсвуют
        let jsonGoods = [];
        for (let elem = 0; elem < this.goods.length; elem++) {
          const element = JSON.stringify(this.goods[elem]);
          jsonGoods.push(element);
        }
        localStorage.setItem("storedGoodsData", JSON.stringify(jsonGoods)); /// Сохранение массива позиций в localStorage в объект storedGoodsData
        this.setGoods(); /// Сохранение в Store (Vuex)
        router.push("/results"); /// Переход на страницу с результатми
      }
    },
  },
  setup() {
    /// Настройка положения выпадающего списка пользователей в форме
    const activeKey = ref(["1"]);
    return {
      activeKey,
    };
  },
  mounted() {
    if (localStorage.storedGoodsData) {
      /// Запись элементов из localStorage из объекта storedGoodsData (при его наличии) в массив позиций
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
    this.goods.length = this.goods.length - 2; /// Удаление двух инициализированных в объявлении списка позиций
    localStorage.clear;
  },
  beforeMount() {
    this.setGoods();
    let storedUsers = JSON.parse(localStorage.storedUsersData); /// Создание списка пользователей из объекта storedUsersData в localStorage
    for (let elem = 0; elem < storedUsers.length; elem++) {
      this.users.push({ id: Date.now(), name: "" });
      const userParsed = JSON.parse(storedUsers[elem]);
      this.users[elem].id = userParsed.id;
      this.users[elem].name = userParsed.name;
    }
    this.$store.dispatch("loadUsers", this.users); /// Обновление хранилища Vuex (списка пользователей) на странице добавления позиций
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/styles.scss";
</style>
