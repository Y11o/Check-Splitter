<template>
  <div class="main-title">
    <a-row type="flex" justify="center" align="top">
      <a-col
        :xs="{ span: 32 }"
        :sm="{ span: 18 }"
        :md="{ span: 16 }"
        :lg="{ span: 8 }"
      >
        <a-typography class="main-title__header">
          <a-typography-title class="main-title__title"
            >Делим счёт</a-typography-title
          >
          <a-typography-title class="main-title__subtitle"
            >Это просто!</a-typography-title
          >
        </a-typography>
        <div class="main-title__start-btn">
          <a-button
            class="main-title__get-started-btn"
            type="primary"
            @click="$router.push('/addfriends')"
            >Начать!</a-button
          >
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
/* fonts 300-600 */
</style>
