<template>
  <div id="app">
    <Navigation />
    <router-view />
    <Footer />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";

export default defineComponent({
  components: {
    Navigation,
    Footer,
  },
});
</script>


<style lang="scss">
body {
  margin: 0;
}
</style>
