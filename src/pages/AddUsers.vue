<template>
  <a-row type="flex" justify="center" align="top">
    <a-col :xs="{span: 32}" :sm="{span: 18}" :md="{span: 16}" :lg="{span: 8}">
      <div class="friendsList">
        <!-- Форма со списком пользователей -->
        <a-form @submit.prevent class="list_form">
          <a-space
            class="list"
            v-for="(user, index) in users"
            :key="user.id"
            align="baseline"
          >
          <!-- Настройка цвета у аватара пользователя (четные -- зеленый, нечетные -- розовый). На аватаре отрисовывается первая буква имени -->
            <a-avatar v-if="index % 2 === 1" class="avatarPink"
              ><div v-if="user.name !== undefined">
                {{ user.name[0] }}
              </div></a-avatar
            >
            <a-avatar v-if="index % 2 === 0" class="avatarGreen"
              ><div v-if="user.name !== undefined">
                {{ user.name[0] }}
              </div></a-avatar
            >
            <!-- Форма для ввода имени (по одному на каждого пользователя) -->
            <a-form-item
              class="form"
              :rules="{
                required: true,
                message: 'Введите имя!',
              }"
            >
              <a-input
                class="input_form"
                v-bind:value="users[index].name"
                @input="users[index].name = $event.target.value"
                placeholder="Имя друга"
              />
            </a-form-item>
            <!-- Кнопка удаления пользователя из списка (появляется, если в списке больше 2 пользователей). Импорт из AntDV -->
            <DeleteOutlined
              class="delete_friend"
              @click="removeUser(user)"
              v-if="users.length > 2"
            />
          </a-space>
          <!-- Кнопка добавления пользователя. Добавляет новую форму ввода имени. Также с иконкой из AntDV -->
          <a-form-item class="add_btn_form">
            <a-button class="add_friend" id="addFriend" block @click="addUser">
              <PlusOutlined />
              Добавь друга
            </a-button>
          </a-form-item>
          <!-- Кнопка перехода на страницу с добавлением позиций. 
          При нажатии выполняется проверка (введены ли имена у всех пользователей и добавлено ли более одного пользователя). -->
          <a-form-item class="continue_btn_form">
            <a-button
              class="continue_btn"
              @click="
                $store.commit('setUsers(users)');
                checkFriends();
              "
            >
              Далее
            </a-button>
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
    DeleteOutlined,   /// Импорт иконок из AntDV
    PlusOutlined,
  },
  data() {
    return {
      users: [        /// Массив пользователей. Первично иницилизируется двумя пользователями без имени
        {
          id: Date.now() + 1,
          name: "",
        },
        {
          id: Date.now() + 2,
          name: "",
        },
      ],
    };
  },
  methods: {
    setUsers() {        /// Загружает пользователей в Store (хранилище Vuex)
      this.$store.dispatch("loadUsers", this.users);
    },
    addUser() {         /// Добавляет пользователя в список пользователей (добавляет новую пустую форму на страницу, в которую необходимо ввести имя)
      const newUser = {
        id: Date.now(),
        name: "",
      };
      this.users.push(newUser);
      this.setUsers();                        /// Обновление Store
      addFriend.classList.remove("error");    /// Убирает с элемента кнопки для добавления пользователя 
      addFriend.innerHTML = "Добавь друга";   /// стиль ошибки и меняет надпись на дефолтную
    },
    removeUser(item) {                        /// Удаление пользователя из массива
      let index = this.users.indexOf(item);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
      this.setUsers();                        /// Обновление Store
    },
    checkFriends() {                          /// Проверка корректности введенных данных на странице, срабатывает при нажатии кнопки "Далее"
      let nameFlag = false;
      let countFlag = false;
      if (this.users.length < 2) countFlag = true;      /// Проверка, что пользователей больше 1
      for (let index = 0; index < this.users.length; index++) {
        const element = this.users[index];
        if (element.name === "" || element.name === " ") {    /// Проверка наличия имени у всех пользователей 
          nameFlag = true;                                    
        }
      }
      if (nameFlag) {                                          /// Отображение ошибки: у пользователя отсутсвует имя
        addFriend.classList.add("error");
        addFriend.innerHTML = "Пожалуйста, введи имя друга!";
        nameFlag = false;
      } else if (countFlag) {                                  /// Отображение ошибки: пользователей меньше 2
        addFriend.classList.add("error");
        addFriend.innerHTML = "Пожалуйста, введи имена хотя бы двух друзей!";
        countFlag = false;
      } else {                                                 /// Если проверка прошла успешно
        let jsonUsers = [];
        for (let elem = 0; elem < this.users.length; elem++) {
          const element = JSON.stringify(this.users[elem]);
          jsonUsers.push(element);
        }
        localStorage.setItem("storedUsersData", JSON.stringify(jsonUsers));   /// Сохранение массива пользователей в localStorage в объект storedUsersData
        this.setUsers();                                                      /// Сохранение в Store (Vuex)
        router.push("/addgoods");                                             /// Переход на страницу добавления позиций чека
      }
    },
  },
  mounted() {
    if (localStorage.storedUsersData) {                             /// Развертка данных из localStorage из объекта storedUsersData при его наличии
      let storedUsers = JSON.parse(localStorage.storedUsersData);
      for (let elem = 0; elem < storedUsers.length; elem++) {
        this.users.push({ id: Date.now(), name: "" });
        const userParsed = JSON.parse(storedUsers[elem]);
        this.users[elem].id = userParsed.id;
        this.users[elem].name = userParsed.name;
      }
    }
    this.users.length = this.users.length - 2;                      /// Убираем двух лишних, инициализированных по умолчанию пользователей
    localStorage.clear;
  },
  beforeMount() {
    this.setUsers();                                                /// Отображаем Store (без этой функции в beforeMounted Store не отображался при загрузке страницы)
  },
};
</script>

<style lang="scss" scoped>
.friendsList {                                  /// Стили для AddUsers.vue (не хотели работать в общем файле со стилями)
  font-family: $fontName;
  margin-top: 100px;
  margin-bottom: 100px;
  padding: 10px;
  background-color: $myGolden;
  border: none;
  border-radius: 20px;
  display: flex;
  flex-direction: column;

  .list {
    display: flex;
    margin-bottom: 10px;
    margin-top: 10px;
    justify-content: center;

    .input_form {
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

    .avatarPink {
      background-color: $myPink;
    }
    .avatarGreen {
      background-color: $myGreen;
    }

    .delete_friend {
      color: $myRed;
      &:hover {
        color: $myPink;
      }
    }
  }

  .add_btn_form {
    margin-top: 10px;

    .add_friend {
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

  .continue_btn_form {
    display: flex;
    justify-content: center;
  }

  .continue_btn {
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
