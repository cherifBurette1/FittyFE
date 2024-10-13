<template>
  <div
    class="flex justify-start fa fa-arrow-left pl-8 mt-5 hover:cursor-pointer"
    @click="$router.go(-1)"
  ></div>

  <section class="grid text-center h-screen items-center">
    <div class="bg-white rounded-lg px-8">
      <div class="flex justify-center">
        <img src="../../../shared/assets/fittyPNG.png" width="200" height="200" alt="Fitty logo" />
      </div>

      <h3 class="flex justify-start text-3xl font-semibold mb-6 text-green-700">Register</h3>

      <!-- Stepper -->
      <ol
        class="flex items-center justify-between w-full text-sm font-medium text-center mt-8 mb-8 relative"
      >
        <!-- Step 1 -->
        <li class="flex-1 flex items-center relative">
          <span
            :class="step >= 1 ? 'bg-green-600 text-white' : 'bg-white text-gray-400'"
            class="flex items-center justify-center w-10 h-10 rounded-full border border-green-600 z-10"
          >
            1
          </span>
          <!-- Line to Step 2 -->
          <div
            :class="[
              'absolute top-1/2 transform -translate-y-1/2 left-full h-1 w-full z-0',
              { 'bg-green-600': step > 1, 'bg-gray-300': step <= 1 }
            ]"
          ></div>
          <span class="text-gray-600 mt-5 block text-center w-full">Basic Info</span>
        </li>

        <!-- Step 2 -->
        <li class="flex-1 flex items-center relative">
          <!-- Line from Step 1 to Step 2 -->
          <div
            :class="[
              'absolute top-1/2 transform -translate-y-1/2 right-full h-1 w-full z-0 bg-gray-300',
              { 'bg-green-600': step > 1 }
            ]"
          ></div>
          <span
            :class="step >= 2 ? 'bg-green-600 text-white' : 'bg-white text-gray-400'"
            class="flex items-center justify-center w-10 h-10 rounded-full border border-green-600 z-10"
          >
            2
          </span>
          <!-- Line to Step 3 -->
          <div
            :class="[
              'absolute top-1/2 transform -translate-y-1/2 left-full h-1 w-full z-0 bg-gray-300',
              { 'bg-green-600': step > 2 }
            ]"
          ></div>
          <span class="text-gray-600 mt-5 block text-center w-full">Account Info</span>
        </li>

        <!-- Step 3 -->
        <li class="flex-1 flex items-center relative">
          <!-- Line from Step 2 to Step 3 -->
          <div
            :class="[
              'absolute top-1/2 transform -translate-y-1/2 right-full h-1 w-full z-0 bg-gray-300',
              { 'bg-green-600': step > 2 }
            ]"
          ></div>
          <span
            :class="step >= 3 ? 'bg-green-600 text-white' : 'bg-white text-gray-400'"
            class="flex items-center justify-center w-10 h-10 rounded-full border border-green-600 z-10"
          >
            3
          </span>
          <span class="text-gray-600 mt-5 block text-center w-full">Confirmation</span>
        </li>
      </ol>

      <form action="#" class="mx-auto text-left">
        <div v-if="step === 1">
          <h4 class="text-lg font-semibold mb-4">Basic Info</h4>
          <!-- First Name -->
          <div class="mb-4">
            <label for="firstName" class="text-sm mb-2 block text-green-700 font-medium"
              >First Name</label
            >
            <input
              id="firstName"
              type="text"
              v-model="signUpModelValues.firstName"
              placeholder="First Name"
              class="w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>

          <!-- Last Name -->
          <div class="mb-4">
            <label for="lastName" class="text-sm mb-2 block text-green-700 font-medium"
              >Last Name</label
            >
            <input
              id="lastName"
              type="text"
              v-model="signUpModelValues.lastName"
              placeholder="Last Name"
              class="w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
          <div class="mb-4">
            <label for="mobileNumber" class="text-sm mb-2 block text-green-700 font-medium"
              >Mobile Number</label
            >
            <input
              id="mobileNumber"
              type="text"
              v-model="signUpModelValues.mobileNumber"
              placeholder="Phone Number"
              class="w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
          <!-- Gender -->
          <div class="mb-4">
            <label class="text-sm mb-2 block text-green-700 font-medium">Gender (optional)</label>
            <select
              v-model="signUpModelValues.gender"
              class="w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200"
            >
              <option value="" disabled selected>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="not-say">Rather not say</option>
            </select>
          </div>

          <!-- Birthday -->
          <div class="mb-4">
            <label for="birthday" class="text-sm mb-2 block text-green-700 font-medium"
              >Birthday</label
            >
            <input
              id="birthday"
              type="date"
              v-model="signUpModelValues.birthday"
              class="w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
        </div>

        <div v-if="step === 2">
          <h4 class="text-lg font-semibold mb-4">Address Info</h4>
          <!-- Address -->
          <div class="mb-4">
            <label for="address" class="text-sm mb-2 block text-green-700 font-medium"
              >Address Name</label
            >
            <input
              id="address"
              type="text"
              v-model="signUpModelValues.address"
              placeholder="Address"
              class="w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>

          <!-- Location -->
          <div class="mb-4">
            <label for="location" class="text-sm mb-2 block text-green-700 font-medium"
              >Choose Location</label
            >
            <input
              id="location"
              type="text"
              disabled
              v-model="signUpModelValues.location.address"
              placeholder="Choose Location"
              class="w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200"
            />
            <button
              @click.prevent="authenticationStore.openMap"
              class="flex text-green-600 underline mt-2"
            >
              Choose from Maps
            </button>
          </div>
        </div>

        <div v-if="step === 3">
          <h4 class="text-lg font-semibold mb-4">Login Info</h4>
          <!-- Email -->
          <div class="mb-4">
            <label for="email" class="text-sm mb-2 block text-green-700 font-medium"
              >Email Address</label
            >
            <input
              id="email"
              type="email"
              v-model="signUpModelValues.email"
              placeholder="name@mail.com"
              class="w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>

          <!-- Password -->
          <div class="mb-6 relative">
            <label for="password" class="text-sm mb-2 block text-green-700 font-medium"
              >Password</label
            >
            <input
              id="password"
              :type="signUpModelValues.isPasswordVisible ? 'text' : 'password'"
              v-model="signUpModelValues.password"
              placeholder="********"
              class="w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200"
            />
            <button
              type="button"
              @click="togglePasswordVisibility(false)"
              class="absolute inset-y-0 right-3 flex items-center justify-center"
              style="top: 50%; transform: translateY(-10%)"
            >
              <i
                :class="
                  signUpModelValues.isPasswordVisible
                    ? 'fas fa-eye-slash text-green-700'
                    : 'fas fa-eye text-green-700'
                "
              ></i>
            </button>
          </div>

          <!-- Retype Password -->
          <div class="mb-6 relative">
            <label for="confirmPassword" class="text-sm mb-2 block text-green-700 font-medium"
              >Retype Password</label
            >
            <input
              id="confirmPassword"
              :type="signUpModelValues.isReTypePasswordVisible ? 'text' : 'password'"
              v-model="signUpModelValues.confirmPassword"
              placeholder="********"
              class="w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200"
            />
            <button
              type="button"
              @click="togglePasswordVisibility(true)"
              class="absolute inset-y-0 right-3 flex items-center justify-center"
              style="top: 50%; transform: translateY(-10%)"
            >
              <i
                :class="
                  signUpModelValues.isReTypePasswordVisible
                    ? 'fas fa-eye-slash text-green-700'
                    : 'fas fa-eye text-green-700'
                "
              ></i>
            </button>
          </div>

          <p class="text-sm text-gray-700">
            By continuing, you agree to the
            <a href="#" class="text-green-600 hover:underline">Terms of use</a> and
            <a href="#" class="text-green-600 hover:underline">Privacy Policy</a>.
          </p>
        </div>
        <!-- Buttons for navigation -->
        <div class="flex justify-between mt-6 mb-6">
          <!-- Previous button -->
          <button
            v-if="step > 1"
            @click.prevent="previousStep"
            class="w-1/3 py-3 rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 transition-all font-bold mr-2"
          >
            Previous
          </button>

          <!-- Next button -->
          <button
            v-if="step < 3"
            @click.prevent="nextStep"
            :class="[
              'w-2/3 py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 transition-all font-bold ml-2',
              {
                'w-full': step === 1
              }
            ]"
          >
            Next
          </button>

          <!-- Sign Up button -->
          <button
            v-if="step === 3"
            @click.prevent="authenticationStore.register"
            class="w-full py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 transition-all font-bold ml-2"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
    <div v-if="showMap">
      <MapComponent />
    </div>
  </section>
</template>
  
  <script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthenticationStore } from '@/client/stores'
import { MapComponent } from '@/client/components'
import { storeToRefs } from 'pinia'

const authenticationStore = useAuthenticationStore()
const { showMap, signUpModelValues } = storeToRefs(authenticationStore)
const step = ref(1)

// Function to go to the next step
function previousStep() {
  if (step.value > 1) {
    step.value--
  }
}

function nextStep() {
  if (step.value < 3) {
    console.log(step)
    step.value++
  }
}

// Function to toggle password visibility
function togglePasswordVisibility(reTypePasswordVisible?: boolean) {
  if (reTypePasswordVisible) {
    signUpModelValues.value.isReTypePasswordVisible =
      !signUpModelValues.value.isReTypePasswordVisible
  } else {
    signUpModelValues.value.isPasswordVisible = !signUpModelValues.value.isPasswordVisible
  }
}

// Function to handle registration (replace this with actual registration logic)
</script>
  