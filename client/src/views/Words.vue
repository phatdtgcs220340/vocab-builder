<template>

  <div class="relative h-screen overflow-x-auto shadow-md sm:rounded-lg flex justify-center items-start mt-10">
    <table class="w-2/3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3 border-r-2 border-gray-200">
          English
        </th>
        <th scope="col" class="px-6 py-3 border-r-2 border-gray-200">
          German
        </th>
        <th scope="col" class="px-6 py-3 border-r-2 border-gray-200">
          Function
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="word in words" :key="word.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td class="px-6 py-4">
          {{ word.english }}
        </td>
        <td class="px-6 py-4">
          {{ word.german }}
        </td>
        <td class="px-6 py-4">
          $2999
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>
<script>

  export default {
    name: "WordsComponent",
    components: {

    },
    data() {
      return {
        words: [
          {
            id : 1,
            english : "Hello",
            german : "Vacsa"
          },
          {
            id : 1,
            english : "Hello",
            german : "Vacsa"
          },
          {
            id : 1,
            english : "Hello",
            german : "Vacsa"
          },
          {
            id : 1,
            english : "Hello",
            german : "Vacsa"
          },
        ]
      }
    }
  }
</script>
<style scoped>

</style>