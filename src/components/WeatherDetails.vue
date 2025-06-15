<template>
  <div class="details-page">
    <Header />
    <div class="details-container">
      <h2 class="city-title">
        Weather Details: {{ city }}
      </h2>
      <div v-if="weather" class="details-card">
        <h3>{{ weather.name }}, {{ weather.sys.country }}</h3>
        <p class="temp">{{ weather.main.temp.toFixed(1) }}°C</p>
        <p class="desc">{{ weather.weather[0].description }}</p>
        <ul class="details-list">
          <li>Humidity: {{ weather.main.humidity }}%</li>
          <li>Wind: {{ weather.wind.speed }} m/s</li>
          <li>Pressure: {{ weather.main.pressure }} hPa</li>
          <li>Feels like: {{ weather.main.feels_like.toFixed(1) }}°C</li>
          <li>Min temp: {{ weather.main.temp_min.toFixed(1) }}°C</li>
          <li>Max temp: {{ weather.main.temp_max.toFixed(1) }}°C</li>
        </ul>
      </div>
      <div v-else class="loading-state">
        <p>Loading weather details...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getWeatherByCity } from '../services/weatherService'
import Header from './Header.vue'

const route = useRoute()
const city = route.params.city
const weather = ref(null)

onMounted(async () => {
  try {
    weather.value = await getWeatherByCity(city)
  } catch (err) {
    alert('Failed to load weather details: ' + err.message)
  }
})
</script>

<style scoped>
.details-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #121212, #1a1a1a);
  padding: 2rem;
  color: #f5f5f5;
}

.details-container {
  max-width: 800px;
  margin: 0 auto;
}

.city-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #4ade80;
  text-align: center;
}

.details-card {
  background: #1e1e1e;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}

.temp {
  font-size: 2rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.desc {
  text-transform: capitalize;
  margin-bottom: 1rem;
}

.details-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.details-list li {
  margin: 0.25rem 0;
}
</style>
