<template>
  <div class="flex flex-col items-center">
    <div class="text-4xl mt-12">
      Test
    </div>
    <vocab-test :words="words"/>
  </div>
</template>

<script>
import VocabTest from "@/components/VocabTest.vue";
import {api} from "@/helpers/helpers";

export default {
  name: "TestComponent",
  components: {
    VocabTest
  },
  data() {
    return {
      words : []
    }
  },
  async mounted() {
    const fetchedWords =  await api.findAllWords(window.localStorage.getItem("vocab-access-token"), 1)
    this.words = fetchedWords.data
  }
}
</script>
<style scoped>

</style>