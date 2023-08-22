<template>
  <a-row type="flex" justify="center" align="top">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
    <a-col
      :xs="{ span: 32 }"
      :sm="{ span: 18 }"
      :md="{ span: 16 }"
      :lg="{ span: 8 }"
    >
<<<<<<< HEAD
      <div class="friendsList">
        <!-- Форма со списком пользователей -->
        <a-form class="list_form">
=======
    <a-col :xs="{span: 32}" :sm="{span: 18}" :md="{span: 16}" :lg="{span: 8}">
      <div class="friendsList">
        <!-- Форма со списком пользователей -->
        <a-form @submit.prevent class="list_form">
>>>>>>> 0e2dec6 (Adding files to Master)
=======
      <div class="friendsList">
        <!-- Форма со списком пользователей -->
        <a-form class="list_form">
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
          <a-space
            class="list"
            v-for="(user, index) in users"
            :key="user.id"
            align="baseline"
          >
<<<<<<< HEAD
<<<<<<< HEAD
            <!-- Настройка цвета у аватара пользователя (четные -- зеленый, нечетные -- розовый). На аватаре отрисовывается первая буква имени -->
=======
          <!-- Настройка цвета у аватара пользователя (четные -- зеленый, нечетные -- розовый). На аватаре отрисовывается первая буква имени -->
>>>>>>> 0e2dec6 (Adding files to Master)
=======
            <!-- Настройка цвета у аватара пользователя (четные -- зеленый, нечетные -- розовый). На аватаре отрисовывается первая буква имени -->
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
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
<<<<<<< HEAD
<<<<<<< HEAD
                :value="user.name"
                @input="user.name = $event.target.value"
=======
                v-bind:value="users[index].name"
                @input="users[index].name = $event.target.value"
>>>>>>> 0e2dec6 (Adding files to Master)
=======
                :value="user.name"
                @input="user.name = $event.target.value"
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
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
<<<<<<< HEAD
<<<<<<< HEAD
            <a-button class="add_friend" id="addFriend" block @click="addUser" :class="{ errorName: nameFlag, errorCount: countFlag }">
=======
            <a-button class="add_friend" id="addFriend" block @click="addUser">
>>>>>>> 0e2dec6 (Adding files to Master)
=======
            <a-button class="add_friend" id="addFriend" block @click="addUser" :class="{ errorName: nameFlag, errorCount: countFlag }">
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
              <PlusOutlined />
              Добавь друга
            </a-button>
          </a-form-item>
          <!-- Кнопка перехода на страницу с добавлением позиций. 
          При нажатии выполняется проверка (введены ли имена у всех пользователей и добавлено ли более одного пользователя). -->
          <a-form-item class="continue_btn_form">
            <a-button
              class="continue_btn"
<<<<<<< HEAD
<<<<<<< HEAD
              @click="checkFriends()"
=======
              @click="
                $store.commit('setUsers(users)');
                checkFriends();
              "
>>>>>>> 0e2dec6 (Adding files to Master)
=======
              @click="checkFriends()"
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
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
<<<<<<< HEAD
<<<<<<< HEAD
    DeleteOutlined, /// Импорт иконок из AntDV
=======
    DeleteOutlined,   /// Импорт иконок из AntDV
>>>>>>> 0e2dec6 (Adding files to Master)
=======
    DeleteOutlined, /// Импорт иконок из AntDV
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
    PlusOutlined,
  },
  data() {
    return {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
      nameFlag: false,
      countFlag: false,
      users: [
        /// Массив пользователей. Первично иницилизируется двумя пользователями без имени
<<<<<<< HEAD
=======
      users: [        /// Массив пользователей. Первично иницилизируется двумя пользователями без имени
>>>>>>> 0e2dec6 (Adding files to Master)
=======
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
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
<<<<<<< HEAD
<<<<<<< HEAD
    setUsers() {
      /// Загружает пользователей в Store (хранилище Vuex)
      this.$store.dispatch("loadUsers", this.users);
    },
    addUser() {
      /// Добавляет пользователя в список пользователей (добавляет новую пустую форму на страницу, в которую необходимо ввести имя)
=======
    setUsers() {        /// Загружает пользователей в Store (хранилище Vuex)
      this.$store.dispatch("loadUsers", this.users);
    },
    addUser() {         /// Добавляет пользователя в список пользователей (добавляет новую пустую форму на страницу, в которую необходимо ввести имя)
>>>>>>> 0e2dec6 (Adding files to Master)
=======
    setUsers() {
      /// Загружает пользователей в Store (хранилище Vuex)
      this.$store.dispatch("loadUsers", this.users);
    },
    addUser() {
      /// Добавляет пользователя в список пользователей (добавляет новую пустую форму на страницу, в которую необходимо ввести имя)
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
      const newUser = {
        id: Date.now(),
        name: "",
      };
<<<<<<< HEAD
<<<<<<< HEAD
      this.countFlag = false;
      this.nameFlag = false;
      this.users.push(newUser);
      this.setUsers(); /// Обновление Store
      addFriend.innerHTML = "Добавь друга"; /// стиль ошибки и меняет надпись на дефолтную
    },
    removeUser(item) {
      /// Удаление пользователя из массива
=======
=======
      this.countFlag = false;
      this.nameFlag = false;
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
      this.users.push(newUser);
      this.setUsers(); /// Обновление Store
      addFriend.innerHTML = "Добавь друга"; /// стиль ошибки и меняет надпись на дефолтную
    },
<<<<<<< HEAD
    removeUser(item) {                        /// Удаление пользователя из массива
>>>>>>> 0e2dec6 (Adding files to Master)
=======
    removeUser(item) {
      /// Удаление пользователя из массива
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
      let index = this.users.indexOf(item);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
<<<<<<< HEAD
<<<<<<< HEAD
      this.setUsers(); /// Обновление Store
    },
    checkFriends() {
      /// Проверка корректности введенных данных на странице, срабатывает при нажатии кнопки "Далее"
      this.nameFlag = false;
      this.nameFlag = false;
      if (this.users.length < 2) this.countFlag = true; /// Проверка, что пользователей больше 1
      for (let index = 0; index < this.users.length; index++) {
        const element = this.users[index];
        if (element.name === "" || element.name === " ") {
          /// Проверка наличия имени у всех пользователей
          this.nameFlag = true;
        }
      }
      if (this.nameFlag) {
        /// Отображение ошибки: у пользователя отсутсвует имя
        addFriend.innerHTML = "Пожалуйста, введи имя друга!";
      } else if (this.countFlag) {
        /// Отображение ошибки: пользователей меньше 2
        addFriend.innerHTML = "Пожалуйста, введи имена хотя бы двух друзей!";
      } else {
        /// Если проверка прошла успешно
=======
      this.setUsers();                        /// Обновление Store
=======
      this.setUsers(); /// Обновление Store
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
    },
    checkFriends() {
      /// Проверка корректности введенных данных на странице, срабатывает при нажатии кнопки "Далее"
      this.nameFlag = false;
      this.nameFlag = false;
      if (this.users.length < 2) this.countFlag = true; /// Проверка, что пользователей больше 1
      for (let index = 0; index < this.users.length; index++) {
        const element = this.users[index];
        if (element.name === "" || element.name === " ") {
          /// Проверка наличия имени у всех пользователей
          this.nameFlag = true;
        }
      }
      if (this.nameFlag) {
        /// Отображение ошибки: у пользователя отсутсвует имя
        addFriend.innerHTML = "Пожалуйста, введи имя друга!";
      } else if (this.countFlag) {
        /// Отображение ошибки: пользователей меньше 2
        addFriend.innerHTML = "Пожалуйста, введи имена хотя бы двух друзей!";
<<<<<<< HEAD
        countFlag = false;
      } else {                                                 /// Если проверка прошла успешно
>>>>>>> 0e2dec6 (Adding files to Master)
=======
      } else {
        /// Если проверка прошла успешно
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
        let jsonUsers = [];
        for (let elem = 0; elem < this.users.length; elem++) {
          const element = JSON.stringify(this.users[elem]);
          jsonUsers.push(element);
        }
<<<<<<< HEAD
<<<<<<< HEAD
        localStorage.setItem("storedUsersData", JSON.stringify(jsonUsers)); /// Сохранение массива пользователей в localStorage в объект storedUsersData
        this.setUsers(); /// Сохранение в Store (Vuex)
        router.push("/addgoods"); /// Переход на страницу добавления позиций чека
=======
        localStorage.setItem("storedUsersData", JSON.stringify(jsonUsers));   /// Сохранение массива пользователей в localStorage в объект storedUsersData
        this.setUsers();                                                      /// Сохранение в Store (Vuex)
        router.push("/addgoods");                                             /// Переход на страницу добавления позиций чека
>>>>>>> 0e2dec6 (Adding files to Master)
=======
        localStorage.setItem("storedUsersData", JSON.stringify(jsonUsers)); /// Сохранение массива пользователей в localStorage в объект storedUsersData
        this.setUsers(); /// Сохранение в Store (Vuex)
        router.push("/addgoods"); /// Переход на страницу добавления позиций чека
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
      }
    },
  },
  mounted() {
<<<<<<< HEAD
<<<<<<< HEAD
    if (localStorage.storedUsersData) {
      /// Развертка данных из localStorage из объекта storedUsersData при его наличии
=======
    if (localStorage.storedUsersData) {                             /// Развертка данных из localStorage из объекта storedUsersData при его наличии
>>>>>>> 0e2dec6 (Adding files to Master)
=======
    if (localStorage.storedUsersData) {
      /// Развертка данных из localStorage из объекта storedUsersData при его наличии
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
      let storedUsers = JSON.parse(localStorage.storedUsersData);
      for (let elem = 0; elem < storedUsers.length; elem++) {
        this.users.push({ id: Date.now(), name: "" });
        const userParsed = JSON.parse(storedUsers[elem]);
        this.users[elem].id = userParsed.id;
        this.users[elem].name = userParsed.name;
      }
    }
<<<<<<< HEAD
<<<<<<< HEAD
    this.users.length = this.users.length - 2; /// Убираем двух лишних, инициализированных по умолчанию пользователей
  },
  beforeMount() {
    this.setUsers(); /// Отображаем Store (без этой функции в beforeMounted Store не отображался при загрузке страницы)
=======
    this.users.length = this.users.length - 2;                      /// Убираем двух лишних, инициализированных по умолчанию пользователей
    localStorage.clear;
  },
  beforeMount() {
    this.setUsers();                                                /// Отображаем Store (без этой функции в beforeMounted Store не отображался при загрузке страницы)
>>>>>>> 0e2dec6 (Adding files to Master)
=======
    this.users.length = this.users.length - 2; /// Убираем двух лишних, инициализированных по умолчанию пользователей
  },
  beforeMount() {
    this.setUsers(); /// Отображаем Store (без этой функции в beforeMounted Store не отображался при загрузке страницы)
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
  },
};
</script>

<style lang="scss" scoped>
<<<<<<< HEAD
<<<<<<< HEAD
@import "@/assets/styles/styles.scss";
=======
@import '@/assets/styles/styles.scss';
>>>>>>> 0e2dec6 (Adding files to Master)
=======
@import "@/assets/styles/styles.scss";
>>>>>>> 5c721fb (MR ISSUES FIXED EXCEPT 2,4,13,16,20)
</style>
