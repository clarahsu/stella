<template>
  <div>
    <button class="burger-button" @click="toggleMenu">
      ☰
    </button>

    <nav v-if="menuOpen" class="burger-menu">
      <router-link to="/" @click="closeMenu">Home</router-link>
      <router-link v-if="isAuthenticated" to="/about" @click="closeMenu">Campuspläne</router-link>
      <router-link v-if="isAuthenticated" to="/kursuebersicht" @click="closeMenu">Kursübersicht</router-link>
      <router-link v-if="isAuthenticated" to="/stundenplan" @click="closeMenu">Stundenplan</router-link>
      <button v-if="isAuthenticated" @click="handleLogout">Abmelden</button>
    </nav>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/useAuthStore';

export default {
  data() {
    return {
      menuOpen: false
    };
  },
  computed: {
    isAuthenticated() {
      return useAuthStore().getIsAuthenticated;
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    handleLogout() {
      useAuthStore().logout();
      this.closeMenu();
    }
  }
};
</script>

<style scoped>
/* Button für das Burger-Menü */
.burger-button {
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 10px;
}

/* Das eigentliche Menü */
.burger-menu {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background: #88B7B5;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.burger-menu a, .burger-menu button {
  padding: 10px;
  text-align: center;
  color: white;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  background: none;
  border: none;
  cursor: pointer;
}

.burger-menu a:hover, .burger-menu button:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
