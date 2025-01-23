<template>
  <div class="kursuebersicht-container">
    <h1>Kursübersicht</h1>
    <p>Hier findest du eine Übersicht aller verfügbaren Kurse.</p>

    <ul>
      <li v-for="kurs in sortedKurse" :key="kurs.id" class="kurs-item">
        <!-- Kurs-Titel und dynamischer Button -->
        <div class="kurs-header">
          <div @click="toggleDetails(kurs.id)" class="kurs-title">
            <h2>{{ kurs.name }}</h2>
            <!-- Pfeil-Icon -->
            <span class="arrow-icon" :class="{ rotated: kurs.isOpen }">▼</span>
          </div>
          <button
              :class="isAngemeldet(kurs.id) ? 'abmelden-button' : 'anmelden-button'"
              @click.stop="toggleAnmeldung(kurs)"
          >
            {{ isAngemeldet(kurs.id) ? "Abmelden" : "Anmelden" }}
          </button>
        </div>

        <!-- Kursdetails -->
        <div v-if="kurs.isOpen" class="kurs-details">
          <p><strong>Kurzbeschreibung:</strong> {{ kurs.beschreibung }}</p>
          <p><strong>Dozentin:</strong> {{ kurs.dozentin }}</p>
          <p><strong>Raum:</strong> {{ kurs.raum }}</p>
          <p><strong>Termin:</strong> {{ kurs.termin }}</p>
          <p><strong>Umfang:</strong> {{ kurs.umfang }}</p>
          <p>
            <a
                v-if="kurs.modulbeschreibung"
                :href="kurs.modulbeschreibung"
                target="_blank"
                class="modul-link"
            >
              Modulbeschreibung
            </a>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useKursStore } from "@/stores/useKursStore";

export default {
  name: "Kursuebersicht",
  setup() {
    const kursStore = useKursStore(); // Zugriff auf den Kurs-Store

    const kurse = computed(() => kursStore.getAlleKurse); // Alle verfügbaren Kurse
    const sortedKurse = computed(() =>
        [...kurse.value].sort((a, b) => a.name.localeCompare(b.name))
    ); // Alphabetisch sortiert

    // Methoden
    const toggleDetails = (kursId) => {
      const kurs = kurse.value.find(k => k.id === kursId);
      if (kurs) {
        kurs.isOpen = !kurs.isOpen;
      }
    };

    const toggleAnmeldung = (kurs) => {
      if (kursStore.isAngemeldet(kurs.id)) {
        kursStore.abmelden(kurs.id);
        alert(`Du hast dich vom Kurs "${kurs.name}" abgemeldet.`);
      } else {
        kursStore.anmelden(kurs);
        alert(`Du hast dich für den Kurs "${kurs.name}" angemeldet.`);
      }
    };

    const isAngemeldet = (kursId) => kursStore.isAngemeldet(kursId);

    return {
      kurse,
      sortedKurse,
      toggleDetails,
      toggleAnmeldung,
      isAngemeldet,
    };
  },
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
  text-align: left;
}

.kurs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.kurs-title {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.kurs-title h2 {
  font-size: 1.5rem;
  color: #007BFF;
  margin: 0;
}

.arrow-icon {
  font-size: 1.2rem;
  margin-left: 10px;
  transition: transform 0.3s ease;
}

.arrow-icon.rotated {
  transform: rotate(180deg);
}

.kurs-details {
  margin-top: 10px;
  font-size: 1rem;
  color: #555;
}

.kurs-details p {
  margin: 5px 0;
}

/* Dynamischer Button */
.anmelden-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.anmelden-button:hover {
  background-color: #218838;
}

.abmelden-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.abmelden-button:hover {
  background-color: #c82333;
}
</style>
