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
            <button class="button" @click="handleLogin">Anmelden</button>
          </div>

          <div v-else class="logout-container">
            <span class="welcome-text">Willkommen, {{ user }}!</span>
            <button class="button" @click="handleLogout">Abmelden</button>
          </div>
        </div>
      </div>

      <!-- Burger-Menü Navigation -->
      <nav v-if="menuOpen" class="burger-menu">
        <router-link to="/" @click="closeMenu">Home</router-link>
        <router-link v-if="isAuthenticated" to="/kursuebersicht" @click="closeMenu">Kurs- und Prüfungsübersicht</router-link>
        <router-link v-if="userRole === 'studentin'" to="/stundenplan" @click="closeMenu">Stundenplan</router-link>
        <router-link v-if="isAuthenticated" to="/dozentenliste" @click="closeMenu">Dozierenden-Profile</router-link>
        <router-link v-if="userRole === 'studentin'" to="/dokumente" @click="closeMenu">Persönliche Dokumente</router-link>
        <router-link v-if="userRole === 'dozentin'" to="/noteneingabe" @click="closeMenu">Noteneingabe</router-link>
        <router-link v-if="userRole === 'studentin'" to="/notenuebersicht" @click="closeMenu">Notenübersicht</router-link>
        <router-link v-if="isAuthenticated" to="/about" @click="closeMenu">Campuspläne</router-link>
      </nav>
    </header>


    <!-- Seiteninhalt -->
    <router-view />

    <!-- FAQ-Button und FAQ-Menü -->
    <div class="faq-container">
      <button class="faq-button" @click="toggleFAQ">?</button>
      <div v-if="faqOpen" class="faq-menu">
        <h3>Hilfe & FAQ</h3>
        <button @click="showFAQ('tutorial')">Video-Tutorial</button>
        <button @click="showFAQ('navigation')">Navigation</button>
        <button @click="showFAQ('anmeldung')">Anmeldung</button>

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
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";

export default {
  setup() {
    const authStore = useAuthStore();

    // Reaktive Daten
    const username = ref("");
    const password = ref("");
    const menuOpen = ref(false);
    const faqOpen = ref(false);
    const currentFAQ = ref(null);

    // Computed Properties
    const isAuthenticated = computed(() => authStore.getIsAuthenticated);
    const user = computed(() => authStore.getUser);
    const userRole = computed(() => authStore.userRole);

    // Methoden
    const handleLogin = async () => {
      await authStore.login(username.value, password.value);
    };

    const handleLogout = () => {
      authStore.logout();
      menuOpen.value = false;
    };

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    const closeMenu = () => {
      menuOpen.value = false;
    };

    const toggleFAQ = () => {
      faqOpen.value = !faqOpen.value;
      if (!faqOpen.value) {
        currentFAQ.value = null;
      }
    };

    const showFAQ = (topic) => {
      currentFAQ.value = topic;
    };

    // FAQ-Texte
    const faqData = {
      tutorial: { title: "Video-Tutorial", text: "Hier kommen Sie zu einem Video-Tutorial für das Kursplanungssystem Stella." },
      navigation: { title: "Navigation", text: "Hier erfahren Sie, wie Sie sich auf unserer Seite bewegen." },
      anmeldung: { title: "Anmeldung", text: "Hier finden Sie Informationen zur Anmeldung und Registrierung." },
    };

    const currentFAQTitle = computed(() => (currentFAQ.value ? faqData[currentFAQ.value].title : ""));
    const currentFAQText = computed(() => (currentFAQ.value ? faqData[currentFAQ.value].text : ""));

    console.log("UserRole:", userRole.value);

    return {
      username,
      password,
      menuOpen,
      faqOpen,
      currentFAQ,
      isAuthenticated,
      user,
      userRole,
      handleLogin,
      handleLogout,
      toggleMenu,
      closeMenu,
      toggleFAQ,
      showFAQ,
      currentFAQTitle,
      currentFAQText,
    };
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
  z-index: 10;
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

.button {
  padding: 8px 12px;
  font-size: var(--font-medium);
  background-color: var(--accent-color);
  color: var(--text-color-inv);
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.button:hover {
  background: var(--accent-dark);
}

/* Logout-Container */
.logout-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.welcome-text {
  color: var(--text-color);
  font-size: var(--font-medium);
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
  font-size: var(--font-medium);
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
  font-size: var(--font-title);
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
  color: var(--text-color);
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
  bottom: 0;
  left: 0;
}

body {
  margin: 0;
  overflow-x: hidden; /* Verhindert horizontales Scrollen */
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-size: var(--font-title);
}

</style>
