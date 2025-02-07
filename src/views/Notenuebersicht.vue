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
    <!-- Button with printer icon -->
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
    // Retrieve the grades for "space-studentin" from the store
    student() {
      return this.notenStore.studierende.find(
        (s) => s.name === "space-studentin"
      );
    },
  },
  methods: {
    // Get the grade for the given module
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
  color: var(--text-color-inv);
  margin: 0;
  padding: 0;
}

.noten-uebersicht-container {
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
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
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: center;
}

.print-button {
  font-size: 16px;
  padding: 6px 8px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  position: absolute;
  top: 10px;
  right: 10px;
}

.print-button:hover {
  background-color: var(--accent-dark);
}

@media (max-width: 600px) {
  .noten-uebersicht-container {
    width: 90%;
  }
}
</style>
