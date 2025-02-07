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
    dozentinnen: [
      {
        id: "1",
        name: "Space Dozentin",
        pronomen: "sie/ihr",
        fachbereich: "Astronomie",
        raum: "Sternenlabor 42",
        sprechzeiten: "Mo 14-16 Uhr",
        email: "space-dozentin@uni.example",
        profilbild: null, // initial auf null setzen
        farbe: "#f4f4f4",
      },
    ],
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
    updateDozentin(id, data) {
      const dozentinIndex = this.dozentinnen.findIndex(d => d.id === id);
      if (dozentinIndex !== -1) {
        this.dozentinnen[dozentinIndex] = { ...this.dozentinnen[dozentinIndex], ...data };
      }
    },
    getDozentinById(id) {
      return this.dozentinnen.find(d => d.id === id);
    },
    updateProfilbild(id, newImage) {
      const dozentinIndex = this.dozentinnen.findIndex(d => d.id === id);
      if (dozentinIndex !== -1) {
        this.dozentinnen[dozentinIndex].profilbild = newImage;
      }
    },
    deleteProfilbild(id) {
      const dozentinIndex = this.dozentinnen.findIndex(d => d.id === id);
      if (dozentinIndex !== -1) {
        this.dozentinnen[dozentinIndex].profilbild =
          'https://th.bing.com/th/id/R.c564ae6358d40e47eb291f717bf53b56?rik=lTPuAW48qj9orQ&riu=http%3a%2f%2fwww.interiorgas.com%2fwp-content%2fuploads%2fblank-profile-picture-300x300.png&ehk=5drVIh9jSZOVq4E6%2fN3JZCmR8XCkRLOHl6%2botKIIemY%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'; // Externes Bild zurücksetzen
      }
    },
  },
});

