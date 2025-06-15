<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <v-icon name="hi-login" class="login-icon" />
        <h2>Welcome Back</h2>
        <p>Please enter your credentials</p>
      </div>

      <form @submit.prevent="doLogin" class="login-form">
        <div class="input-group">
          <v-icon name="hi-mail" class="input-icon" />
          <input 
            v-model="email" 
            type="email" 
            placeholder="Email Address" 
            required
            class="login-input"
          />
        </div>

        <div class="input-group">
          <v-icon name="hi-lock-closed" class="input-icon" />
          <input 
            v-model="password" 
            type="password" 
            placeholder="Password" 
            required
            class="login-input"
          />
        </div>

        <button type="submit" class="login-button">
          <span>Sign In</span>
          <v-icon name="hi-arrow-right" class="button-icon" />
        </button>
      </form>

      <div class="login-footer">
        <p>Don't have an account? <router-link to="/register" class="register-link">Register</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '../store'

const email = ref('')
const password = ref('')
const router = useRouter()
const store = useMainStore()

function doLogin() {
  if (email.value && password.value) {
    store.login('mock-jwt-token')
    router.push('/')
  } else {
    alert('Please fill in both fields')
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.login-card {
  background: linear-gradient(145deg, #1a1a1a, #222222);
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid #2e2e2e;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-icon {
  color: #4ade80;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.login-header h2 {
  color: #f5f5f5;
  margin: 0 0 0.5rem 0;
  font-size: 1.8rem;
}

.login-header p {
  color: #a3a3a3;
  margin: 0;
  font-size: 0.95rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #6b7280;
  font-size: 1rem;
}

.login-input {
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 2.5rem;
  background-color: #252525;
  border: 1px solid #2e2e2e;
  border-radius: 8px;
  color: #f5f5f5;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.login-input:focus {
  outline: none;
  border-color: #4ade80;
  box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.2);
}

.login-input::placeholder {
  color: #6b7280;
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: #4ade80;
  color: #111827;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.login-button:hover {
  background-color: #6ee7b7;
}

.login-button:active {
  transform: scale(0.98);
}

.button-icon {
  transition: transform 0.3s ease;
}

.login-button:hover .button-icon {
  transform: translateX(3px);
}

.login-footer {
  margin-top: 1.5rem;
  text-align: center;
  color: #a3a3a3;
  font-size: 0.9rem;
}

.register-link {
  color: #4ade80;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #6ee7b7;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-card {
    padding: 1.75rem;
  }
  
  .login-header h2 {
    font-size: 1.5rem;
  }
  
  .login-input {
    padding: 0.8rem 1rem 0.8rem 2.25rem;
  }
}
</style>