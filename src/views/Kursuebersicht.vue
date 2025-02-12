<template>
  <div class="kursuebersicht-container">
    <h1>Kurs- und Prüfungsübersicht</h1>
    <p>Hier befindet sich eine Übersicht aller verfügbaren Kurse und Prüfungen.</p>

    <button v-if="userRole === 'dozentin'" @click="toggleFormular" class="erstellen-button">
      {{ formularOffen ? "Formular schließen" : "Kurs/Prüfung erstellen" }}
    </button>

    <div v-if="formularOffen" class="kurs-formular">
      <h2>Kurs/Prüfung erstellen</h2>
      <form @submit.prevent="erstellenKurs">
        <input v-model="neuerKurs.name" placeholder="Kurs-/Prüfungsname" required />
        <input v-model="neuerKurs.beschreibung" placeholder="Beschreibung" required />
        <input v-model="neuerKurs.raum" placeholder="Raum" required />
        <select v-model="neuerKurs.art" required>
          <option disabled value="">Bitte Art der Veranstaltung angeben</option>
          <option>Kurs</option>
          <option>Prüfung</option>
        </select>
        <select v-model="neuerKurs.termin" required>
          <option disabled value="">Bitte einen Termin wählen</option>
          <option>Montag</option>
          <option>Dienstag</option>
          <option>Mittwoch</option>
          <option>Donnerstag</option>
          <option>Freitag</option>
        </select>
        <select v-model="neuerKurs.uhrzeit" required>
          <option disabled value="">Bitte eine Uhrzeit wählen</option>
          <option>08:00</option>
          <option>10:00</option>
          <option>12:00</option>
          <option>14:00</option>
          <option>16:00</option>
          <option>18:00</option>
        </select>
        <input v-model="neuerKurs.umfang" placeholder="Umfang (Leistungspunkte)" required />
        <button type="submit" class="speichern-button">Speichern</button>
      </form>
    </div>

    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <p>Wollen Sie diesen Kurs wirklich löschen?</p>
        <button @click="deleteKurs">Löschen</button>
        <button @click="showDeleteModal = false">Abbrechen</button>
      </div>
    </div>

    <ul>
      <li v-for="kurs in sortedKurse" :key="kurs.id" class="kurs-item">
        <div class="kurs-header">
          <div @click="toggleDetails(kurs.id)" class="kurs-title">
            <h2>{{ kurs.name }}</h2>
            <span class="arrow-icon" :class="{ rotated: kurs.isOpen }">▼</span>
          </div>
          <button v-if="userRole === 'studentin'"
                  :class="isAngemeldet(kurs.id) ? 'abmelden-button' : 'anmelden-button'"
                  @click.stop="toggleAnmeldung(kurs)">
            {{ isAngemeldet(kurs.id) ? "Abmelden" : "Anmelden" }}
          </button>
          <button v-if="userRole === 'dozentin'" @click="confirmDelete(kurs.id)" class="delete-button">Löschen</button>
        </div>

        <div v-if="kurs.isOpen" class="kurs-details">
          <p><strong>Kurzbeschreibung:</strong> {{ kurs.beschreibung }}</p>
          <p><strong>Dozentin:</strong> {{ kurs.dozentin }}</p>
          <p><strong>Raum:</strong> {{ kurs.raum }}</p>
          <p><strong>Termin:</strong> {{ kurs.termin }}</p>
          <p><strong>Uhrzeit:</strong> {{ kurs.uhrzeit }}</p>
          <p v-if="kurs.umfang"><strong>Umfang:</strong> {{ kurs.umfang }} Stunden</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useKursStore } from "@/stores/useKursStore";
import { useAuthStore } from "@/stores/useAuthStore";

export default {
  name: "Kursuebersicht",
  setup() {
    const kursStore = useKursStore();
    const authStore = useAuthStore();
    const userRole = computed(() => authStore.userRole);
    const kurse = computed(() => kursStore.getAlleKurse);
    const sortedKurse = computed(() => [...kurse.value].sort((a, b) => a.name.localeCompare(b.name)));
    const formularOffen = ref(false);
    const neuerKurs = ref({ name: "", beschreibung: "", raum: "", art: "", termin: "", uhrzeit: "", umfang: "" });
    const showDeleteModal = ref(false);
    const kursToDelete = ref(null);

    const toggleFormular = () => (formularOffen.value = !formularOffen.value);
    const toggleDetails = (kursId) => {
      const kurs = kurse.value.find(k => k.id === kursId);
      if (kurs) kurs.isOpen = !kurs.isOpen;
    };
    const toggleAnmeldung = (kurs) => kursStore.isAngemeldet(kurs.id) ? kursStore.abmelden(kurs.id) : kursStore.anmelden(kurs);
    const isAngemeldet = (kursId) => kursStore.isAngemeldet(kursId);
    const erstellenKurs = () => {
      kursStore.addKurs({ id: Date.now(), ...neuerKurs.value, isOpen: false });
      neuerKurs.value = { name: "", beschreibung: "", raum: "", art: "", termin: "", uhrzeit: "", umfang: "" };
      formularOffen.value = false;
    };

    const confirmDelete = (kursId) => {
      kursToDelete.value = kursId;
      showDeleteModal.value = true;
    };

    const deleteKurs = () => {
      if (kursToDelete.value) {
        kursStore.deleteKurs(kursToDelete.value);
        kursToDelete.value = null;
      }
      showDeleteModal.value = false;
    };

    return {
      userRole,
      sortedKurse,
      neuerKurs,
      formularOffen,
      toggleFormular,
      toggleDetails,
      toggleAnmeldung,
      isAngemeldet,
      erstellenKurs,
      confirmDelete,
      deleteKurs,
      showDeleteModal
    };
  }
};
</script>



<style scoped>
.kursuebersicht-container {
  text-align: center;
  margin-top: 20px;
  margin-left: 5%;
  margin-right: 5%;
  padding-bottom: 5%; /* Platz für Footer hinzufügen */
}

h1 {
  font-size: var(--font-title);
  color: var(--text-header);
}

p {
  font-size: var(--font-medium);
  color: var(--text-muted);
}

a {
  font-size: var(--font-medium);
  color: var(--primary-color);
}

a:hover {
  color: var(--primary-hover);
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

.erstellen-button {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
}

.erstellen-button:hover {
  background-color: var(--secondary-hover);
}

.kurs-formular {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.kurs-formular input,
.kurs-formular select {
  display: block;
  width: 90%;
  margin: 10px auto;
  padding: 8px;
  font-size: 1rem; /* Gleiche Schriftgröße wie die input-Felder */
  border: 1px solid #ccc; /* Gleiche Randfarbe wie bei den input-Feldern */
  border-radius: 5px; /* Gleiche abgerundeten Ecken wie bei den input-Feldern */
  background-color: #fff; /* Weißer Hintergrund wie die Eingabefelder */
  color: var(--text-color-inv); /* Textfarbe anpassen */
  box-sizing: border-box;
}

.kurs-formular select:focus {
  outline: none;
  border-color: var(--secondary-color); /* Ändere die Randfarbe beim Fokus */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Optional: Füge einen Schlagschatten beim Fokus hinzu */
}


.speichern-button {
  background-color: var(--accent-color);
  color: var(--text-color-inv);
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
}

.speichern-button:hover {
  background-color: var(--accent-dark);
}

/* Dynamischer Button */
.anmelden-button {
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button {
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.anmelden-button:hover {
  background-color: var(--secondary-hover);
}

delete-button:hover {
  background-color: var(--secondary-hover);
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

.modal-content {
  background: var(--background-color);
  padding: 20px;
  border-radius: 10px;
  position: fixed;
  top: 20%;
  right: 35%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.modal-content button {
  display: inline-block;  /* Sorgt dafür, dass die Buttons nebeneinander stehen */
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
}

.modal-content button:first-of-type {
  background-color: #dc3545;  /* Rotes Beispiel für Löschen */
  color: white;
}

.modal-content button:last-of-type {
  background-color: #ccc;     /* Grauer Button für Abbrechen */
  color: #333;
}

</style>
