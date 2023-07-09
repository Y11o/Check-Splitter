<template>
  <a-row type="flex" justify="center" align="top">
    <a-col :xs="{span: 32}" :sm="{span: 18}" :md="{span: 16}" :lg="{span: 8}">
      <div class="friendsList">
        <a-form @submit.prevent class="list_form">
          <a-space
            class="list"
            v-for="(user, index) in users"
            :key="user.id"
            align="baseline"
          >
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
            <DeleteOutlined
              class="delete_friend"
              @click="removeUser(user)"
              v-if="users.length > 2"
            />
          </a-space>

          <a-form-item class="add_btn_form">
            <a-button class="add_friend" id="addFriend" block @click="addUser">
              <PlusOutlined />
              Добавь друга
            </a-button>
          </a-form-item>
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
    DeleteOutlined,
    PlusOutlined,
  },
  data() {
    return {
      users: [
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
    setUsers() {
      this.$store.dispatch("loadUsers", this.users);
    },
    addUser() {
      const newUser = {
        id: Date.now(),
        name: "",
      };
      this.users.push(newUser);
      this.setUsers();
      addFriend.classList.remove("error");
      addFriend.innerHTML = "Добавь друга";
    },
    removeUser(item) {
      let index = this.users.indexOf(item);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
      this.setUsers();
    },
    checkFriends() {
      let nameFlag = false;
      let countFlag = false;
      if (this.users.length < 2) countFlag = true;
      for (let index = 0; index < this.users.length; index++) {
        const element = this.users[index];
        if (element.name === "" || element.name === " ") {
          nameFlag = true;
        }
      }
      if (nameFlag) {
        addFriend.classList.add("error");
        addFriend.innerHTML = "Пожалуйста, введи имя друга!";
        nameFlag = false;
      } else if (countFlag) {
        addFriend.classList.add("error");
        addFriend.innerHTML = "Пожалуйста, введи имена хотя бы двух друзей!";
        countFlag = false;
      } else {
        let jsonUsers = [];
        for (let elem = 0; elem < this.users.length; elem++) {
          const element = JSON.stringify(this.users[elem]);
          jsonUsers.push(element);
        }
        localStorage.setItem("storedUsersData", JSON.stringify(jsonUsers));
        this.setUsers();
        router.push("/addgoods");
      }
    },
  },
  mounted() {
    if (localStorage.storedUsersData) {
      let storedUsers = JSON.parse(localStorage.storedUsersData);
      for (let elem = 0; elem < storedUsers.length; elem++) {
        this.users.push({ id: Date.now(), name: "" });
        const userParsed = JSON.parse(storedUsers[elem]);
        this.users[elem].id = userParsed.id;
        this.users[elem].name = userParsed.name;
      }
    }
    this.users.length = this.users.length - 2;
    localStorage.clear;
  },
  beforeMount() {
    this.setUsers();
  },
};
</script>

<style lang="scss" scoped>
.friendsList {
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
