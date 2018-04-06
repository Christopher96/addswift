<template>
  <div class="input-group">
    <transition v-on:leave="leave" name="fade" mode="out-in">
      <ErrorAlert v-if="showerror" :errorMessage="errorMessage" />
    </transition>
    <span :class="'inputicon fa fa-'+icon"></span>
    <input ref="input" @input="update" :name="name" :type="type" :placeholder="placeholder" required />
  </div>
</template>

<script>
  import ErrorAlert from "components/ErrorAlert.vue";

  export default {
    mounted() {
      const vm = this;
      console.log(vm.$refs.input.value);
    },
    data() {
      return {
        count: 0,
        showerror: false,
        errorMessage: "",
      }
    },
    props: [
      "error",
      "icon",
      "name",
      "type",
      "placeholder"
    ],
    components: {
			ErrorAlert
    },
    methods: {
      update(event) {

        this.$emit("update", event.target.value);
      },
      leave() {
        if(this.error != ""){
          this.errorMessage = this.error;
          this.showerror = true;
        }
      }
    },
    watch: {
      error(val, oldval) {
        if(val != oldval){
          if(oldval != ""){
            this.showerror = false;
          } else {
            this.errorMessage = this.error;
            this.showerror = true;
          }
        } else {
          this.showerror = false;
        }
      }
    }
  }
</script>
