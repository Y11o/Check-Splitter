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
$fontName: "Montserrat Alternates", sans-serif;
$myGreen: #479761;
$myPink: #a16e83;
$myGolden: #cebc81;
$myWhite: whitesmoke;
$myBlack: #19181a;


.main-title {
  margin-top: 70px;
  margin-bottom: 100px;
  padding: 10px;

  .main-title__header {
    font-family: $fontName;
    background-color: $myGolden;
    border-radius: 0 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .main-title__title {
    margin: 5px auto;
    font-size: 5em;
    color: $myGreen;
  }
  .main-title__subtitle {
    font-size: 3em;
    color: $myGreen;
  }
}

.main-title__start-btn {
  margin-top: 2em;

  .main-title__get-started-btn {
    font-family: $fontName;
    color: $myWhite;
    font-size: 2em;
    height: 2.5em;
    border: none;
    border-radius: 10px;
    background-color: $myGreen;

    &:hover {
      background-color: $myPink;
    }
    &:active {
      background-color: $myPink;
    }
  }
}
</style>>

