<template>
  <div id="nav">
    <span v-if="authenticated"
      ><router-link to="/">Home</router-link>&nbsp;</span
    >
    <span v-if="authenticated"
      ><router-link to="/pets">Pets</router-link>&nbsp;
    </span>
    <span v-if="!authenticated"
      ><router-link to="/register">Register</router-link>&nbsp;
    </span>
    <span v-if="!authenticated"
      ><router-link to="/login">Login</router-link>&nbsp;</span
    >
  </div>
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { isAuthenticated } from "./utils";
@Options({
  data: () => ({
    authenticated: false,
  }),
  methods: {
    checkAuth: async function () {
      this.authenticated = await isAuthenticated(); // TODO: cache or something
    },
  },
  beforeMount() {
    this.checkAuth();
  },
})
export default class App extends Vue {}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

button
  font-family Avenir, Helvetica, Arial, sans-serif
</style>
