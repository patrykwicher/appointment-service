<template>
  <div class="container">
    <div class="no-user" v-if="!userVisits[0]">
      <h2>{{ user.fullName }}</h2>
      <p>No visits</p>
    </div>
    <div class="user" v-else>
      <div class="user-name">
        <h2>
          {{ userVisits[0].userName }}
        </h2>
      </div>
      <div class="visit-card" v-for="(visit, index) in userVisits" :key="index">
        <div class="date-hour-container">
          <div class="date-hour-header">Date and Hour:</div>
          <div class="date-hour">
            <div class="date">
              {{ visit.dateOfAppointment.split("T")[0] }}
            </div>
            <div class="hour">
              {{ visit.hourOfAppointment }}
            </div>
          </div>
        </div>
        <div class="chosen-service-container">
          <div class="chosen-service-header">Chosen Services:</div>
          <div class="service">
            {{ visit.serviceName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount } from "vue";
import createStore from "../store/index";

export default defineComponent({
  setup() {
    // const getUserVisits = () => {
    //   createStore.dispatch("fetchSavedUserServices");
    // };

    const userVisits = computed(() => {
      return createStore.state.fetchedUserVisits;
    });

    const user = computed(() => {
      return createStore.state.currentUser;
    })

    onBeforeMount(() => {
      // getUserVisits();
    });

    return {
      userVisits,
      user
    };
  },
});
</script>

<style lang="scss" scoped>
$background-border-color: #f2f2f2;
$headers-color: #4e4e4e;

@media (max-width: 320px) {
  .container {
    min-height: 50vh;
    margin-bottom: 2rem;

    .no-user {
      text-align: center;
      margin-top: 1rem;
    }

    .user {
      .user-name {
        text-align: center;
      }

      .visit-card {
        margin: 1rem 1rem;
        box-shadow: 0px 3px 9px -3px rgba(0, 0, 0, 0.3);

        .date-hour-container {
          background-color: $background-border-color;
          font-size: 0.9rem;
          padding: 1rem 1rem;

          .date-hour-header {
            color: $headers-color;
            font-style: italic;
          }

          .date-hour {
            display: flex;
            justify-content: space-between;
            font-weight: 700;
          }
        }

        .chosen-service-container {
          font-size: 0.9rem;
          padding: 1rem 1rem;
          border-left: 1px solid $background-border-color;
          border-right: 1px solid $background-border-color;
          border-bottom: 1px solid $background-border-color;

          .chosen-service-header {
            color: $headers-color;
            font-style: italic;
          }

          .service {
            font-weight: 700;
          }
        }
      }
    }
  }
}

@media (min-width: 321px) {
  .container {
    min-height: 30vh;
    margin-bottom: 2rem;

    .no-user {
      text-align: center;
      margin-top: 1rem;
    }

    .user {
      .user-name {
        text-align: center;
      }

      .visit-card {
        margin: 1rem 1rem;
        box-shadow: 0px 3px 9px -1px rgba(0, 0, 0, 0.3);

        .date-hour-container {
          background-color: $background-border-color;
          font-size: 0.9rem;
          padding: 1rem 1rem;

          .date-hour-header {
            color: $headers-color;
            font-style: italic;
          }

          .date-hour {
            display: flex;
            justify-content: space-between;
            font-weight: 700;
          }
        }

        .chosen-service-container {
          font-size: 0.9rem;
          padding: 1rem 1rem;
          border-left: 1px solid $background-border-color;
          border-right: 1px solid $background-border-color;
          border-bottom: 1px solid $background-border-color;

          .chosen-service-header {
            color: $headers-color;
            font-style: italic;
          }

          .service {
            font-weight: 700;
          }
        }
      }
    }
  }
}

@media (min-width: 375px) {
  .container{ 
    min-height: 37vh;

    .no-user {

    }

    .user {
      
      .visit-card {
        margin: 2rem 2rem;
        
        .date-hour-container {
          font-size: 0.95rem;
        }

        .chosen-service-container {
          font-size: 0.95rem;
        }
      }
    }
  }
}

@media (min-width: 768px) { 
  .container {
    min-height: 58vh;

    .no-user {

    }

    .user {
      .user-name{ 
        font-size: 1.3rem;
      }
      .visit-card {
        width: 25rem;
        margin: 3rem auto;

        .date-hour-container {
          font-size: 1rem;
          padding: 1.5rem;
        }

        .chosen-service-container {
          font-size: 1rem;
          padding: 1.5rem;
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  .container {
    min-height: 67vh;
  }
}

@media (min-width: 1280px) {
  .container {
    padding: 0 5rem;
    .no-user {

    }

    .user {
      display: grid;
      grid-template-columns: 1fr 1fr;

      .user-name {
        grid-column-start: 1;
        grid-column-end: 3;
      }

      .visit-card {
        width: 30rem;
        margin: 2rem auto;
        box-shadow: 0px 3px 9px 1px rgba(0, 0, 0, 0.3);


        .date-hour-container, .chosen-service-container {
          font-size: 1.1rem;
          padding: 1.8rem;
        }
      }
    }
  }
}
</style> 