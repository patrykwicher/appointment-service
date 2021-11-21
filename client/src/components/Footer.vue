<template>
  <div class="container" v-if="hideShowFooter">
    <!-- <div class="icons">
            <img src="../assets/images/instagram-bw.png" alt="instagram" />
            <img src="../assets/images/facebook-bw.png" alt="instagram" />
            <img src="../assets/images/pinterest-bw.png" alt="instagram" />
        </div> -->
    <div class="first-column columns">
      <p>Services</p>
      <p>About us</p>
      <p>Team</p>
    </div>
    <div class="second-column columns">
      <p>Opinions</p>
      <p>My account</p>
    </div>
    <div class="third-column columns">
      <p>Rules</p>
    </div>
    <div class="fourth-column columns">
      <div class="first-part">
        <p>Ferryke Dichka</p>
        <p>ul. Klejnot Nilu 6</p>
        <p>12-345 Zimmermann</p>
      </div>
      <div class="second-part">
        <p>zimmermann.explorer@email.com</p>
        <p>+48 123456789</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/runtime-core";
import createStore from '../store/index';

export default defineComponent({
  setup() {
    const hideShowFooter = computed(() => {
      return createStore.state.hideFooterIfNavBurgerIsOpened;
    })

    return {
      hideShowFooter
    }
  }
});
</script>

<style lang="scss" scoped>
$footer-bg-color: #2b2f33;

@media (max-width: 320px) {
  .container {
    background-color: $footer-bg-color;
    text-align: center;
    padding: 2rem 0;
    font-size: 0.75rem;
    color: white;

    p {
      margin: 0.5rem 0;
      cursor: pointer;
    }

    .fourth-column {
      .first-part {
        margin-bottom: 2rem;
      }
    }
  }
}

@media (min-width: 321px) {
  .container {
    background-color: $footer-bg-color;
    text-align: center;
    padding: 2rem 0;
    font-size: 0.75rem;
    color: white;

    p {
      margin: 0.5rem 0;
      cursor: pointer;
    }

    .fourth-column {
      .first-part {
        margin-bottom: 2rem;
      }
    }
  }
}

@media (min-width: 768px) {
  .container {
      display: flex;
      justify-content: space-evenly;
      font-size: 0.8rem;
      padding: 3rem 2rem;
    //   text-align: left;
  }
}

@media (min-width: 1280px) {
    .container {
        padding: 4rem 8rem;
        font-size: 0.85rem;
    }
}

@media (min-width: 1440px) {
  .container {
    font-size: 0.95rem;
  }
}

@media (min-width: 1920px) {
  .container {
    font-size: 1.25rem;
  }
}
</style>