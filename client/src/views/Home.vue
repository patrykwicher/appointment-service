<template>
  <div class="container">
    <div class="first-column">
      <div class="header">
        <h3>SERVICES</h3>
      </div>
      <div class="service-select-container">
        <p class="categories" @click="openCategoryBar">
          {{ selectedServices }}
          <img src="../assets/images/arrow.png" alt="arrow" id="arrow-img" />
        </p>
        <ul id="categories-list">
          <li class="category" @click="getCategory">All</li>
          <li class="category" @click="getCategory">Hairdressing</li>
          <li class="category" @click="getCategory">Cosmetology</li>
        </ul>
      </div>
    </div>
    <div class="second-column">
      <div class="selected-category">
        <h4>{{ selectedServices }}</h4>
      </div>
      <div class="search-bar">
        <input
          type="text"
          name=""
          class="search"
          placeholder="Find a service"
          v-model="searchInput"
        />
      </div>
      <div>
        <div class="services-container" v-for="(service, index) in searchedNameOfService" :key="index">
          <div class="service" v-if="selectedServices === 'All'">
            <div class="service-name">
              {{ searchedNameOfService[index].name }}
            </div>
            <div class="service-price">{{ searchedNameOfService[index].price }} zł</div>
            <div class="checkbox">
              <input
                type="checkbox"
                name=""
                id=""
                v-model="checkedServices"
                :value="service"
              />
            </div>
          </div>
          <div class="service" v-if="selectedServices === searchedNameOfService[index].type">
            <div class="service-name">
              {{ searchedNameOfService[index].name }}
            </div>
            <div class="service-price">{{ searchedNameOfService[index].price }} zł</div>
            <div class="checkbox">
              <input
                type="checkbox"
                name=""
                id=""
                v-model="checkedServices"
                :value="service"
              />
            </div>
          </div>
        </div>  
      </div>
      <div
        class="button"
        v-if="checkedServices.length && checkIfCurrentUserObjectExists"
      >
        <router-link to="/chosen-services" class="route-button">
          <LoginButton text="NEXT" @click="declareChosenServices" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Service from "../types/Service";
import LoginButton from "../components/LoginButton.vue";
import createStore from "../store/index";

export default defineComponent({
  name: "Home",
  setup() {
    const arrayOfServices = ref([
      {
        name: "Beard Shaving",
        type: "Hairdressing",
        price: 150,
        employee: "",
        date: new Date(),
        hourOfAppointment: "",
      },
      {
        name: "Permanent Makeup",
        type: "Cosmetology",
        price: 300,
        employee: "",
        date: new Date(),
        hourOfAppointment: "",
      },
      {
        name: "Baleyage",
        type: "Hairdressing",
        price: 420,
        employee: "",
        date: new Date(),
        hourOfAppointment: "",
      },
      {
        name: "Waxing",
        type: "Cosmetology",
        price: 69,
        employee: "",
        date: new Date(),
        hourOfAppointment: "",
      },
    ]);

    const selectedServices = ref<string>("All");
    const checkedServices = ref<Service[]>([]);
    const searchInput = ref<string>("");

    const searchedNameOfService = computed(() => {
      return arrayOfServices.value.filter((service) => {
        return service.name.toLowerCase().includes(searchInput.value.toLowerCase());
      });
    });

    const openCategoryBar = () => {
      const arrowIcon = document.getElementById("arrow-img")!;
      const categoriesList = document.getElementById("categories-list")!;

      if (categoriesList.style.display === "none") {
        categoriesList.style.display = "block";
        arrowIcon.style.transform = "rotate(180deg)";
      } else {
        categoriesList.style.display = "none";
        arrowIcon.style.transform = "rotate(0deg)";
      }
    };

    const getCategory = (event: { target: Element }) => {
      const categoriesList = document.getElementById("categories-list")!;

      selectedServices.value = event.target.textContent!;
      categoriesList.style.display = "none";
    };

    const declareChosenServices = () => {
      createStore.commit("declareChosenServices", checkedServices);
    };

    const checkIfCurrentUserObjectExists = computed(() => {
      return createStore.state.checkIfCurrentUserObjectExists;
    });

    return {
      arrayOfServices,
      selectedServices,
      openCategoryBar,
      getCategory,
      checkedServices,
      declareChosenServices,
      checkIfCurrentUserObjectExists,
      searchInput,
      searchedNameOfService,
    };
  },
  components: {
    LoginButton,
  },
});
</script>

<style lang="scss" scoped>
$select-bg-color: #e6e6e6;

@media (max-width: 320px) {
  .container {
    margin: 0 1rem;
    box-sizing: border-box;

    .first-column {
      .header {
        h3 {
          font-weight: 400;
          font-size: 1.6rem;
        }
      }

      .service-select-container {
        .categories {
          background-color: $select-bg-color;
          border: none;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 0.7rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          margin: 0;

          img {
            width: 1rem;
            transition: ease-in 0.15s;
          }
        }

        #categories-list {
          list-style: none;
          padding-left: 1rem;
          border: 1px solid $select-bg-color;
          border-top: none;
          display: none;
          margin: 0;

          .category {
            padding: 0.5rem 0;
            transition: ease-in 0.5s;
            cursor: pointer;

            &:hover {
              background-color: $select-bg-color;
              font-weight: 700;
            }
          }
        }
      }
    }

    .second-column {
      margin-bottom: 2rem;

      .selected-category {
        h4 {
          font-size: 1.3rem;
          margin-bottom: 0;
        }
      }

      .search-bar {
        margin: 0.8rem 0;

        input {
          box-sizing: border-box;
          border-radius: 50px;
          padding: 0.4rem 0.7rem;
          font-size: 1rem;
          border: 1px solid #ddd;
          outline: none;
          width: 100%;
        }
      }

      .services-container {
        .service {
          padding: 0.8rem 1rem;
          border: 1px solid rgb(197, 197, 197);
          border-left: none;
          border-right: none;
          border-bottom: none;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .service-name {
            width: 50%;
          }

          .service-price {
            font-weight: 400;
            font-size: 1rem;
          }
        }
      }

      .button {
        .login-button {
          width: 100%;
          margin-top: 1.5rem;
        }
      }
    }
  }
}

@media (min-width: 321px) {
  .container {
    margin: 0 1rem;
    box-sizing: border-box;

    .first-column {
      .header {
        h3 {
          font-weight: 400;
          font-size: 1.6rem;
        }
      }

      .service-select-container {
        .categories {
          background-color: $select-bg-color;
          border: none;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 0.7rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          margin: 0;

          img {
            width: 1rem;
            transition: ease-in 0.15s;
          }
        }

        #categories-list {
          list-style: none;
          padding-left: 1rem;
          border: 1px solid $select-bg-color;
          border-top: none;
          display: none;
          margin: 0;

          .category {
            padding: 0.5rem 0;
            cursor: pointer;
          }
        }
      }
    }

    .second-column {
      margin-bottom: 2rem;

      .selected-category {
        h4 {
          font-size: 1.3rem;
          margin-bottom: 0;
        }
      }

      .search-bar {
        margin: 0.8rem 0;

        input {
          box-sizing: border-box;
          border-radius: 50px;
          padding: 0.4rem 0.7rem;
          font-size: 1rem;
          border: 1px solid #ddd;
          outline: none;
          width: 100%;
        }
      }

      .services-container {
        .service {
          padding: 0.8rem 1rem;
          border: 1px solid rgb(197, 197, 197);
          border-left: none;
          border-right: none;
          border-bottom: none;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .service-name {
            width: 50%;
          }

          .service-price {
            font-weight: 400;
            font-size: 1rem;
          }
        }
      }

      .button {
        .login-button {
          width: 100%;
          margin-top: 1.5rem;
        }
      }
    }
  }
}

@media (min-width: 600px) {
  .container {
    margin: 0 3rem;

    .second-column {
      .button {
        text-align: center;

        .login-button {
          width: 30%;
          font-size: 1rem;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .container {
    min-height: 60vh;

    .first-column {
      .service-select-container {
        font-size: 1.1rem;
        
        .categories {
          font-size: 1.1rem;
        }
      }
    }

    .second-column {
      .search-bar {
        text-align: right;

        input {
          width: 30%;
        }
      }

      .services-container {
        .service {
          .service-name {
            width: 85%;
            font-size: 1rem;
            padding: 0.5rem 0;
          }

          .service-price {
            font-size: 1.1rem;
          }
        }
      }
    }
  }
}

@media (min-width: 992px) {
  .container {
    min-height: 70vh;
    display: flex;

    .first-column {
      width: 20%;

      .header {
        h3 {
          font-size: 1.5rem;
        }
      }

      .service-select-container {
        #categories-list {
          display: block;
        }
      }
    }

    .second-column {
      width: 80%;
      margin-left: 2rem;
    }
  }
}

@media (min-width: 1280px) {
  .container {
    margin: 0 7vw;

    .second-column {
      .search-bar {
        input {
          width: 23%;
        }
      }

      .services-container {
        .service {
          .service-name {
            font-size: 0.9rem;
          }

          .service-price {
           font-size: 1rem;
          }
        }
      }
    }
  }
}

@media (min-width: 1920px) {
  .container {
    .first-column {
      .header {
        h3 {
          font-size: 2.5rem;
        }
      }

      .service-select-container {
        .categories {
          font-size: 1.6rem;
        }

        #categories-list {
          font-size: 1.4rem;
        }
      }
    }

    .second-column {
      .selected-category {
        h4 {
          font-size: 2.1rem;
        }
      }

      .search-bar {
        input {
          width: 30%;
          font-size: 1.5rem;
        }
      }

      .services-container {
        .service {
          .service-name {
            font-size: 1.4rem;
          }

          .service-price {
            font-size: 1.4rem;
          }

          .checkbox {
            input {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }

    .button {
          font-size: 1.7rem;
      text-align: center;

      .route-button {
        .login-button {
          width: 30%;
          font-size: 1.5rem;
        }
      }
    }
  }
}
</style>