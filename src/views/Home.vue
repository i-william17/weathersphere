<template>
  <Header />
  <div class="weather-app">
    <div class="app-container">
      <header class="app-header">
        <h1 class="app-title">
          <Icon icon="wi:day-sunny" class="title-icon" />
          WeatherSphere
        </h1>
        <p class="app-subtitle">Get real-time weather updates</p>
      </header>

      <div class="search-container">
        <div class="search-box">
          <Icon icon="bi:search" class="search-icon" />
          <input v-model="city" placeholder="Enter city name..." class="search-input" @keyup.enter="search" />
          <button @click="search" class="search-button">
            <Icon icon="bi:arrow-right" />
          </button>

        </div>
      </div>

      <div v-if="weather" class="weather-display">
        <WeatherCard :data="weather" />
      </div>

      <div v-else class="empty-state">
        <Icon icon="hi-solid:location-marker" class="empty-icon" />
        <p>Search for a city to view weather information</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import Header from '../components/Header.vue'
import WeatherCard from '../components/WeatherCard.vue'
import { getWeatherByCity } from '../services/weatherService'

const city = ref('')
const weather = ref(null)

async function search() {
  const trimmed = city.value?.trim();

  if (!trimmed) {
    alert('Please enter a city name');
    return;
  }

  try {
    weather.value = await getWeatherByCity(trimmed);
    city.value = '';
    console.log('Weather data:', weather.value);
  } catch (err) {
    alert('Failed to load details: ' + err.message);
  }
}

</script>

<style scoped>
.weather-app {
  min-height: 100vh;
  background: linear-gradient(to bottom, #121212, #1a1a1a);
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.app-container {
  width: 100%;
  max-width: 800px;
  animation: fadeIn 0.8s ease-out;
}

.app-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.app-title {
  color: #4ade80;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.title-icon {
  font-size: 2.25rem;
  filter: drop-shadow(0 2px 4px rgba(74, 222, 128, 0.3));
}

.app-subtitle {
  color: #a3a3a3;
  font-size: 1rem;
  margin: 0;
  font-weight: 400;
}

.search-container {
  margin-bottom: 2.5rem;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #1e1e1e;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  border: 1px solid #2e2e2e;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-box:focus-within {
  border-color: #4ade80;
  box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.25),
    0 4px 16px rgba(74, 222, 128, 0.1);
}

.search-icon {
  color: #6ee7b7;
  margin-right: 0.75rem;
  font-size: 1rem;
  opacity: 0.8;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #f5f5f5;
  font-size: 1rem;
  padding: 0.75rem 0;
  outline: none;
  font-family: inherit;
}

.search-input::placeholder {
  color: #6b7280;
  opacity: 0.7;
}

.search-button {
  background-color: #4ade80;
  color: #111827;
  border: none;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(74, 222, 128, 0.2);
}

.search-button:hover {
  background-color: #6ee7b7;
  transform: translateX(2px) scale(1.05);
}

.search-button:active {
  transform: scale(0.95);
}

.weather-display {
  animation: fadeIn 0.5s ease;
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: #6b7280;
}

.empty-icon {
  font-size: 3rem;
  color: #2a2a2a;
  margin-bottom: 1rem;
  opacity: 0.5;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .weather-app {
    padding: 1.5rem;
  }

  .app-title {
    font-size: 2rem;
  }

  .search-box {
    padding: 0.5rem;
  }
}
</style>