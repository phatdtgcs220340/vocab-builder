<template>

  <div class="relative h-screen overflow-x-auto shadow-md sm:rounded-lg flex justify-center items-start mt-10">
    <table class="w-2/3 text-sm text-left rtl:text-right">
      <thead class="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700">
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
          <div class="py-2 w-full text-center cursor-pointer hover:bg-red-100 hover:text-red-400">Delete</div>
        </td>
      </tr>
      </tbody>
    </table>
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
        words: []
      }
    },
    async mounted() {
      this.words = await api.findAllWords(window.localStorage.getItem("vocab-access-token"))
    }
  }
</script>
<style scoped>

</style>