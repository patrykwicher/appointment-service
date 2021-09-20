<template>
  <div class="container">
    <div class="first-column">
      <form @submit.prevent id="form">
        <div class="header">LOG IN TO YOUR ACCOUNT</div>
        <div class="email">
          <input type="email" name="" id="" placeholder="E-mail address" v-model="userData.username" />
        </div>
        <div class="password">
          <input type="password" name="" id="" placeholder="Password" v-model="userData.password" />
        </div>
        <div class="login-button">
          <LoginButton text="LOGIN" @click="loginUser" />
        </div>
        <button @click="logout">logout</button>
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
import { defineComponent, ref } from "@vue/runtime-core";
import LoginButton from "../components/LoginButton.vue";

export default defineComponent({
  setup() {
    const userData = ref({
      username: '',
      password: ''
    })

    const loginUser = async () => {
      try {
        const userInfos = await fetch('http://localhost:3000/clients/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: 'patryk@op.pl', password: '12345' })
        });

        const user = await userInfos.json();
        console.log(user);
      } catch(err) {
        console.log(err.message);
      }
    }

    const logout = async () => {
      try {
        const logout = await fetch('http://localhost:3000/clients/logout');
        const log = await logout.json();
        console.log(logout, log);
      } catch(e) {
        console.log(e);
      }
    }
  
    return {
      userData,
      loginUser,
      logout,
    }
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
    height: 90vh;
    background-color: $container-background;
    text-align: center;

    .first-column {
      #form {
        text-align: center;

        .header {
          padding-top: 4rem;
          font-weight: 700;
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
        padding: 2.2rem 0 1rem;
        font-weight: 700;
      }

      .registration-text {
        font-size: 0.9rem;
        margin: 0.7rem auto;
        width: 93%;
        padding-bottom: 0.5rem;
      }

      .register-button {
        width: 87vw;
      }
    }
  }
}

@media (min-width: 321px) {
  .container {
    height: 90vh;
    background-color: $container-background;
    text-align: center;

    .first-column {
      #form {
        text-align: center;

        .header {
          padding-top: 4rem;
          font-weight: 700;
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
        padding: 2.2rem 0 1rem;
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
        width: 87vw;
      }
    }
  }
}

@media (min-width: 600px) {
  .container {
    .first-column {
      #form {
        .email,
        .password {
          width: 70%;
          margin: auto auto;
        }

        .login-button {
          width: 30vw;
        }
      }
    }

    .second-column {
      .login-button {
        width: 30vw;
      }
    }
  }
}

@media (min-width: 768px) {
  .container {
    display: flex;
    justify-content: space-evenly;

    .first-column {
      margin-top: 5rem;

      #form {
        .header {
          padding-top: 0;
        }

        .email,
        .password {
          margin: auto 0;
          width: 40vw;

          input {
            padding: 0.7rem 0.8rem;
          }
        }

        .login-button {
            width: 20vw;
        }
      }
    }

    .second-column {
      margin-top: 5rem;

      .create-header {
        padding-top: 0;
      }

      .login-button {
          width: 20vw;
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
                    width: 15vw;
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

            .login-button {
                width: 15vw;
                font-size: 0.9rem;
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
</style>