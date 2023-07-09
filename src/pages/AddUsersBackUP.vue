<template>
  <a-row type="flex" justify="center" align="top">
    <a-col :span="12">
      <div class="friendsList">
        <a-form
          class="list_form"
          ref="formRef"
          name="dynamic_form_nest_item"
          :model="dynamicValidateFormFriends"
          @finish="onFinish"
        >
          <a-space
            class="list"
            v-for="(user, index) in dynamicValidateFormFriends.users"
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
            <a-button
              type="dashed"
              class="add_friend"
              id="addFriend"
              block
              @click="addUser"
            >
              <PlusOutlined />
              Добавь друга
            </a-button>
          </a-form-item>
          <a-form-item class="continue_btn_form">
            <a-button class="continue_btn" @click="checkFriends">
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
import { defineComponent, reactive, ref } from "vue";
import router from "@/router/index.js";
export default defineComponent({
  components: {
    DeleteOutlined,
    PlusOutlined,
  },
  setup() {
    const formRef = ref();
    const dynamicValidateFormFriends = reactive({
      users: [],
    });
    const removeUser = (item) => {
      let index = dynamicValidateFormFriends.users.indexOf(item);
      if (index !== -1) {
        dynamicValidateFormFriends.users.splice(index, 1);
      }
    };
    const addUser = () => {
      dynamicValidateFormFriends.users.push({
        name: "",
        id: Date.now(),
      });
      addFriend.classList.remove("error");
      addFriend.innerHTML = "Добавь друга";
    };
    const checkFriends = () => {
      let nameFlag = false;
      for (
        let index = 0;
        index < dynamicValidateFormFriends.users.length;
        index++
      ) {
        const element = dynamicValidateFormFriends.users[index];
        if (element.name === "" || element.name === " ") {
          nameFlag = true;
        }
      }
      if (dynamicValidateFormFriends.users.length < 2 || nameFlag) {
        if (dynamicValidateFormFriends.users.length < 2) {
          addFriend.classList.add("error");
          addFriend.innerHTML = "Пожалуйста, добавь хотя бы двух друзей!";
        }
        if (nameFlag) {
          addFriend.classList.add("error");
          addFriend.innerHTML = "Пожалуйста, введи имя друга!";
          nameFlag = false;
        }
      } else {
        router.push("/addgoods");
      }
    };
    const onFinish = (values) => {
      console.log("Received values of form:", values);
      console.log(
        "dynamicValidateFormFriends.users:",
        dynamicValidateFormFriends.users
      );
    };
    return {
      formRef,
      dynamicValidateFormFriends,
      onFinish,
      removeUser,
      addUser,
      checkFriends,
    };
  },
});
</script>

<style lang="scss" scoped>
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
    background-color: $myBlack;

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
