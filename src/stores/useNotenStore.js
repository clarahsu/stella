import { defineStore } from "pinia";

export const useNotenStore = defineStore("noten", {
  state: () => ({
    module: [
      { id: "1", name: "Lunare Mathematik" },
      { id: "2", name: "Futuristische Informatik" },
      { id: "3", name: "Astrophysik" },
      { id: "4", name: "Alte Geschichte" },
      { id: "5", name: "Marsianische Linguistik" },
      { id: "6", name: "Weltraumkulturen" },
    ],
    studierende: [
      { matrikelnummer: "12345678", name: "space-studentin" },
      { matrikelnummer: "87654321", name: "Max Mustermann" },
    ],
    noten: {},
  }),
  actions: {
    setNote(modulId, matrikelnummer, note) {
      if (!this.noten[matrikelnummer]) {
        this.noten[matrikelnummer] = {};
      }
      this.noten[matrikelnummer][modulId] = note;
    },
    getNotenVonMatrikel(matrikelnummer) {
      return this.noten[matrikelnummer] || {};
    },
  },
});
