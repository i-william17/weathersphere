# 🌤️ Weather App

A simple Vue 3 weather app that fetches real-time weather data from the OpenWeatherMap API. Built with Pinia for state management, tested with Jest, and includes basic auth implementation.

---

Features

* Search for weather by city name
* Display temperature and weather details
* Responsive UI
* **State management:** Pinia
* **Auth:** Simple login form with basic validation (for demo)
* Unit tests with **Jest**
* Code coverage reporting

---

## 🔗 Live Demo

👉 [View Live Demo]((https://weatherspherekenya.netlify.app/))

---

## 🛠 Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/i-william17/weathersphere.git
cd client
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure API key

Update `src/services/weatherService.js`:

```js
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
```

👉 Get a free API key at [https://openweathermap.org/api](https://openweathermap.org/api).

### 4️⃣ Run the app

```bash
npm run dev
```

---

## 🔐 Auth Implementation

* Includes a **Login.vue** page/component
* Simple form (username + password)
* Fake auth: checks hardcoded credentials (for demo: `user` / `password123`)
* Upon successful login, stores `isAuthenticated` in **Pinia**
* Navigation guards or conditional rendering can hide weather info until logged in

---

## 🧪 Testing Instructions

### Run unit tests

```bash
npx jest
```

### Run with code coverage

```bash
npx jest --coverage
```

👉 The coverage report will be generated in the `coverage/` directory.

👉 Example screenshot added below:

![Coverage Screenshot](./coverage.png)


## 📦 Build for production

```bash
npm run build
```

Output will be in `dist/`.


## ⚡ Tech stack

* Vue 3 + Vite
* Pinia
* Jest
* OpenWeatherMap API

#####Due to unavoidable circumstances I wasnt able to push with my account(i-william17), I have pushed with another one.
