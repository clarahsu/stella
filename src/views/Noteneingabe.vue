<template>
    <div class="noten-eingabe-container">
      <h1>Noteneingabe</h1>
  
      <div v-if="schritt === 1">
        <select v-model="ausgewaehltesModul">
          <option disabled value="">Modul wählen</option>
          <option v-for="modul in moduleListe" :key="modul.id" :value="modul.id">
            {{ modul.name }}
          </option>
        </select>
        <button @click="weiter(2)" :disabled="!ausgewaehltesModul">Weiter</button>
      </div>
  
    
      <div v-if="schritt === 2">
        <select v-model="ausgewaehlteMatrikelnummer">
          <option disabled value="">Matrikelnummer wählen</option>
          <option
            v-for="student in gefilterteStudierende"
            :key="student.matrikelnummer"
            :value="student.matrikelnummer"
          >
            {{ student.matrikelnummer }}
          </option>
        </select>
        <button @click="weiter(3)" :disabled="!ausgewaehlteMatrikelnummer">
          Weiter
        </button>
      </div>
  
      <div v-if="schritt === 3">
        <select v-model="eingabeNote">
          <option disabled value="">Note wählen</option>
          <option v-for="note in erlaubteNoten" :key="note" :value="note">
            {{ note }}
          </option>
        </select>
        <button @click="weiter(4)" :disabled="!eingabeNote">Weiter</button>
      </div>
  
      <div v-if="schritt === 4" class="bestaetigungs-dialog">
        <p><strong>Modul:</strong> {{ ausgewaehltesModulName }}</p>
        <p><strong>Matrikelnummer:</strong> {{ ausgewaehlteMatrikelnummer }}</p>
        <p><strong>Note:</strong> {{ eingabeNote }}</p>
        <p>Möchten Sie die Note speichern?</p>
        <button @click="speichereNote">Ja</button>
        <button @click="schritt = 3">Abbrechen</button>
      </div>
    </div>
  </template>
  
  

  <script>
  import { useNotenStore } from "@/stores/useNotenStore";
  
  export default {
    data() {
      return {
        schritt: 1,
        ausgewaehltesModul: "",
        ausgewaehlteMatrikelnummer: "",
        eingabeNote: "",
        suchbegriff: "",
        erlaubteNoten: ["1,0", "1,3", "1,7", "2,0", "2,3", "2,7", "3,0", "3,3", "3,7", "4,0", "5,0"],
      };
    },
    computed: {
      notenStore() {
        return useNotenStore();
      },
      moduleListe() {
        return this.notenStore.module;
      },
      studierendeListe() {
        return this.notenStore.studierende;
      },
      gefilterteStudierende() {
        return this.studierendeListe.filter((s) =>
          s.matrikelnummer.includes(this.suchbegriff)
        );
      },
      ausgewaehltesModulName() {
        const modul = this.moduleListe.find((m) => m.id === this.ausgewaehltesModul);
        return modul ? modul.name : "";
      },
    },
    methods: {
      weiter(nextStep) {
        this.schritt = nextStep;
      },
      speichereNote() {
        this.notenStore.setNote(this.ausgewaehltesModul, this.ausgewaehlteMatrikelnummer, this.eingabeNote);
        alert("Note gespeichert!");
        this.schritt = 1; 
        this.ausgewaehltesModul = "";
        this.ausgewaehlteMatrikelnummer = "";
        this.eingabeNote = "";
        this.suchbegriff = "";
      },
    },
  };
  </script>
 
<style scoped>
@import "@/assets/styles.css";

body {
  background-color: var(--background-color);
  color: var(--text-color);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.noten-eingabe-container {
  width: 50%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 5%;
  background: var(--background-light);
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
    font-size: var(--font-title);
    color: var(--text-header);
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

th, td {
    padding: 10px;
    border: 1px solid var(--secondary-color);
    text-align: center;
}

select, input {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--secondary-color);
    border-radius: 6px;
    font-size: var(--font-medium);
}

button {
    padding: 10px 14px;
    background: var(--accent-color);
    color: var(--text-color-inv);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: var(--font-medium);
    transition: background 0.3s ease;
    margin: 5px;
}

button:hover {
    background: var(--accent-dark);
}

.centered-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--background-light);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 400px;
}

.button-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

@media (max-width: 600px) {
    .noten-eingabe-container {
        width: 90%;
    }

    .centered-box {
        width: 90%;
    }
}

</style>
