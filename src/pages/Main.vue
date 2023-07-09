<template>
  <div>
    <div class="main-title">
      <a-row type="flex" justify="center" align="top">
        <a-col :span="10">
          <a-typography class="main-title__header">
            <a-typography-title class="main-title__title"
              >Делим счёт</a-typography-title
            >
            <a-typography-title class="main-title__subtitle"
              >Это просто!</a-typography-title
            >
          </a-typography>
        </a-col>
      </a-row>
    </div>
    <div class="main-title__start-btn">
      <a-row type="flex" justify="center" align="top">
        <a-col :span="2">
          <a-button
            class="main-title__get-started-btn"
            type="primary"
            @click="$router.push('/addfriends')"
            >Начать!</a-button
          >
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
/* fonts 300-600 */

</style>

