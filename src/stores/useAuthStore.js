import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
        user: localStorage.getItem('user') || null,
        userRole: localStorage.getItem('userRole') || null, // Speichert die Rolle
    }),

    actions: {
        login(username, password) {
            let role = null;

            if (username === 'space-studentin' && password === 'Sp4ceGirls') {
                role = "studentin";
            } else if (username === 'space-dozentin' && password === 'Sp4ceGirls') {
                role = "dozentin";
            } else {
                alert('Ungültiger Benutzername oder Passwort');
                return;
            }

            this.isAuthenticated = true;
            this.user = username;
            this.userRole = role;

            // **Sorge dafür, dass `userRole` in `localStorage` gespeichert wird**
            localStorage.setItem("user", username);
            localStorage.setItem("userRole", role);
            localStorage.setItem("isAuthenticated", JSON.stringify(true));

            console.log("UserRole nach Login:", this.userRole);
            console.log("LocalStorage userRole:", localStorage.getItem("userRole")); // Jetzt sollte es gesetzt sein
        },


        logout() {
            this.isAuthenticated = false;
            this.user = null;
            this.userRole = null;

            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
            localStorage.removeItem('userRole');
        }
    },

    getters: {
        getIsAuthenticated: (state) => state.isAuthenticated,
        getUser: (state) => state.user,
        getUserRole: (state) => state.userRole, // Rolle des Nutzers abrufbar
    }
});

