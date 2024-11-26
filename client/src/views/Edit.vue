<template>
  <div>
    <word-form :german="german" :english="english" @createOrUpdate="submit"></word-form>
    <div class="fixed inset-0 flex justify-center mt-20 z-50 h-fit">
      <div v-if="messagePopout" class="w-fit py-2 px-5 font-semibold" :class="response.status">
        {{ response.text }}
      </div>
    </div>
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
      english: '',
      response : {
        text : '',
        status : ''
      },
      messagePopout : false
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
      this.response = {}
      const response = await api.updateWord(
          window.localStorage.getItem("vocab-access-token"),
          this.$route.params.id,
          form
      )

      this.messagePopout = true
      if (response.name !== "AxiosError") {
        this.response = {
          text: "✅ Updated Successfully",
          status: "bg-green-400 text-green-700"
        }
      } else {
        this.response = {
          text: "Fail to update",
          status: "bg-red-400 text-red-700"
        }
      }
      setTimeout(() => {
        this.messagePopout = false
      }, 2000)

    }
  }
}
</script>
<style scoped>

</style>