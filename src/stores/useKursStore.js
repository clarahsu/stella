import { defineStore } from "pinia";

export const useKursStore = defineStore("kursStore", {
    state: () => ({
        angemeldeteKurse: [], // Liste der angemeldeten Kurse
        teilnehmerListen: {},
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
                modulbeschreibung: "https://example.com/dummy2.pdf",
                teilnehmer: [] // Teilnehmerliste hinzugefügt
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
                modulbeschreibung: "https://example.com/dummy2.pdf",
                teilnehmer: []
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
                modulbeschreibung: "https://example.com/dummy2.pdf",
                teilnehmer: []
            },
            {
                id: 4,
                name: "Alte Geschichte - Prüfung",
                beschreibung: "Klausur",
                dozentin: "Dr. Michael Fischer",
                raum: "Raum: GRE423",
                termin: "Montag",
                uhrzeit: "10:00",
                farbe: "#f39c12",
                teilnehmer: []
            },
            {
                id: 5,
                name: "Weltraumkulturen - Prüfung",
                beschreibung: "Portfolio",
                dozentin: "Dr. Ellen Hurt",
                raum: "NTM5",
                termin: "Donnerstag",
                uhrzeit: "12:00",
                farbe: "#3498db",
                teilnehmer: []
            },
            {
                id: 6,
                name: "Marsianische Linguistik - Prüfung",
                beschreibung: "Mündliche Prüfung",
                dozentin: "Dr. Dallas Skerritt",
                raum: "MAR306",
                termin: "Montag",
                uhrzeit: "14:00",
                farbe: "#e74c3c",
                teilnehmer: []
            },
        ],
    }),

    actions: {
        // Kurs anmelden
        anmelden(kurs) {
            if (!this.angemeldeteKurse.find((k) => k.id === kurs.id)) {
                this.angemeldeteKurse.push(kurs);
                this.addTeilnehmer(kurs.id, "space-studentin"); // Füge space-studentin zur Teilnehmerliste hinzu
            }
        },

        // Kurs abmelden
        abmelden(kursId) {
            this.angemeldeteKurse = this.angemeldeteKurse.filter((k) => k.id !== kursId);
            this.removeTeilnehmer(kursId, "space-studentin"); // Entferne space-studentin aus der Teilnehmerliste
        },

        // Prüfen, ob man in einem Kurs angemeldet ist
        isAngemeldet(kursId) {
            return this.angemeldeteKurse.some((k) => k.id === kursId);
        },

        // Teilnehmer zu einem Kurs hinzufügen
        addTeilnehmer(kursId, student) {
            const kurs = this.alleKurse.find(k => k.id === kursId);
            if (kurs && !kurs.teilnehmer.includes(student)) {
                kurs.teilnehmer.push(student);
            }
        },

        // Teilnehmer aus einem Kurs entfernen
        removeTeilnehmer(kursId, student) {
            const kurs = this.alleKurse.find(k => k.id === kursId);
            if (kurs) {
                kurs.teilnehmer = kurs.teilnehmer.filter(t => t !== student);
            }
        },

        // Neuen Kurs erstellen
        addKurs(kurs) {
            if (!this.alleKurse) {
                this.alleKurse = []; // Falls `alleKurse` nicht existiert, initialisiere es
            }
            kurs.teilnehmer = []; // Stelle sicher, dass jeder neue Kurs eine Teilnehmerliste hat
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

        // Gibt die Teilnehmer eines bestimmten Kurses zurück
        getTeilnehmer: (state) => (kursId) => {
            const kurs = state.alleKurse.find(k => k.id === kursId);
            return kurs ? kurs.teilnehmer : [];
        }
    },
});
