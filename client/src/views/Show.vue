<template>
  <div class="relative h-screen overflow-x-auto shadow-md sm:rounded-lg flex justify-center items-start mt-10">
    <div class="w-2/3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <div class="grid grid-cols-2">
        <div class="font-semibold text-xl px-2 py-4 border-gray-600 border-2 border-b-0 bg-gray-700 text-white flex items-center gap-2">
          <svg width="20px" height="20px" viewBox="0 -4 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_503_2952)"> <rect width="28" height="20" rx="2" fill="white"></rect> <mask id="mask0_503_2952" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20"> <rect width="28" height="20" rx="2" fill="white"></rect> </mask> <g mask="url(#mask0_503_2952)"> <rect width="28" height="20" fill="#0A17A7"></rect> <path fill-rule="evenodd" clip-rule="evenodd" d="M-1.28244 -1.91644L10.6667 6.14335V-1.33333H17.3334V6.14335L29.2825 -1.91644L30.7737 0.294324L21.3263 6.66667H28V13.3333H21.3263L30.7737 19.7057L29.2825 21.9165L17.3334 13.8567V21.3333H10.6667V13.8567L-1.28244 21.9165L-2.77362 19.7057L6.67377 13.3333H2.95639e-05V6.66667H6.67377L-2.77362 0.294324L-1.28244 -1.91644Z" fill="white"></path> <path d="M18.668 6.33219L31.3333 -2" stroke="#DB1F35" stroke-width="0.666667" stroke-linecap="round"></path> <path d="M20.0128 13.6975L31.3666 21.3503" stroke="#DB1F35" stroke-width="0.666667" stroke-linecap="round"></path> <path d="M8.00555 6.31046L-3.83746 -1.67099" stroke="#DB1F35" stroke-width="0.666667" stroke-linecap="round"></path> <path d="M9.29006 13.6049L-3.83746 22.3105" stroke="#DB1F35" stroke-width="0.666667" stroke-linecap="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 12H12V20H16V12H28V8H16V0H12V8H0V12Z" fill="#E6273E"></path> </g> </g> <defs> <clipPath id="clip0_503_2952"> <rect width="28" height="20" rx="2" fill="white"></rect> </clipPath> </defs> </g></svg>
          English
        </div>
        <div class="px-2 py-4 border-2 border-l-0 border-gray-600 border-b-0 text-center w-1/3 text-lg text-gray-900">
          {{ word.english }}
        </div>
        <div class="font-semibold text-xl px-2 py-4 border-gray-600 border-2 bg-gray-700 text-white flex items-center gap-2">
          <svg width="20px" height="20px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#FFCD05" d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-4H0v4z"></path><path fill="#ED1F24" d="M0 14h36v9H0z"></path><path fill="#141414" d="M32 5H4a4 4 0 0 0-4 4v5h36V9a4 4 0 0 0-4-4z"></path></g></svg>
          German
        </div>
        <div class="px-2 py-4 border-2 border-l-0 border-gray-600 text-center w-1/3 text-lg text-gray-900">
          {{ word.german }}
        </div>
      </div>
      <router-link :to="{ name : 'edit', params : { id : word._id } }">
      <div class="mt-5 text-2xl text-blue-500 hover:text-blue-700 hover:underline hover:underline-offset-2 cursor-pointer">
        Edit word
      </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import {api} from "@/helpers/helpers";

export default {
  name: "ShowComponent",
  components: {
  },
  data() {
    return {
      word : {
        id : null,
        english : '',
        german : ''
      }
    }
  },
  async mounted() {
    this.word = await api.findWordById(window.localStorage.getItem("vocab-access-token"), this.$route.params.id)
  }
}
</script>

<style scoped>

</style>