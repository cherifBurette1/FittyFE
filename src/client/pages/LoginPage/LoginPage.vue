<template>
  <div
    class="flex justify-start fa fa-arrow-left pl-10 mt-5 hover:cursor-pointer"
    @click="$router.go(-1)"
  ></div>
  <section class="grid text-center h-screen items-center">
    <div>
      <div class="flex justify-center">
        <img src="../../../shared/assets/fittyPNG.png" width="200" height="200" alt="Fitty logo" />
      </div>
      <h3 class="text-3xl font-semibold mb-6 mr-96 text-green-700 pr-14">Login</h3>

      <form action="#" class="mx-auto max-w-lg text-left">
        <!-- Email Field -->
        <div class="mb-6">
          <label for="email" class="text-sm mb-2 block text-green-700 font-medium"
            >Email address or username</label
          >
          <input
            id="email"
            type="email"
            name="email"
            placeholder="name@mail.com"
            class="w-full h-12 px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition"
          />
        </div>

        <!-- Password Field -->
        <div class="mb-6 relative">
          <label for="password" class="text-sm mb-2 block text-green-700 font-medium"
            >Password</label
          >
          <input
            id="password"
            :type="isPasswordVisible ? 'text' : 'password'"
            placeholder="********"
            class="w-full h-12 px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition"
          />
          <button
            type="button"
            @click="togglePasswordVisibility"
            class="absolute inset-y-0 right-3 flex items-center justify-center"
            style="top: 50%; transform: translateY(-10%)"
          >
            <i
              :class="
                isPasswordVisible ? 'fas fa-eye-slash text-green-700' : 'fas fa-eye text-green-700'
              "
            ></i>
          </button>
        </div>

        <!-- Sign In Button -->
        <button
          class="w-full py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 transition-all font-bold mt-6"
          type="button"
        >
          Login
        </button>

        <!-- Forgot Password -->
        <div class="mt-4 flex justify-end">
          <a href="#" class="text-sm text-green-600 hover:underline">Forgot password?</a>
        </div>

        <!-- Google Sign In Button -->
        <button
          class="w-full mt-6 py-3 flex items-center justify-center gap-2 border border-gray-400 rounded-lg text-gray-800 hover:bg-gray-100 transition-all"
          type="button"
        >
          <img
            src="https://www.material-tailwind.com/logos/logo-google.png"
            alt="Google"
            class="h-6 w-6"
          />
          Sign in with Google
        </button>

        <!-- Create Account Link -->
        <p class="mt-4 text-sm text-gray-700 text-center">
          Not registered?
          <a href="#" class="text-green-600 hover:underline">Create account</a>
        </p>
      </form>
    </div>
  </section>
</template>
  
  <script setup lang="ts">
import { ref } from 'vue'

const isPasswordVisible = ref(false)
function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value // Toggle password visibility
}
</script>
  