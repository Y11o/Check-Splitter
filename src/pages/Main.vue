<template>
  <div class="main-title">
<<<<<<< HEAD
    <a-row type="flex" justify="center" align="top">
      <!-- Настройка сетки AntDV для устройств с разным размером экрана -->
      <a-col
        :xs="{ span: 32 }"
=======
    <a-row type="flex" justify="center" align="top"> 
      <!-- Настройка сетки AntDV для устройств с разным размером экрана -->
      <a-col         
        :xs="{ span: 32 }"          
>>>>>>> 0e2dec6 (Adding files to Master)
        :sm="{ span: 18 }"
        :md="{ span: 16 }"
        :lg="{ span: 8 }"
      >
<<<<<<< HEAD
        <!-- Заголовок сайта -->
        <a-typography class="main-title__header">
          <a-typography-title class="main-title__title">
            Делим счёт
          </a-typography-title>
          <a-typography-title class="main-title__subtitle">
            Это просто!
          </a-typography-title>
=======
      <!-- Заголовок сайта -->
        <a-typography class="main-title__header">
          <a-typography-title class="main-title__title"
            >Делим счёт</a-typography-title
          >
          <a-typography-title class="main-title__subtitle"
            >Это просто!</a-typography-title
          >
>>>>>>> 0e2dec6 (Adding files to Master)
        </a-typography>
        <!-- Кнопка для перехода на страницу добавления пользователей -->
        <div class="main-title__start-btn">
          <a-button
            class="main-title__get-started-btn"
            type="primary"
            @click="$router.push('/addfriends')"
<<<<<<< HEAD
          >
            Начать!
          </a-button>
=======
            >Начать!</a-button
          >
>>>>>>> 0e2dec6 (Adding files to Master)
        </div>
        <!-- Краткая инструкция по работе с сайтом -->
        <div class="main-title__instruction">
          <a-typography class="main-title__frame">
<<<<<<< HEAD
            <a-typography-title class="main-title__mainHeader" :level="1">
              Как это работает?
            </a-typography-title>
            <div class="main-title__mainBody">
              <div>
                <div class="main-title__card">
                  <a-typography-title class="main-title__cardName" :level="2">
                    Шаг Первый
                  </a-typography-title>
=======
            <a-typography-title class="main-title__mainHeader" :level="1"
              >Как это работает?</a-typography-title
            >
            <div class="main-title__mainBody">
              <div>
                <div class="main-title__card">
                  <a-typography-title class="main-title__cardName" :level="2"
                    >Шаг Первый</a-typography-title
                  >
>>>>>>> 0e2dec6 (Adding files to Master)
                  <UsergroupAddOutlined class="main-title__icon" />
                  <a-typography-paragraph class="main-title__cardBody">
                    Добавляй всех своих друзей, кто был с тобой и что-то пил или
                    ел!
                  </a-typography-paragraph>
                </div>
              </div>

              <div>
                <div></div>
                <div class="main-title__card">
<<<<<<< HEAD
                  <a-typography-title class="main-title__cardName" :level="2">
                    Шаг Второй
                  </a-typography-title>
=======
                  <a-typography-title class="main-title__cardName" :level="2"
                    >Шаг Второй</a-typography-title
                  >
>>>>>>> 0e2dec6 (Adding files to Master)
                  <ContainerOutlined class="main-title__icon" />
                  <a-typography-paragraph class="main-title__cardBody">
                    Укажи позицию из чека. Затем отметь тех, кто будет за неё
                    платить!
                  </a-typography-paragraph>
                </div>
              </div>

              <div>
                <div></div>
                <div class="main-title__card">
                  <a-typography-title
                    class="main-title__cardName"
                    :level="2"
                    style="margin-bottom: 5px"
<<<<<<< HEAD
                  >
                    Шаг Третий
                  </a-typography-title>
=======
                    >Шаг Третий</a-typography-title
                  >
>>>>>>> 0e2dec6 (Adding files to Master)
                  <HeartFilled
                    style="color: #b22222"
                    class="main-title__icon"
                  />
                  <a-typography-paragraph class="main-title__cardBody">
                    Делим счёт сам всё посчитает! Наслаждайтесь результатами и
                    не забудьте чаевые!
                  </a-typography-paragraph>
                </div>
              </div>
            </div>
          </a-typography>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {
  UsergroupAddOutlined,
  ContainerOutlined,
  HeartFilled,
} from "@ant-design/icons-vue";

export default {
<<<<<<< HEAD
  components: {
    /// Компоненты из AntDV
=======
  components: {             /// Компоненты из AntDV
>>>>>>> 0e2dec6 (Adding files to Master)
    UsergroupAddOutlined,
    ContainerOutlined,
    HeartFilled,
  },
};
</script>

<style lang="scss" scoped>
<<<<<<< HEAD
/* fonts 300-600 */ /// Стили для Main.vue в src\assets\styles\styles.scss
=======
/* fonts 300-600 */         /// Стили для Main.vue в src\assets\styles\styles.scss
>>>>>>> 0e2dec6 (Adding files to Master)
</style>
