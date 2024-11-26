<template>
  <div>
    <word-form @createOrUpdate="submit"></word-form>
  </div>
</template>

<script>
  import WordForm from "@/components/WordForm.vue";
  import {api} from "@/helpers/helpers";

  export default {
    name: "NewComponent",
    components: {
      WordForm
    },
    methods: {
      async submit(form) {
        const response = await api.createWord(window.localStorage.getItem("vocab-access-token"), form)
      }
    }
  }

</script>

<style scoped>

</style>