<template>
  <div class="flex flex-col items-center">
    <div class="text-4xl mt-12">
      Test
    </div>
    <vocab-test v-if="!deniedTest" :words="words"/>
    <div class="mt-5" v-else>You must have minimum 5 words to start test</div>
  </div>
</template>

<script>
import VocabTest from "@/components/VocabTest.vue";
import {api} from "@/helpers/helpers";
import words from "@/views/Words.vue";

export default {
  name: "TestComponent",
  components: {
    VocabTest
  },
  data() {
    return {
      words : [],
      deniedTest: false,
    }
  },
  async mounted() {
    const fetchedWords =  await api.findAllWords(window.localStorage.getItem("vocab-access-token"), 1, 5)
    this.words = fetchedWords.data
    if (this.words.length < 5) {
      this.deniedTest = true
    }
  }
}
</script>
<style scoped>

</style>