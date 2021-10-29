<template>
  <div class="register">
    <h1>Login</h1>
    <div>
      <div class="inputs">
        <div>E-mail: <input type="text" v-model="email" /></div>
        <div>Password: <input type="text" v-model="password" /></div>
      </div>
      <div class="error">
        <p>{{ error }}</p>
      </div>
      <div>
        <button @click="login" v-bind:disabled="processing || !isValid">
          Login
        </button>
      </div>
      <div>Am I logged in? {{ authenticated }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { login } from "../../api/routes";
@Options({
  computed: {
    isValid: function () {
      return (
        this.email &&
        this.email.length > 4 &&
        this.password &&
        this.password.length >= 8
      );
    },
  },
  data: () => ({
    authenticated: false,
    email: null,
    password: null,
    processing: false,
    error: "",
  }),
  methods: {
    login: async function () {
      this.error = "";
      this.processing = true;
      try {
        const response = await login(this.email, this.password);
        localStorage.token = response.token;
        console.log(`set local storage token: ${response.token}`);
        this.error = JSON.stringify(response);
      } catch (error) {
        this.error =
          (error as any).response?.data?.message ||
          (error as any).response?.data ||
          (error as any).message;
        setTimeout(() => {
          this.error = "";
        }, 2000);
      } finally {
        this.processing = false;
      }
    },
  },
})
export default class Register extends Vue {
  msg!: string;
}
</script>

<style scoped lang="stylus">
.inputs
   display flex
   flex-direction column
   justify-content center
   align-items center

.inputs > div
   display flex
   justify-content space-between
   width 300px

.inputs > div > input
   min-width: 0px

.error > p
  color red
</style>
