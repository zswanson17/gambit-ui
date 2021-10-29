<template>
  <div class="register">
    <h1>Register</h1>
    <p>Fill out the information below to register as a new user.</p>
    <div>
      <div class="inputs">
        <div>
          <span>First Name:</span><input type="text" v-model="firstName" />
        </div>
        <div>Last Name: <input type="text" v-model="lastName" /></div>
        <div>E-mail: <input type="text" v-model="email" /></div>
        <div>Password: <input type="text" v-model="password" /></div>
        <div>
          Verify Password: <input type="text" v-model="confirmedPassword" />
        </div>
      </div>
      <div class="error">
        <p>{{ error }}</p>
      </div>
      <div>
        <button @click="register" v-bind:disabled="processing">Register</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { register } from "../../api/routes";
@Options({
  props: {
    msg: String,
  },
  data: () => ({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmedPassword: null,
    processing: false,
    error: "",
  }),
  methods: {
    register: async function () {
      this.error = "";
      this.processing = true;
      try {
        const { confirmedPassword, processing, error, ...registerData } =
          this.$data;
        const response = await register(registerData);
        this.error = JSON.stringify(response.data);
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983

.inputs
   display flex
   flex-direction column
   justify-content center
   align-items center

.inputs > div
   display flex
   justify-content space-between
   width 300px
   padding-top 5px
   align-items center

.inputs > div > input
   min-width: 0px

.error > p
  color red
</style>
