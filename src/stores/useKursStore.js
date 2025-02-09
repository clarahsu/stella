import { defineStore } from "pinia";

export const useKursStore = defineStore("kursStore", {
    state: () => ({
        angemeldeteKurse: [], // Liste der angemeldeten Kurse
        alleKurse: [ // Beispielkurse
            {
                id: 1,
                name: "Alte Geschichte",
                beschreibung: "VORLESUNG: Eine Einführung von Dr. Fischer in die Marsianische Linguistik",
                dozentin: "Dr. Michael Fischer",
                raum: "Raum: GRE423",
                termin: "Montag",
                uhrzeit: "10:00",
                umfang: "10 CP",
                farbe: "#f39c12",
            },
            {
                id: 2,
                name: "Weltraumkulturen",
                beschreibung: "VORLESUNG: Eine Einführung von Dr. Hurt in die Weltraumkulturen",
                dozentin: "Dr. Ellen Hurt",
                raum: "NTM5",
                termin: "Donnerstag",
                uhrzeit: "12:00",
                umfang: "7 CP",
                farbe: "#3498db",
            },
            {
                id: 3,
                name: "Marsianische Linguistik",
                beschreibung: "VORLESUNG: Eine Einführung von Dr. Skerritt in die Marsianische Linguistik",
                dozentin: "Dr. Dallas Skerritt",
                raum: "MAR306",
                termin: "Montag",
                uhrzeit: "14:00",
                umfang: "10 CP",
                farbe: "#e74c3c",
            },
        ],
    }),

    actions: {
        // Kurs anmelden
        anmelden(kurs) {
            if (!this.angemeldeteKurse.find((k) => k.id === kurs.id)) {
                this.angemeldeteKurse.push(kurs);
            }
        },

        // Kurs abmelden
        abmelden(kursId) {
            this.angemeldeteKurse = this.angemeldeteKurse.filter((k) => k.id !== kursId);
        },

        // Prüfen, ob man in einem Kurs angemeldet ist
        isAngemeldet(kursId) {
            return this.angemeldeteKurse.some((k) => k.id === kursId);
        },

        // Neuen Kurs erstellen
        addKurs(kurs) {
            if (!this.alleKurse) {
                this.alleKurse = []; // Falls `alleKurse` nicht existiert, initialisiere es
            }
            this.alleKurse.push(kurs);
            console.log("📌 Neuer Kurs wurde gespeichert:", kurs);
            console.log("📌 Alle Kurse nach Speichern:", this.alleKurse);
        },

    },

    getters: {
        // Gibt die angemeldeten Kurse zurück
        getAngemeldeteKurse: (state) => state.angemeldeteKurse,

        // Gibt alle Kurse zurück
        getAlleKurse: (state) => state.alleKurse,
    },
});
