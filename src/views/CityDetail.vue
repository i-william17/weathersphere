<template>
  <div class="weather-card">
    <div class="card-header">
      <Icon icon="carbon:location-filled" class="location-icon" />
      <div>
        <h3 class="city-name">{{ data.name }}</h3>
        <p class="current-date">{{ currentDate }}</p>
      </div>
    </div>
    
    <div class="weather-main">
      <div class="temperature-section">
        <div class="temperature">
          <Icon icon="wi:thermometer" class="temp-icon" />
          <span class="temp-value">{{ Math.round(data.main.temp) }}°C</span>
        </div>
        <div class="temp-range">
          <span class="temp-max">H: {{ Math.round(data.main.temp_max) }}°C</span>
          <span class="temp-min">L: {{ Math.round(data.main.temp_min) }}°C</span>
        </div>
      </div>

      <div class="weather-meta">
        <div class="weather-description">
          <Icon :icon="getWeatherIcon(data.weather[0].main)" class="weather-icon" />
          <span class="description">{{ capitalizeFirstLetter(data.weather[0].description) }}</span>
        </div>
        
        <div class="weather-stats">
          <div class="weather-stat">
            <Icon icon="wi:humidity" class="stat-icon" />
            <span>{{ data.main.humidity }}%</span>
          </div>
          <div class="weather-stat">
            <Icon icon="wi:barometer" class="stat-icon" />
            <span>{{ data.main.pressure }} hPa</span>
          </div>
          <div class="weather-stat">
            <Icon icon="wi:windy" class="stat-icon" />
            <span>{{ data.wind.speed }} m/s</span>
          </div>
        </div>
      </div>
    </div>
    
    <router-link :to="`/city/${data.name}`" class="details-link">
      <span>View Full Forecast</span>
      <Icon icon="carbon:arrow-right" class="arrow-icon" />
    </router-link>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

defineProps({
  data: Object
})

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  })
})

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const getWeatherIcon = (condition) => {
  const icons = {
    Clear: 'wi:day-sunny',
    Clouds: 'wi:cloudy',
    Rain: 'wi:rain',
    Snow: 'wi:snow',
    Thunderstorm: 'wi:thunderstorm',
    Drizzle: 'wi:showers',
    Mist: 'wi:fog',
    Smoke: 'wi:smoke',
    Haze: 'wi:day-haze',
    Dust: 'wi:dust',
    Fog: 'wi:fog',
    Sand: 'wi:sandstorm',
    Ash: 'wi:volcano',
    Squall: 'wi:strong-wind',
    Tornado: 'wi:tornado'
  }
  return icons[condition] || 'wi:day-cloudy'
}
</script>

<style scoped>
.weather-card {
  background: linear-gradient(145deg, #1a1a1a, #222222);
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid #2e2e2e;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 320px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.weather-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.location-icon {
  color: #4ade80;
  font-size: 1.5rem;
  margin-top: 0.25rem;
}

.city-name {
  color: #f5f5f5;
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
}

.current-date {
  color: #a3a3a3;
  margin: 0;
  font-size: 0.85rem;
}

.weather-main {
  margin-bottom: 1.75rem;
}

.temperature-section {
  margin-bottom: 1.5rem;
}

.temperature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.temp-icon {
  color: #f97316;
  font-size: 2rem;
}

.temp-value {
  color: #f5f5f5;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

.temp-range {
  display: flex;
  gap: 1rem;
  margin-left: 3rem;
}

.temp-max, .temp-min {
  font-size: 0.9rem;
  color: #d1d5db;
}

.temp-max::before {
  content: "↑";
  margin-right: 0.25rem;
  color: #ef4444;
}

.temp-min::before {
  content: "↓";
  margin-right: 0.25rem;
  color: #60a5fa;
}

.weather-meta {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  padding: 1rem;
}

.weather-description {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.weather-icon {
  color: #60a5fa;
  font-size: 1.75rem;
}

.description {
  color: #d1d5db;
  font-size: 1.1rem;
  font-weight: 500;
}

.weather-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.weather-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 0.5rem;
  font-size: 0.85rem;
}

.weather-stat span {
  color: #f5f5f5;
  margin-top: 0.25rem;
}

.stat-icon {
  font-size: 1.25rem;
  color: #a3a3a3;
}

.details-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  color: #4ade80;
  text-decoration: none;
  font-weight: 500;
  padding: 0.85rem 1.5rem;
  border-radius: 10px;
  background-color: rgba(74, 222, 128, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(74, 222, 128, 0.2);
}

.details-link:hover {
  background-color: rgba(74, 222, 128, 0.2);
  color: #6ee7b7;
}

.arrow-icon {
  transition: transform 0.3s ease;
  font-size: 1rem;
}

.details-link:hover .arrow-icon {
  transform: translateX(3px);
}

@media (max-width: 640px) {
  .weather-card {
    padding: 1.5rem;
    max-width: 100%;
  }
  
  .city-name {
    font-size: 1.4rem;
  }
  
  .temp-value {
    font-size: 2.2rem;
  }
  
  .weather-stats {
    grid-template-columns: 1fr;
  }
}
</style>