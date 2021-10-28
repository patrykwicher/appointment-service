<template>
  <div id="app">
    <Navigation />
    <router-view />
    <Footer />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';

export default defineComponent({
  components: {
    Navigation,
    Footer
  },
})
</script>


<style lang="scss">
body {
  margin: 0;
}

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
