<template>
  <div>
    <word-form :german="german" :english="english" @createOrUpdate="submit"></word-form>
  </div>
</template>

<script>
import WordForm from "@/components/WordForm.vue";
import {api} from "@/helpers/helpers";

export default {
  name: "EditComponent",
  components: {
    WordForm
  },
  data() {
    return {
      german: '',
      english: ''
    }
  },
  async mounted() {
    const { german, english } = await api.findWordById(
        window.localStorage.getItem("vocab-access-token"),
        this.$route.params.id
    );
    this.german = german;
    this.english = english;
  },
  methods : {
    async submit(form) {
      const response = await api.updateWord(
          window.localStorage.getItem("vocab-access-token"),
          this.$route.params.id,
          form
      )
    }
  }
}
</script>
<style scoped>

</style>