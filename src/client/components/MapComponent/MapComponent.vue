<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
    <div class="h-3/4 w-3/4 relative">
      <!-- Exit Button -->
      <button
        @click="authenticationStore.exitMap"
        class="absolute top-2 right-2 bg-red-600 text-white py-2 px-4 rounded font-bold z-[1000]"
      >
        Exit
      </button>

      <!-- Confirm Location Button -->
      <button
        @click="setLocation"
        class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-2 px-4 rounded font-bold z-[1000]"
      >
        Confirm Location
      </button>

      <!-- Map -->
      <div id="map" class="absolute inset-0 z-[1]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import L from 'leaflet'
import 'leaflet-geosearch/dist/geosearch.css'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import isEqual from 'lodash/isEqual'
import { useAuthenticationStore } from '@/client/stores'
import { defaultMapInfo } from '@/shared/constants'

const map = ref<L.Map | null>(null)
const authenticationStore = useAuthenticationStore()
const { signUpModelValues } = storeToRefs(authenticationStore)

const marker = ref<L.Marker | null>(null) // Store reference to the current marker

onMounted(async () => {
  // Initialize the map
  map.value = L.map('map').setView([51.505, -0.09], 13)

  // Set up OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map.value)

  // Add search control using leaflet-geosearch
  const provider = new OpenStreetMapProvider()
  const searchControl = GeoSearchControl({
    provider,
    style: 'bar',
    showMarker: false, // Disable the automatic marker from GeoSearch
    retainZoomLevel: false,
    autoClose: true,
    keepResult: true
  })

  map.value.addControl(searchControl)

  // Add "Get Current Location" button below zoom controls
  const locateControl = L.control({ position: 'topleft' })
  locateControl.onAdd = function () {
    const button = L.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom')
    button.innerHTML = '<i class="fas fa-map-marker-alt"></i>'
    button.style.backgroundColor = 'white'
    button.style.width = '34px'
    button.style.height = '35px'
    button.style.fontSize = '24px'
    button.style.cursor = 'pointer'
    button.title = 'Get Current Location'
    button.onclick = () => {
      map.value?.locate({ setView: true, maxZoom: 16 })
    }
    return button
  }
  locateControl.addTo(map.value)

  // Handle current location found event
  map.value.on('locationfound', async (e: any) => {
    if (!isEqual(signUpModelValues.value.location, defaultMapInfo)) {
      e.latlng.lat = signUpModelValues.value.location.lat
      e.latlng.lng = signUpModelValues.value.location.lng
      const { lat, lng } = signUpModelValues.value.location
      map.value.setView([lat, lng], 16)
    }
    await authenticationStore.reverseGeocode(e.latlng.lat, e.latlng.lng)

    // If a marker already exists, remove it
    if (marker.value) {
      map.value.removeLayer(marker.value)
    }

    // Add a draggable marker for the current location
    marker.value = L.marker(e.latlng, { draggable: true })
      .addTo(map.value)
      .bindPopup(signUpModelValues.value.location.address)
      .openPopup()
  })

  // Listen for map movement to update marker position
  map.value.on('moveend', async () => {
    if (marker.value) {
      const center = map.value.getCenter() // Get the new center of the map
      smoothMoveMarker(marker.value, center) // Smoothly move the marker to the new center

      const position = marker.value!.getLatLng() // Get new position of the marker

      // Perform reverse geocode to get the address from new position
      await authenticationStore.reverseGeocode(position.lat, position.lng)

      // Update the location in the store
      signUpModelValues.value.location = {
        lat: position.lat,
        lng: position.lng,
        address: signUpModelValues.value.location.address || 'Dropped Location'
      }

      // Optionally update the popup content
      marker.value!.setPopupContent(signUpModelValues.value.location.address).openPopup()
    }
  })

  // Listen for search location selection
  map.value.on('geosearch/showlocation', async (result: any) => {
    const lat = result.location.y
    const lng = result.location.x
    // Reverse geocode to get the address from search result
    await authenticationStore.reverseGeocode(lat, lng)

    const label = signUpModelValues.value.location.address || result.label || '' // Use fetched address or fallback
    signUpModelValues.value.location = { lat, lng, address: label }

    // If a marker already exists, remove it
    if (marker.value) {
      map.value.removeLayer(marker.value)
    }

    // Add a draggable marker for the selected location
    marker.value = L.marker([lat, lng], { draggable: true })
      .addTo(map.value)
      .bindPopup(label)
      .openPopup()

    // Add event listener for when the marker is dragged and dropped
    marker.value.on('dragend', async () => {
      const position = marker.value!.getLatLng() // Get new position of the marker

      // Perform reverse geocode to get the address from new position
      await authenticationStore.reverseGeocode(position.lat, position.lng)

      // Update the location in the store
      signUpModelValues.value.location = {
        lat: position.lat,
        lng: position.lng,
        address: signUpModelValues.value.location.address || 'Dropped Location'
      }

      // Optionally update the popup content
      marker.value!.setPopupContent(signUpModelValues.value.location.address).openPopup()
    })

    // Center the map on the new location
    map.value.setView([lat, lng], 16)
  })

  // Center the map on the user's current location when the map is loaded
  map.value.locate({ setView: true, maxZoom: 16 })
})

function setLocation() {
  // Use the marker's position for the tempLocation
  const position = marker.value?.getLatLng()
  if (position) {
    authenticationStore.tempLocation = { lat: position.lat, lng: position.lng, address: '' }
  }
  authenticationStore.showMap = false
}
function smoothMoveMarker(marker: L.Marker, targetPosition: L.LatLng) {
  const startPosition = marker.getLatLng()
  const steps = 5 // Number of steps to take

  let currentStep = 0

  function animate() {
    if (currentStep < steps) {
      const lat =
        startPosition.lat + (targetPosition.lat - startPosition.lat) * (currentStep / steps)
      const lng =
        startPosition.lng + (targetPosition.lng - startPosition.lng) * (currentStep / steps)
      marker.setLatLng([lat, lng])
      currentStep++
      requestAnimationFrame(animate) // Continue the animation
    } else {
      marker.setLatLng(targetPosition) // Ensure it ends at the target position
    }
  }

  animate() // Start the animation
}
</script>
