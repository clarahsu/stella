<template>
  <div id="app">
    <!-- Menüleiste mit Burger-Menü -->
    <header class="navbar">
      <div class="menu-container">
        <!-- Burger-Menü Button -->
        <button class="burger-button" @click="toggleMenu">
          ☰
        </button>

        <!-- Logo -->
        <div class="logo-container">
          <img src="@/assets/logo-hci-white.png" alt="Logo" class="logo" />
        </div>

        <!-- Login-/Logout-Formular oben rechts -->
        <div class="auth-container">
          <div v-if="!isAuthenticated" class="login-container">
            <input v-model="username" type="text" placeholder="Benutzername" />
            <input v-model="password" type="password" placeholder="Passwort" />
            <button @click="handleLogin">Anmelden</button>
          </div>

          <div v-else class="logout-container">
            <span class="welcome-text">Willkommen, {{ user }}!</span>
            <button @click="handleLogout">Abmelden</button>
          </div>
        </div>
      </div>

      <!-- Burger-Menü Navigation -->
      <nav v-if="menuOpen" class="burger-menu">
        <router-link to="/" @click="closeMenu">Home</router-link>
        <router-link v-if="isAuthenticated" to="/about" @click="closeMenu">Campuspläne</router-link>
        <router-link v-if="isAuthenticated" to="/kursuebersicht" @click="closeMenu">Kursübersicht</router-link>
        <router-link v-if="isAuthenticated" to="/stundenplan" @click="closeMenu">Stundenplan</router-link>
      </nav>
    </header>

    <!-- Seiteninhalt -->
    <router-view />

    <!-- FAQ-Button und FAQ-Menü -->
    <div class="faq-container">
      <button class="faq-button" @click="toggleFAQ">?</button>
      <div v-if="faqOpen" class="faq-menu">
        <h3>Hilfe & FAQ</h3>
        <button @click="showFAQ('navigation')">Navigation</button>
        <button @click="showFAQ('anmeldung')">Anmeldung</button>
        <button @click="showFAQ('sonstiges')">Sonstiges</button>

        <div v-if="currentFAQ">
          <h4>{{ currentFAQTitle }}</h4>
          <p>{{ currentFAQText }}</p>
        </div>
      </div>
    </div>

    <!-- Footer-Balken als visueller Abschluss -->
    <footer class="footer">
      <p>&copy; 2025 Space University</p>
    </footer>
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
      menuOpen: false, // Burger-Menü Status
      faqOpen: false, // FAQ-Menü Status
      currentFAQ: null, // Aktuelle FAQ-Anzeige
      faqData: {
        navigation: {
          title: "Navigation",
          text: "Hier erfahren Sie, wie Sie sich auf unserer Seite bewegen.",
        },
        anmeldung: {
          title: "Anmeldung",
          text: "Hier finden Sie Informationen zur Anmeldung und Registrierung.",
        },
        sonstiges: {
          title: "Sonstiges",
          text: "Weitere häufig gestellte Fragen werden hier beantwortet.",
        },
      },
    };
  },
  computed: {
    isAuthenticated() {
      return useAuthStore().getIsAuthenticated;
    },
    user() {
      return useAuthStore().getUser;
    },
    currentFAQTitle() {
      return this.currentFAQ ? this.faqData[this.currentFAQ].title : "";
    },
    currentFAQText() {
      return this.currentFAQ ? this.faqData[this.currentFAQ].text : "";
    },
  },
  methods: {
    handleLogin() {
      useAuthStore().login(this.username, this.password);
    },
    handleLogout() {
      useAuthStore().logout();
      this.closeMenu();
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    toggleFAQ() {
      this.faqOpen = !this.faqOpen;
      if (!this.faqOpen) {
        this.currentFAQ = null;
      }
    },
    showFAQ(topic) {
      this.currentFAQ = topic;
    },
  },
};
</script>

<style>
/* Entfernt Standardabstände */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: var(--font-medium);
  background-color: var(--background-color);
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1; /* Hauptinhalt nimmt den Platz zwischen Header und Footer ein */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px; /* Abstand, damit die Maske nicht an den Rand gedrückt wird */
}

/* Menüleiste */
.navbar {
  background-color: var(--primary-color);
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: relative;
}

/* Container für Menü */
.menu-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Logo mittig ausrichten */
.logo-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.logo {
  height: 100px; /* Logo-Größe anpassen */
  max-width: 200px; /* Maximale Breite setzen */
}

/* Burger-Button */
.burger-button {
  font-size: var(--font-title);
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 10px;
}

/* Auth-Container (Login/Logout) rechts oben */
.auth-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Login-Container */
.login-container {
  display: flex;
  gap: 10px;
}

.login-container input {
  padding: 5px;
}

.login-container button {
  padding: 6px 10px;
  background-color: var(--accent-color);
  color: var(--text-color-inv);
  border: none;
  cursor: pointer;
}

.login-container button:hover {
  background: var(--accent-dark);
}

/* Logout-Container */
.logout-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logout-container button {
  padding: 6px 10px;
  font-size: var(--font-medium);
  background-color: var(--accent-color);
  color: var(--text-color-inv);
  border: none;
  cursor: pointer;
}

.logout-container button:hover {
  background: var(--accent-dark);
}

.welcome-text {
  color: var(--text-color);
}

/* Burger-Menü */
.burger-menu {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background: var(--primary-color);
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.burger-menu a {
  padding: 10px;
  text-align: center;
  color: var(--text-color);
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.burger-menu a:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* FAQ-Button */
.faq-container {
  position: fixed;
  bottom: 80px; /* Über dem Footer */
  right: 20px;
}

.faq-button {
  width: 50px;
  height: 50px;
  background-color: var(--accent-color);
  color: var(--text-color-inv);
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
}

.faq-button:hover {
  background: var(--accent-dark);
}

/* FAQ-Menü */
.faq-menu {
  position: absolute;
  bottom: 60px;
  right: 0;
  background: white;
  width: 250px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.faq-menu h3 {
  margin-top: 0;
  color: var(--text-color-inv);
}

.faq-menu button {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  background: var(--primary-color);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.faq-menu button:hover {
  background: var(--secondary-color);
}

/* Footer-Balken */
.footer {
  background-color: var(--primary-color);
  padding: 10px 0;
  text-align: center;
  color: var(--text-color);
  font-size: var(--font-small);
  width: 100%;
  margin-top: auto;
  position: relative;
  bottom: 0;
}

h1 {
  font-size: var(--font-title);
}

</style>
