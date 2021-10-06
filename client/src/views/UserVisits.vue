<template>
  <div class="container">
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
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import createStore from "../store/index";

export default defineComponent({
  setup() {
    const getUserVisits = () => {
      createStore.dispatch("fetchSavedUserServices");
    };
    getUserVisits();

    const userVisits = computed(() => {
      return createStore.state.fetchedUserVisits;
    });

    return {
      userVisits,
    };
  },
});
</script>

<style lang="scss" scoped>
$background-border-color: #F2F2F2;
$headers-color: #4e4e4e;

@media (max-width: 320px) {
  .container {
    margin-bottom: 2rem;

    .user-name {
      text-align: center;
    }

    .visit-card {
      margin: 1rem 1rem;
    box-shadow: 0px 3px 9px -3px rgba(0,0,0,0.30);

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
</style>