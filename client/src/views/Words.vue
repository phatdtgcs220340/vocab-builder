<template>
  <div class="relative h-screen overflow-x-auto shadow-md sm:rounded-lg flex flex-col items-center mt-10">
    <table class="w-2/3 text-sm text-left rtl:text-right">
      <thead class="text-xs text-white uppercase bg-gray-50 dark:bg-gray-800">
      <tr>
        <th scope="col" class="px-6 py-3 border-r-2 border-gray-200">
          English
        </th>
        <th scope="col" class="px-6 py-3 border-r-2 border-gray-200">
          German
        </th>
        <th scope="col" class="px-6 py-3 border-r-2 border-gray-200">

        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="word in words" :key="word.id" class="bg-white border-b border-gray-700 text-gray-900 font-semibold">
        <td class="px-6 py-4">
          {{ word.english }}
        </td>
        <td class="px-6 py-4">
          {{ word.german }}
        </td>
        <td class="px-6 py-4 flex gap-1 justify-between">
          <div class="py-2 border-r-2 border-gray-700 w-full hover:bg-gray-200">
            <router-link :to="{ name : 'show', params : { id : word._id } }">
              <div class="text-center cursor-pointer">
                Show
              </div>
            </router-link>
          </div>
          <div class="w-full">
            <router-link :to="{ name : 'edit', params : { id : word._id } }">
              <div class="py-2 border-r-2 border-gray-700 text-center cursor-pointer hover:bg-gray-200">Edit</div>
            </router-link>
          </div>
          <div @click="attemptedDeleteWord = word._id" class="py-2 w-full text-center cursor-pointer hover:bg-red-100 hover:text-red-400">Delete</div>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="w-full flex justify-center mt-5">
      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button :disabled="currentPage === 1" @click="currentPage = currentPage - 1" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span class="sr-only">Previous</span>
          <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
          </svg>
        </button>
        <div aria-current="page" class="relative z-10 inline-flex items-center bg-gray-800 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
          {{ currentPage }}</div>
        <button :disabled="currentPage === totalPages" @click="currentPage = currentPage + 1" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span class="sr-only">Next</span>
          <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
    <div v-if="attemptedDeleteWord">
      <div class="h-screen inset-0 bg-gray-700 fixed opacity-40">
      </div>
      <div class="h-screen inset-0 fixed flex justify-center items-center">
        <div class="w-1/5 border-2 rounded-md shadow-md border-gray-500 h-1/3 bg-white flex items-center justify-center">
          <div class="w-full flex flex-col items-center gap-5">
            <svg width="150px" height="150px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#ff0000" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ff5c5c" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm48-176a48 48 0 1 1-96 0 48 48 0 0 1 96 0zm-48-464a32 32 0 0 1 32 32v288a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"></path></g></svg>
            <div class="font-medium text-lg">Are you sure to delete this word?</div>
            <div class="flex justify-evenly w-full">
              <div @click="deleteWord" class="px-8 py-2 border-2 border-gray-700 rounded-md font-medium bg-white hover:bg-gray-700 hover:text-white cursor-pointer">Yes</div>
              <div @click="attemptedDeleteWord = ''" class="px-8 py-2 border-2 border-gray-700 rounded-md font-medium bg-white hover:bg-gray-700 hover:text-white cursor-pointer">No</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import {api} from "@/helpers/helpers";

  export default {
    name: "WordsComponent",
    components: {

    },
    data() {
      return {
        words: [],
        currentPage : 0,
        totalPages: 0,
        attemptedDeleteWord: ''
      }
    },
    watch: {
      async currentPage(newVal) {
        const fetchedWords = await api.findAllWords(window.localStorage.getItem("vocab-access-token"), newVal)
        this.words = fetchedWords.data
      }
    },
    async mounted() {
      const fetchedWords = await api.findAllWords(window.localStorage.getItem("vocab-access-token"), 1)
      this.words = fetchedWords.data
      this.currentPage = fetchedWords.currentPage
      this.totalPages = fetchedWords.totalPages
    },
    methods : {
      async deleteWord() {
        await api.deletedWord(window.localStorage.getItem("vocab-access-token"), this.attemptedDeleteWord)
        const fetchedWords = await api.findAllWords(window.localStorage.getItem("vocab-access-token"), 1)
        this.words = fetchedWords.data
        this.currentPage = fetchedWords.currentPage
        this.totalPages = fetchedWords.totalPages
        this.attemptedDeleteWord = ''
      }
    }
  }
</script>
<style scoped>

</style>