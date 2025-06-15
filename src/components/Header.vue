<template>
  <header class="header-container">
    <button @click="logout" class="logout-button">
      <Icon icon="material-symbols:logout" class="logout-icon" />
      <span class="logout-text">Logout</span>
    </button>
  </header>
</template>

<script setup>
import { useMainStore } from '../store'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const store = useMainStore()
const router = useRouter()

function logout() {
  store.logout()
  router.push('/login')
}
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1e1e1e;
  border-bottom: 1px solid #2e2e2e;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logout-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-button:hover {
  background-color: rgba(239, 68, 68, 0.2);
  transform: translateY(-1px);
}

.logout-button:active {
  transform: translateY(0);
}

.logout-icon {
  font-size: 1.25rem;
}

.logout-text {
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
  }
  
  .logout-text {
    display: none;
  }
  
  .logout-button {
    padding: 0.5rem;
    border-radius: 50%;
    aspect-ratio: 1/1;
  }
}
</style>