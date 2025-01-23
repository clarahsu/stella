<template>
  <div id="app">
    <!-- Menüleiste -->
    <header class="navbar">
      <nav>
        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <span v-if="isAuthenticated">|</span>
          <router-link v-if="isAuthenticated" to="/about">Campuspläne</router-link>
          <span v-if="isAuthenticated">|</span>
          <router-link v-if="isAuthenticated" to="/kursuebersicht">Kursübersicht</router-link>
          <span v-if="isAuthenticated">|</span>
          <router-link v-if="isAuthenticated" to="/stundenplan">Stundenplan</router-link>
        </div>

        <!-- Login-Formular anzeigen, wenn der Benutzer nicht eingeloggt ist -->
        <div v-if="!isAuthenticated" class="login-container">
          <input v-model="username" type="text" placeholder="Benutzername" />
          <input v-model="password" type="password" placeholder="Passwort" />
          <button @click="handleLogin">Anmelden</button>
        </div>

        <!-- Willkommensnachricht und Logout-Button, wenn der Benutzer eingeloggt ist -->
        <div v-else class="logout-container">
          <span class="welcome-text">Willkommen, {{ user }}!</span>
          <button @click="handleLogout">Abmelden</button>
        </div>
      </nav>
    </header>

    <!-- Seiteninhalt -->
    <router-view />
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/useAuthStore";

export default {
  name: "App",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    isAuthenticated() {
      const authStore = useAuthStore();
      return authStore.getIsAuthenticated;
    },
    user() {
      const authStore = useAuthStore();
      return authStore.getUser;
    },
  },
  methods: {
    handleLogin() {
      const authStore = useAuthStore();
      authStore.login(this.username, this.password);
    },
    handleLogout() {
      const authStore = useAuthStore();
      authStore.logout();
    },
  },
};
</script>

<style>
/* Entfernt Standardabstände für die gesamte Seite */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
}

/* Menüleiste */
.navbar {
  background-color: #414770; /* Hintergrundfarbe */
  padding: 20px 0; /* Vertikaler Abstand, kein horizontaler */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%; /* Deckt die gesamte Breite ab */
}

.navbar nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px; /* Begrenzte Breite für Inhalte */
  margin: 0 auto; /* Zentriert den Inhalt */
  padding: 0 20px; /* Horizontaler Abstand innerhalb des Inhalts */
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-links a {
  font-weight: bold;
  color: #F4ECD6; /* Schriftfarbe */
  text-decoration: none;
  margin-right: 15px;
}

.nav-links a.router-link-exact-active {
  text-decoration: underline;
}

/* Login-Formular und Logout */
.login-container, .logout-container {
  display: inline-flex;
  align-items: center;
}

.login-container input {
  margin-right: 10px;
  padding: 5px;
}

.login-container button {
  padding: 6px 10px;
  background-color: #F4D35E;
  color: #310A31;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-container button {
  padding: 6px 10px;
  background-color: #F4D35E;
  color: #310A31;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.welcome-text {
  margin-right: 15px;
}
</style>
