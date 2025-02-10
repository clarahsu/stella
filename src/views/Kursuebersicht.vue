<template>
  <div class="kursuebersicht-container">
    <h1>Kurs- und Prüfungsübersicht</h1>
    <p>Hier befindet sich eine Übersicht aller verfügbaren Kurse und Prüfungen.</p>

    <!-- Button zum Öffnen des Formulars -->
    <button v-if="userRole === 'dozentin'" @click="toggleFormular" class="erstellen-button">
      {{ formularOffen ? "Formular schließen" : "Kurs/Prüfung erstellen" }}
    </button>

    <!-- Formular für die Kurserstellung -->
    <div v-if="formularOffen" class="kurs-formular">
      <h2>Kurs erstellen</h2>
      <input v-model="neuerKurs.name" placeholder="Kurs-/Prüfungsname" />
      <input v-model="neuerKurs.beschreibung" placeholder="Beschreibung" />
      <input v-model="neuerKurs.dozentin" placeholder="Dozentin" />
      <input v-model="neuerKurs.raum" placeholder="Raum" />

      <!-- Auswahl für Termin -->
      <select v-model="neuerKurs.termin">
        <option disabled value="">Bitte einen Termin wählen</option>
        <option>Montag</option>
        <option>Dienstag</option>
        <option>Mittwoch</option>
        <option>Donnerstag</option>
        <option>Freitag</option>
      </select>

      <!-- Auswahl für Uhrzeit -->
      <select v-model="neuerKurs.uhrzeit">
        <option disabled value="">Bitte eine Uhrzeit wählen</option>
        <option>08:00</option>
        <option>10:00</option>
        <option>12:00</option>
        <option>14:00</option>
        <option>16:00</option>
        <option>18:00</option>
      </select>

      <input v-model="neuerKurs.umfang" placeholder="Umfang (Leistungspunkte)" />
      <button @click="erstellenKurs" class="speichern-button">Speichern</button>
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
          <p><strong>Uhrzeit:</strong> {{ kurs.uhrzeit }}</p>
          <p><strong>Umfang:</strong> {{ kurs.umfang }} Stunden</p>
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
    const formularOffen = ref(false);

    const sortedKurse = computed(() =>
        [...kurse.value].sort((a, b) => a.name.localeCompare(b.name))
    );

    const toggleDetails = (kursId) => {
      // Prüfen, ob das Array existiert und befüllt ist
      if (!kurse.value || kurse.value.length === 0) {
        console.error("Kursliste ist nicht definiert oder leer!");
        return;
      }

      // Den Kurs anhand der ID finden
      const kursIndex = kurse.value.findIndex(k => k.id === kursId);

      // Falls der Kurs nicht gefunden wurde, Fehler ausgeben
      if (kursIndex === -1) {
        console.error(`Kurs mit ID ${kursId} nicht gefunden!`);
        return;
      }

      // isOpen umschalten
      kurse.value[kursIndex].isOpen = !kurse.value[kursIndex].isOpen;
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

    // Neues Kurs-Objekt
    const neuerKurs = ref({
      name: "",
      beschreibung: "",
      dozentin: authStore.user, // Automatische Zuweisung der Dozentin
      raum: "",
      termin: "",
      uhrzeit: "",
      umfang: "",
    });

    // Kursformular ein-/ausblenden
    const toggleFormular = () => {
      formularOffen.value = !formularOffen.value;
    };

    // Kurs erstellen
    const erstellenKurs = () => {
      if (neuerKurs.value.name) {
        kursStore.addKurs({
          id: Date.now(),
          name: neuerKurs.value.name,
          beschreibung: neuerKurs.value.beschreibung,
          dozentin: neuerKurs.value.dozentin || "Unbekannt",
          raum: neuerKurs.value.raum,
          termin: neuerKurs.value.termin,
          uhrzeit: neuerKurs.value.uhrzeit,
          umfang: neuerKurs.value.umfang,
          isOpen: false,
        });

        neuerKurs.value = {
          name: "",
          beschreibung: "",
          dozentin: authStore.user,
          raum: "",
          termin: "",
          uhrzeit: "",
          umfang: "",
        };

        formularOffen.value = false;
      }
    };

    return {
      kurse,
      sortedKurse,
      userRole,
      neuerKurs,
      formularOffen,
      toggleFormular,
      erstellenKurs,
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
  padding-bottom: 5%; /* Platz für Footer hinzufügen */
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

.anmelden-button:hover {
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
</style>
