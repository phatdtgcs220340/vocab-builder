<template>
  <div class="flex flex-col gap-5 mt-5">
    <div class="flex justify-between gap-20" v-for="(word, index) in words" :key="index">
      <div>
      {{ word.english }}
      </div>
      <div>
        <input v-model="answerList[index]" class="border border-gray-300 focus:outline-none px-2 py-1 rounded-sm" placeholder="Enter german word...">
      </div>
    </div>
    <div v-if="submitted" class="font-medium text-red-500">Score: {{ score }} out of 10</div>
    <button @click="submit" class="px-8 py-2 bg-white border-2 rounded-sm border-gray-700 font-medium hover:bg-gray-700 hover:text-white">Submit</button>
    <button v-if="submitted" @click="startOver" class="px-8 py-2 bg-white border-2 rounded-sm border-gray-700 font-medium hover:bg-gray-700 hover:text-white">Start over</button>
  </div>
</template>

<script>
export default {
  name: "VocabTest",
  props : {
    words : {
      type : Array,
      required : true
    }
  },
  data() {
    return {
      score : 0,
      submitted : false,
      answerList : []
    }
  },
  components: {

  },
  methods : {
    submit() {
      this.score = 0
      this.submitted = true
      for (let i = 0; i < this.answerList.length; i++) {
        if (this.answerList[i] === this.words[i].german) {
          ++this.score;
        }
      }
    },
    startOver() {
      this.submitted = false;
      this.score = 0;
      this.answerList = []
    }
  }
}
</script>

<style scoped>

</style>