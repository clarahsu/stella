<template>
  <div class="noten-uebersicht-container">
    <h1>Notenübersicht</h1>
    <table>
      <thead>
        <tr>
          <th>Modul</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="modul in notenStore.module" :key="modul.id">
          <td>{{ modul.name }}</td>
          <td>{{ getNote(modul.id) }}</td>
        </tr>
      </tbody>
    </table>
    
    <a href="https://example.com/path/to/your/Notenuebersicht.pdf" target="_blank">
      <button class="print-button">🖨️</button>
    </a>
  </div>
</template>

<script>
import { useNotenStore } from "@/stores/useNotenStore";

export default {
  computed: {
    notenStore() {
      return useNotenStore();
    },
    student() {
      return this.notenStore.studierende.find(
        (s) => s.name === "space-studentin"
      );
    },
  },
  methods: {
    getNote(modulId) {
      if (this.student) {
        return this.notenStore.getNotenVonMatrikel(this.student.matrikelnummer)[modulId] || "Keine Note";
      }
      return "Keine Note";
    },
  },
};
</script>


<style scoped>
@import "@/assets/styles.css";

body {
  font-family: Arial, sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  margin: 0;
  padding: 0;
}

.noten-uebersicht-container {
  width: 80%;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: var(--background-light);
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

h1 {
  font-size: var(--font-title);
  color: var(--text-header);
  text-align: center;
}

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
}

th, td {
  padding: 12px;
  border: 1px solid var(--secondary-color);
  text-align: center;
  font-size: var(--font-medium);
}

th {
  background: var(--primary-color);
  color: white;
}

td {
  background: var(--background-light);
}

.print-button {
  font-size: 18px;
  padding: 10px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: background 0.3s ease;
}

.print-button:hover {
  background-color: var(--accent-dark);
}

@media (max-width: 600px) {
  .noten-uebersicht-container {
    width: 90%;
    padding: 15px;
  }
  
  table {
    font-size: var(--font-small);
  }

  .print-button {
    top: 5px;
    right: 5px;
    padding: 8px;
  }
}
</style>
