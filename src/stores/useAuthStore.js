import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isAuthenticated: false,  // Benutzer ist nicht eingeloggt
    user: null,              // Kein Benutzername zugewiesen
    role: null,              
  }),

  actions: {
    // Login-Funktion, überprüft Benutzername und Passwort und setzt die Authentifizierung
    login(username, password) {
      // Überprüft Benutzer und Passwort, setzt den Authentifizierungsstatus und die Rolle
      if (username === 'space-studentin' && password === 'SpaceG1rls') {
        this.isAuthenticated = true;
        this.user = username;
        this.role = 'student';  // Rolle als Student
      } else if (username === 'space-dozentin' && password === 'Sp4ceGirls') {
        this.isAuthenticated = true;
        this.user = username;
        this.role = 'dozent';  // Rolle als Dozent
      } else {
        alert('Ungültiger Benutzername oder Passwort');
      }
    },

    // Logout-Funktion, setzt den Authentifizierungsstatus zurück
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.role = null;
    },

    setRole(role) {
      this.role = role;
    },
  },

  getters: {
 
    getIsAuthenticated: (state) => state.isAuthenticated,

    getUser: (state) => state.user,

    getRole: (state) => state.role,
  }
});

