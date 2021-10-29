<template>
  <div class="pets">
    <h1>Pets</h1>
    <div>{{ this.pets }}</div>
    <div>{{ this.authStore }}</div>
  </div>
</template>

<script lang="ts">
import { getPets } from "@/api/routes";
import { Options, Vue } from "vue-class-component";
import { AuthStore } from "../stores"; // TODO: dont need to import all stores
@Options({
  data: () => ({
    pets: [],
    processing: false,
    error: "",
    authStore: AuthStore.state,
  }),
  methods: {
    getData: async function () {
      this.processing = true;
      try {
        this.pets = await getPets();
      } catch (error: any) {
        this.error = error.response?.data || error.message;
      } finally {
        this.processing = false;
      }
    },
  },
  created() {
    this.getData();

    setTimeout(() => {
      AuthStore.setState({ firstName: "Zach" });
    }, 5000);
  },
})
export default class Pets extends Vue {
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
