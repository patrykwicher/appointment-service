<template>
  <div class="container">
    <div class="header">CREATE AN ACCOUNT</div>
    <form @submit.prevent>
      <div class="full-name">
        <input
          type="text"
          name=""
          id=""
          placeholder="Name & Surname"
          v-model="userData.fullName"
          required
        />
      </div>
      <div class="email">
        <input
          type="email"
          name=""
          id=""
          placeholder="E-mail address"
          v-model="userData.email"
          required
        />
      </div>
      <div class="password">
        <input type="password" name="" id="" placeholder="Password" v-model="userData.password" required />
      </div>
      <div class="phone-number">
        <input
          type="tel"
          name=""
          id=""
          pattern="[0-9]{9}"
          placeholder="Phone Number"
          v-model="userData.phoneNumber"
          required
        />
      </div>
      <div class="button-container">
        <LoginButton text="REGISTER" class="register-button" @click="registerUser"/>
      </div>
    </form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "@vue/runtime-core";
import LoginButton from "../components/LoginButton.vue";
import User from '../types/User';
import router from '../router/index';

export default defineComponent({
  setup() {
    const userData = ref<User>({
      fullName: '',
      email: '',
      password: '',
      phoneNumber: 0
    })

    const registerUser = async () => {
      try {
        let newUser = await fetch('http://localhost:3000/clients/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData.value)
        });
      } catch(err) {
        console.log(err.message);
      }
    }

    return {
      userData,
      registerUser,
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
    background-color: $container-background;
    text-align: center;
    padding: 4rem 0;

    .header {
      font-weight: 700;
    }

    .full-name,
    .email,
    .password,
    .phone-number {
      input {
        margin-top: 1.5rem;
        width: 80%;
        padding: 0.5rem 0.5rem;
      }
    }

    .button-container {
      width: 100%;
      margin-top: 1.8rem;
      box-sizing: border-box;

      .register-button {
        width: 86%;
      }
    }
  }
}

@media (min-width: 321px) {
  .container {
    background-color: $container-background;
    text-align: center;
    padding: 4rem 0;

    .header {
      font-weight: 700;
    }

    .full-name,
    .email,
    .password,
    .phone-number {
      input {
        margin-top: 1.5rem;
        width: 80%;
        padding: 0.5rem 0.5rem;
      }
    }

    .button-container {
      width: 100%;
      margin-top: 1.8rem;

      .login-button {
        width: 87%;
      }
    }
  }
}

@media (min-width: 600px) {
  .container {
    .full-name,
    .email,
    .password,
    .phone-number {
      margin: auto auto;
      width: 100%;
      input {
        width: 50%;
      }
    }

    .button-container {
      .register-button {
        width: 30%;
      }
    }
  }
}

@media (min-width: 768px) {
  .container {
    min-height: 50vh;

    .full-name,
    .email,
    .password,
    .phone-number {
      width: 100%;

      input {
        padding: 0.7rem 0.7rem;
      }
    }

    .button-container {
      .register-button {
        width: 25%;
      }
    }
  }
}

@media (min-width: 900px) {
  .container {
    .full-name,
    .email,
    .password,
    .phone-number {
      width: 100%;

      input {
        width: 40%;
      }
    }

    .button-container {
      .register-button {
        width: 20%;
      }
    }
  }
}

@media (min-width: 1024px) {
  .container {
    min-height: 61vh;

    .full-name,
    .email,
    .password,
    .phone-number {
      width: 100%;

      input {
        width: 35%;
      }
    }

    .button-container {
      .register-button {
        width: 20%;
      }
    }
  }
}

@media (min-width: 1280px) {
  .container {
    .button-container {
      .register-button {
        width: 15%;
      }
    }
  }
}

@media (min-width: 1440px) {
  .container {
    .button-container {
      .register-button {
        width: 15%;
      }
    }
  }
}

@media (min-width: 1920px) {
  .container {
    .header {
      font-size: 1.7rem;
    }

    .full-name,
    .email,
    .password,
    .phone-number {
      width: 85%;
      
      input {
        font-size: 1.5rem;
      }
    }

    .button-container {
      .register-button {
        font-size: 1.5rem;
      }
    }
  }
}
</style>