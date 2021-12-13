<template>
  <div class="container">
    <div class="first-column">
      <form @submit.prevent id="form">
        <div class="header">LOG IN TO YOUR ACCOUNT</div>
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
        <div class="email">
          <input
            type="email"
            placeholder="E-mail address"
            v-model="userData.email"
          />
        </div>
        <div class="password">
          <input
            type="password"
            placeholder="Password"
            v-model="userData.password"
          />
        </div>
        <div class="login-button">
          <LoginButton text="LOGIN" @click="loginUser" />
        </div>
      </form>
    </div>
    <div class="second-column">
      <div class="create-header">CREATE AN ACCOUNT</div>
      <div class="registration-text">
        Registration will allow you to book new visits quickly.
      </div>
      <div>
        <router-link to="register" class="register-button">
          <LoginButton text="REGISTER" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "@vue/runtime-core";
import LoginButton from "../components/LoginButton.vue";
import createStore from "../store/index";
import router from "../router/index";

export default defineComponent({
  setup() {
    const userData = reactive({
      email: "",
      password: "",
    });
    const errorMessage = ref<string>("");

    const getUserVisits = () => {
      createStore.dispatch("fetchSavedUserServices");
    };

    const loginUser = async () => {
      try {
        const userInfos = await fetch("http://localhost:3000/clients/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userData.email,
            password: userData.password,
          }),
        });

        const user = await userInfos.json();

        if (user.message) {
          errorMessage.value = user.message;
          createStore.commit("setCheckIfCurrentUserObjectExists", false);
        } else {
          createStore.commit("setCurrentUser", user);
          createStore.commit("setCheckIfCurrentUserObjectExists", true);
          router.push("/");
        }

        getUserVisits();
      } catch (err) {
        console.log(err.message);
      }
    };

    return {
      userData,
      loginUser,
      errorMessage,
    };
  },
  components: {
    LoginButton,
  },
});
</script>

<style lang="scss" scoped>
$container-background: #f6f6f6;

@media (max-width: 320px) {
  .container {
    height: 85vh;
    background-color: $container-background;
    text-align: center;

    .first-column {
      #form {
        text-align: center;

        .header {
          padding-top: 2rem;
          font-weight: 700;
        }

        .error-message {
          color: red;
          font-size: 0.7rem;
          margin-top: 0.6rem;
        }

        .email,
        .password {
          input {
            margin-top: 1rem;
            width: 80%;
            padding: 0.5rem 0.5rem;
          }
        }

        .login-button {
          width: 87vw;
          margin: 0.7rem auto;
        }
      }
    }

    .second-column {
      .create-header {
        padding: 2.2rem 0 0.2rem;
        font-weight: 700;
      }

      .registration-text {
        font-size: 0.9rem;
        margin: 0.7rem auto;
        width: 93%;
        padding-bottom: 0.5rem;
      }

      .register-button {
        .login-button {
          width: 87vw;
        }
      }
    }
  }
}

@media (min-width: 321px) {
  .container {
    height: 75vh;
    background-color: $container-background;
    text-align: center;

    .first-column {
      #form {
        text-align: center;

        .header {
          padding-top: 4rem;
          font-weight: 700;
        }

        .error-message {
          color: red;
          font-size: 0.8rem;
          margin-top: 0.6rem;
        }

        .email,
        .password {
          input {
            margin-top: 1rem;
            width: 80%;
            padding: 0.6rem 0.5rem;
          }
        }

        .login-button {
          width: 87vw;
          margin: 0.7rem auto;
        }
      }
    }

    .second-column {
      .create-header {
        padding: 2.2rem 0 0.3rem;
        font-weight: 700;
      }

      .registration-text {
        font-size: 0.9rem;
        margin: 0 auto;
        width: 93%;
        padding-bottom: 0.5rem;
        margin-bottom: 0.7rem;
      }

      .register-button {
        .login-button {
          width: 87vw;
        }
      }
    }
  }
}

@media (min-width: 600px) {
  .container {
    .first-column {
      #form {
        .error-message {
          font-size: 0.8rem;
        }

        .email,
        .password {
          width: 70%;
          margin: auto auto;
        }

        .login-button {
          width: 15rem;
        }
      }
    }

    .second-column {
      .register-button {
        .login-button {
          width: 15rem;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .container {
    display: flex;
    justify-content: space-evenly;
    box-sizing: border-box;

    .first-column {
      margin-top: 5rem;

      #form {
        .header {
          padding-top: 0;
        }

        .email,
        .password {
          margin: auto 0;
          width: 20rem;

          input {
            padding: 0.7rem 0.8rem;
          }
        }

        .login-button {
          width: 18rem;
        }
      }
    }

    .second-column {
      margin-top: 5rem;

      .create-header {
        padding-top: 0;
      }

      .register-button {
        .login-button {
          width: 18rem;
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  .container {
    .first-column {
      #form {
        .header {
          font-size: 1.1rem;
        }

        .email,
        .password {
          input {
            width: 20rem;
            font-size: 0.9rem;
          }
        }

        .login-button {
          width: 22rem;
          font-size: 0.9rem;
        }
      }
    }

    .second-column {
      .create-header {
        font-size: 1.1rem;
      }

      .registration-text {
        font-size: 1rem;
      }

      .register-button {
        .login-button {
          width: 22rem;
          font-size: 0.9rem;
        }
      }
    }
  }
}

@media (min-width: 1280px) {
  .container {
    .first-column {
      #form {
        .email {
          margin-bottom: 0.7em;
        }
      }
    }
  }
}

@media (min-width: 1440px) {
  .container {
    .first-column {
      #form {
        .header {
          font-size: 1.2rem;
        }

        .email,
        .password {
          input {
            font-size: 1rem;
          }
        }

        .login-button {
          font-size: 1rem;
        }
      }
    }

    .second-column {
      .create-header {
        font-size: 1.2rem;
      }

      .registration-text {
        font-size: 1.1rem;
      }

      .register-button {
        .login-button {
          font-size: 1rem;
        }
      }
    }
  }
}

@media (min-width: 1920px) {
  .container {
    .first-column {
      #form {
        .header {
          font-size: 1.7rem;
        }

        .email,
        .password {
          input {
            font-size: 1.5rem;
            width: 21rem;
          }
        }

        .login-button {
          font-size: 1.5rem;
          width: 23rem;
        }
      }
    }

    .second-column {
      .create-header {
        font-size: 1.7rem;
      }

      .registration-text {
        font-size: 1.6rem;
      }

      .register-button {
        .login-button {
          font-size: 1.5rem;
          width: 23rem;
        }
      }
    }
  }
}
</style>