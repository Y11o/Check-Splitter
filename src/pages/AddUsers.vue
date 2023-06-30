<template>
  <a-row type="flex" justify="center" align="top">
    <a-col :span="12">
      <div class="friendsList">
        <a-form
          class="list_form"
          ref="formRef"
          name="dynamic_form_nest_item"
          :model="dynamicValidateForm"
          @finish="onFinish"
        >
          <a-space
            class="list"
            v-for="(user, index) in dynamicValidateForm.users"
            :key="user.id"
            align="baseline"
          >
            <a-avatar v-if="index % 2 === 1" class="avatarPink">{{
              user.name[0]
            }}</a-avatar>
            <a-avatar v-if="index % 2 === 0" class="avatarGreen">{{
              user.name[0]
            }}</a-avatar>
            <a-form-item
              class="form"
              :name="['users', index, 'name']"
              :rules="{
                required: true,
                message: 'Введите имя!',
              }"
            >
              <a-input
                class="input_form"
                v-model:value="user.name"
                placeholder="Имя друга"
              />
            </a-form-item>
            <DeleteOutlined class="delete_friend" @click="removeUser(user)" />
          </a-space>

          <a-form-item class="add_btn_form">
            <a-button type="dashed" class="add_friend" block @click="addUser">
              <PlusOutlined />
              Добавь друга
            </a-button>
          </a-form-item>
          <a-form-item class="continue_btn_form">
            <a-button class="continue_btn" type="primary">Далее</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  components: {
    DeleteOutlined,
    PlusOutlined,
  },
  setup() {
    const formRef = ref();
    const dynamicValidateForm = reactive({
      users: [],
    });
    const removeUser = (item) => {
      let index = dynamicValidateForm.users.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.users.splice(index, 1);
      }
    };
    const addUser = () => {
      dynamicValidateForm.users.push({
        name: "",
        id: Date.now(),
      });
    };
    const onFinish = (values) => {
      console.log("Received values of form:", values);
      console.log("dynamicValidateForm.users:", dynamicValidateForm.users);
    };
    return {
      formRef,
      dynamicValidateForm,
      onFinish,
      removeUser,
      addUser,
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

.friendsList {
  font-family: $fontName;
  margin-top: 100px;
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
      &:active {
        border-color: $myPink;
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
    background-color: $myBlack;

    .add_friend {
      color: $myWhite;
      background-color: $myGreen;
      border: none;
      border-radius: 20px;

      &:hover {
        background-color: $myPink;
      }
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