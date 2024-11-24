<template>
  <div id="app h-screen">
    <nav class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Open main menu</span>
              <!--
                Icon when menu is closed.

                Menu open: "hidden", Menu closed: "block"
              -->
              <svg class="block size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <!--
                Icon when menu is open.

                Menu open: "block", Menu closed: "hidden"
              -->
              <svg class="hidden size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex shrink-0 items-center">
              <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
            </div>
            <div v-if="isAuthenticated" class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <router-link :to="{ name : 'words' }">
                <div class="rounded-md hover:bg-gray-900 px-3 py-2 text-sm font-medium text-white cursor-pointer">Words</div>
                </router-link>
                <router-link :to="{ name : 'new-word' }">
                  <div class="rounded-md hover:bg-gray-900 px-3 py-2 text-sm font-medium text-white cursor-pointer">New</div>
                </router-link>
                <router-link :to="{ name : 'test' }">
                  <div class="rounded-md hover:bg-gray-900 px-3 py-2 text-sm font-medium text-white cursor-pointer">Test</div>
                </router-link>
              </div>
            </div>
          </div>
          <div v-if="!isAuthenticated">
            <button @click="toggleLogin = !toggleLogin" class="rounded-lg px-3 py-1.5 bg-gray-200 font-semibold text-xs text-gray-600 hover:bg-gray-300 hover:text-gray-700">
              <span>
              Sign in
              </span>
            </button>
            <div v-if="toggleLogin" class="fixed inset-0 opacity-40 bg-gray-700 z-40" @click="toggleLogin = !toggleLogin">

            </div>
            <div v-if="toggleLogin" class="flex items-start justify-center overflow-y-auto overflow-x-hidden fixed left-0 right-0 z-50 top-[20%]">
              <div class="w-[400px] overflow-x-hidden">
                <div class="inline-flex items-center transition-transform ease-in"
                     :class="[isSignUp ? 'translate-x-[-400px]' : '']">
                  <!-- Sign in box -->
                  <form
                      @submit.prevent="submitLoginForm"
                      class="w-[400px] h-fit py-2 pb-6 px-4 flex flex-col justify-center bg-white border-2 border-gray-400 rounded-md">
                    <div class="self-end">
                      <svg class="cursor-pointer rounded-full p-1 hover:bg-gray-200"
                           @click="toggleLogin = false"
                           width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M19 5L5 19M5.00001 5L19 19" stroke="#000000" stroke-width="1.272" stroke-linecap="round" stroke-linejoin="round">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <h1 class="text-2xl self-center mb-2 font-medium">Sign in</h1>
                    <label class="ml-1 font-medium" for="username">Username</label>
                    <input class="border mb-1 p-1 text-sm focus:outline-none" name="username" v-model="loginForm.username" required placeholder="johndoe@yourcompany.com" type="text">
                    <label class="ml-1 font-medium" for="password">Password</label>
                    <input class="border mb-2 select-none p-1 text-sm focus:outline-none" name="password" v-model="loginForm.password" required placeholder="********" type="password">

                    <button :disabled="loginForm.pending" type="submit" class="py-1 w-1/2 self-center border rounded-lg bg-gray-200 flex justify-center  font-medium text-gray-600 hover:bg-gray-300 hover:text-gray-700"
                            :class="loginForm.pending ? 'cursor-wait' : ''">
                      <div v-if="!loginForm.pending">Submit</div>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="24" height="24" style="shape-rendering: auto; display: block; background: transparent;" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle stroke-dasharray="164.93361431346415 56.97787143782138" r="35" stroke-width="10" stroke="#ffffff" fill="none" cy="50" cx="50">
                        <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
                      </circle><g></g></g>
                      </svg>
                    </button>

                    <p class="ml-1 my-1 text-red-500 text-sm" id="error">{{ loginForm.error }}</p>

                    <div class="text-sm text-blue-400 mt-1">First time here?
                      <span class="font-medium underline underline-offset-2 hover:text-blue-600 cursor-pointer" @click="isSignUp = true"> Sign up</span>
                    </div>
                  </form>
                  <!-- Sign up box -->
                  <form class="w-[400px] py-2 pb-6 px-4 flex flex-col justify-center bg-white border rounded-md"
                  @submit.prevent="submitSignUpForm()">
                    <div class="self-end">
                      <svg class="cursor-pointer rounded-full p-1 hover:bg-gray-200"
                           @click="toggleLogin = !toggleLogin"
                           width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M19 5L5 19M5.00001 5L19 19" stroke="#000000" stroke-width="1.272" stroke-linecap="round" stroke-linejoin="round">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <h1 class="text-2xl self-center mb-2 font-medium">Sign up</h1>
                    <label class="ml-1 font-medium" for="username">Full name</label>
                    <input v-model="signUpForm.fullName" class="border mb-1 p-1 text-sm focus:outline-none" required placeholder="John Doe" name="fullName" type="text">
                    <label class="ml-1 font-medium" for="username">Email</label>
                    <input v-model="signUpForm.username" class="border mb-1 p-1 text-sm focus:outline-none" required placeholder="johndoe@yourcompany.com" name="username" type="text">
                    <label class="ml-1 font-medium" for="password">Password</label>
                    <input v-model="signUpForm.password" class="border mb-2 select-none p-1 text-sm focus:outline-none" required placeholder="********" name="password" type="password">
                    <button :disabled="signUpForm.pending" type="submit" class="py-1 w-1/2 self-center border rounded-lg bg-gray-200 flex justify-center font-medium text-gray-600 hover:bg-gray-300 hover:text-gray-700"
                            :class="signUpForm.pending ? 'cursor-wait' : ''">
                      <div v-if="!signUpForm.pending">Submit</div>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="24" height="24" style="shape-rendering: auto; display: block; background: transparent;" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle stroke-dasharray="164.93361431346415 56.97787143782138" r="35" stroke-width="10" stroke="#ffffff" fill="none" cy="50" cx="50">
                        <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
                      </circle><g></g></g>
                      </svg>
                    </button>

                    <p v-if="signUpForm.status" class="ml-1 my-1 text-sm"
                    :class="signUpForm.status.color">{{ signUpForm.status.message }}</p>

                    <div class="text-sm text-blue-400 mt-1"
                    >Already have an account?
                      <span class="font-medium underline underline-offset-2
            hover:text-blue-600 cursor-pointer"
                            @click="isSignUp = false"> Sign in</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div v-if="isAuthenticated" class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <!-- Profile dropdown -->
            <div class="relative ml-3">
              <div>
                <button @click="toggledAvatar = !toggledAvatar" type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="absolute -inset-1.5"></span>
                  <span class="sr-only">Open user menu</span>
                  <img class="size-8 rounded-full" src="https://preview.redd.it/u1jwljkjvwqc1.png?auto=webp&s=bfc7c00754912eafc7159c561f3baf4a847f4fc8" alt="">
                </button>
              </div>

              <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              -->
              <div :class="[!toggledAvatar ? 'hidden' : '']" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <!-- Active: "bg-gray-100 outline-none", Not Active: "" -->
                <a @click="logout" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2 cursor-pointer">Sign out</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div v-if="isAuthenticated" class="sm:hidden" id="mobile-menu">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <a href="#" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Words</a>
          <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">New</a>
          <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Test</a>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import {api} from "@/helpers/helpers";
import router from "@/router";

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      toggleLogin : false,
      isAuthenticated : false,
      toggledAvatar : false,
      isSignUp : false,
      loginForm : {
        username : '',
        password : '',
        pending : false,
        error: ''
      },
      signUpForm : {
        fullName : '',
        username : '',
        password : '',
        pending : false,
        status: {
          message : '',
          color : 'text-green-400'
        }
      }
    }
  },
  async mounted() {
    const res = await api.authenticate(window.localStorage.getItem("vocab-access-token"));
    if (res.name === 'AxiosError') {
      await router.push('/welcome')
    } else {
      this.isAuthenticated = true
    }

  },
  methods: {
    async submitLoginForm() {
      this.loginForm.error = ''
      this.loginForm.pending = true

      const res = await api.login(this.loginForm)
      if (res.message) {
        this.loginForm.error = res.response.data.message
      } else {
        this.isAuthenticated = true
        window.localStorage.setItem("vocab-access-token", res.token)
        window.location.assign('/')
      }
      this.loginForm.pending = false
    },
    async submitSignUpForm() {
      this.signUpForm.status = {
        message : '',
        color : 'text-green-400'
      }
      this.signUpForm.pending = true

      const res = await api.signUp(this.signUpForm)
      if (res.response?.data.message) {
        this.signUpForm.status.message = res.response.data.message
        this.signUpForm.status.color = 'text-red-400'
      } else {
        this.signUpForm.status.message = res.message
      }
      this.signUpForm.pending = false
    },
    logout() {
      window.localStorage.clear()
      window.location.assign('/')
    }
  }
}
</script>