<template>
  <div class="weather-card">
    <div class="weather-header">
      <div class="location">
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4ade80">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </span>
        <h3 class="city">{{ data.name }}, {{ data.sys.country }}</h3>
      </div>
      <div class="current-conditions">
        <span class="weather-icon" v-html="getWeatherIcon(data.weather[0].main)"></span>
        <p class="desc">{{ capitalizeFirstLetter(data.weather[0].description) }}</p>
      </div>
    </div>

    <div class="temperature-display">
      <span class="temp">{{ data.main.temp.toFixed(1) }}°C</span>
      <span class="feels">Feels like {{ data.main.feels_like.toFixed(1) }}°C</span>
    </div>

    <div class="weather-details">
      <div class="detail-grid">
        <div class="detail-item" v-for="(item, index) in detailItems" :key="index">
          <span class="detail-icon">{{ item.icon }}</span>
          <div class="detail-content">
            <span class="detail-label">{{ item.label }}</span>
            <span class="detail-value">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const detailItems = computed(() => [
  { icon: '🌡', label: 'Min Temp', value: `${props.data.main.temp_min.toFixed(1)}°C` },
  { icon: '🌡', label: 'Max Temp', value: `${props.data.main.temp_max.toFixed(1)}°C` },
  { icon: '💧', label: 'Humidity', value: `${props.data.main.humidity}%` },
  { icon: '📈', label: 'Pressure', value: `${props.data.main.pressure} hPa` },
  { icon: '🌊', label: 'Sea Level', value: props.data.main.sea_level ? `${props.data.main.sea_level} hPa` : 'N/A' },
  { icon: '🏔', label: 'Ground Level', value: props.data.main.grnd_level ? `${props.data.main.grnd_level} hPa` : 'N/A' },
  { icon: '☁️', label: 'Cloud Cover', value: `${props.data.clouds.all}%` },
  { icon: '👁', label: 'Visibility', value: `${(props.data.visibility / 1000).toFixed(1)} km` },
  { icon: '💨', label: 'Wind Speed', value: `${props.data.wind.speed} m/s` },
  { icon: '🧭', label: 'Wind Direction', value: `${props.data.wind.deg}° ${getWindDirection(props.data.wind.deg)}` },
  { icon: '🌬', label: 'Wind Gust', value: props.data.wind.gust ? `${props.data.wind.gust} m/s` : 'N/A' },
  { icon: '🌅', label: 'Sunrise', value: formatTime(props.data.sys.sunrise) },
  { icon: '🌇', label: 'Sunset', value: formatTime(props.data.sys.sunset) },
  { icon: '🕒', label: 'Timezone', value: `UTC${props.data.timezone >= 0 ? '+' : ''}${(props.data.timezone / 3600)}` }
]);

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const getWindDirection = (degrees) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getWeatherIcon = (condition) => {
  const icons = {
    Clear: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#eab308"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>',
    Clouds: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#94a3b8"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>',
    Rain: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#60a5fa"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 18l-4-4 1.41-1.41L14 15.17l6.59-6.59L22 10l-8 8z"/></svg>',
    Snow: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#e0f2fe"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM6 18c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm9-8h-2v4h-2v-4H9l3-3 3 3z"/></svg>',
    Thunderstorm: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#f59e0b"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 17h-4l2-4h-3l3-6 1 2h3l-2 4h3z"/></svg>',
    Drizzle: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#93c5fd"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM7 17l-3.17-3.17L5.17 12 7 13.83 10.17 10 12 11.83 8.83 15 12 18.17 10.17 20 7 17z"/></svg>',
    Mist: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#d1d5db"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/></svg>'
  }
  return icons[condition] || '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#94a3b8"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>'
}
</script>

<style scoped>
.weather-card {
  background: linear-gradient(145deg, #1e293b, #0f172a);
  border-radius: 20px;
  padding: 1.75rem;
  color: #f8fafc;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), 0 5px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  max-width: 420px;
  margin: auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  backdrop-filter: blur(8px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.weather-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.weather-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.25rem;
  position: relative;
}

.location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.location .icon {
  display: flex;
  align-items: center;
  filter: drop-shadow(0 0 5px rgba(74, 222, 128, 0.3));
}

.city {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #f8fafc;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.current-conditions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.weather-icon {
  display: flex;
  align-items: center;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
}

.desc {
  font-size: 1rem;
  margin: 0;
  color: #cbd5e1;
  text-transform: capitalize;
  letter-spacing: 0.5px;
}

.temperature-display {
  text-align: center;
  margin: 1.75rem 0;
  position: relative;
}

.temperature-display::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.temp {
  font-size: 3.5rem;
  font-weight: 700;
  color: #f8fafc;
  display: block;
  line-height: 1;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  background: linear-gradient(90deg, #f8fafc, #e2e8f0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.feels {
  font-size: 1rem;
  color: #94a3b8;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.weather-details {
  margin-top: 2rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.detail-item:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.detail-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(74, 222, 128, 0.1);
  color: #4ade80;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.detail-content {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.detail-label {
  font-size: 0.7rem;
  color: #94a3b8;
  margin-bottom: 0.15rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: #f8fafc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 480px) {
  .weather-card {
    padding: 1.5rem;
    border-radius: 16px;
  }
  
  .temp {
    font-size: 3rem;
  }
  
  .detail-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 360px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .city {
    font-size: 1.3rem;
  }
}
</style>