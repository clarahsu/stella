import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        isAuthenticated: false,
        user: null
    }),

    actions: {
        login(username, password) {
            // Hier kannst du die Logindaten validieren
            if (username === 'space-studentin' && password === 'SpaceG1rls') {
                this.isAuthenticated = true;
                this.user = username;
            } else if (username === 'space-dozentin' && password === 'Sp4ceGirls') {
                this.isAuthenticated = true;
                this.user = username;
            } else {
                alert('Ungültiger Benutzername oder Passwort');
            }
        },

        logout() {
            this.isAuthenticated = false;
            this.user = null;
        }
    },

    getters: {
        getIsAuthenticated: (state) => state.isAuthenticated,
        getUser: (state) => state.user,
    }
});
