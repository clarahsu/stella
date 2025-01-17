<template>
  <div class="kursuebersicht-container">
    <h1>Kursübersicht</h1>
    <p>Hier findest du eine Übersicht aller verfügbaren Kurse.</p>

    <ul>
      <li v-for="(kurs, index) in sortedKurse" :key="kurs.id" class="kurs-item">
        <div @click="toggleDetails(index)" class="kurs-title">
          <h2>{{ kurs.name }}</h2>
        </div>

        <div v-if="kurs.isOpen" class="kurs-details">
          <p><strong>Kurzbeschreibung:</strong> {{ kurs.beschreibung }}</p>
          <p><strong>Modulbeschreibung:</strong> {{ kurs.modul }}</p>
          <p><strong>Dozentin:</strong> {{ kurs.dozentin }}</p>
          <p><strong>Raum:</strong> {{ kurs.raum }}</p>
          <p><strong>Termin:</strong> {{ kurs.termin }}</p>
          <p><strong>Umfang:</strong> {{ kurs.umfang }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Kursuebersicht',
  data() {
    return {
      // Liste der Kurse
      kurse: [
        { id: 1, name: 'Facetten des Merkur', beschreibung: 'SEMINAR: In diesem Kurs wird die spirituelle Vielseitigkeit des Merkur diskutiert', modul: '', dozentin: 'Freddy Mercury', raum: 'MER7', termin: 'Dienstag', umfang: '10 CP', isOpen: false },
        { id: 2, name: 'Aqua Tofana', beschreibung: 'VORLESUNG: Eine Einführung von Dr. Spumaris in die Kunst des Gitfmischens', dozentin: 'Dr. Aphrodite Spumaris', modul: '', raum: 'VEN2', termin: 'Mittwoch', umfang: '7 CP', isOpen: false },
        { id: 3, name: 'Ethik des Grauens', beschreibung: 'SEMINAR: In diesem Kurs bespricht Prof. Caesar die Abgründe der Menschheit - von Inzest bis Kannibalismus', dozentin: 'Prof. Dr. Gaia Caesar', modul: '', raum: 'ERD3', termin: 'Montag', umfang: '15 CP', isOpen: false },
        // Weitere Kurse
      ]
    };
  },
  computed: {
    // Sortiert die Kurse alphabetisch
    sortedKurse() {
      return this.kurse.sort((a, b) => a.name.localeCompare(b.name));
    }
  },
  methods: {
    // Toggle der Anzeige für die Kursdetails
    toggleDetails(index) {
      this.kurse[index].isOpen = !this.kurse[index].isOpen;
    }
  }
};
</script>

<style scoped>
.kursuebersicht-container {
  text-align: center;
  margin-top: 20px;
}

h1 {
  font-size: 2rem;
  color: #333;
}

p {
  font-size: 1.2rem;
  color: #666;
}

ul {
  list-style-type: none;
  padding: 0;
}

.kurs-item {
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

.kurs-title h2 {
  font-size: 1.5rem;
  color: #007BFF;
  margin: 0;
  cursor: pointer;
}

.kurs-details {
  margin-top: 10px;
  font-size: 1rem;
  color: #555;
}

.kurs-details p {
  margin: 5px 0;
}
</style>
