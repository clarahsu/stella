<template>
  <div class="stundenplan-container">
    <h1>Stundenplan</h1>

    <!-- Formular zum Hinzufügen eines Termins -->
    <div class="termin-form">
      <input v-model="neuerTermin.name" placeholder="Termin" @keyup.enter="addTermin"/>
      <input v-model="neuerTermin.raum" placeholder="Raum" @keyup.enter="addTermin"/>
      <select v-model="neuerTermin.termin" @keyup.enter="addTermin">
        <option v-for="tag in wochentage" :key="tag" :value="tag">{{ tag }}</option>
      </select>
      <select v-model="neuerTermin.uhrzeit" @keyup.enter="addTermin">
        <option v-for="zeit in zeitslots" :key="zeit" :value="zeit">{{ zeit }}</option>
      </select>

      <!-- Farbpicker als runder Button -->
      <div class="color-picker-wrapper">
        <input ref="colorInput" v-model="neuerTermin.farbe" class="hidden-color-picker" type="color"/>
        <div
            :style="{ backgroundColor: neuerTermin.farbe }"
            class="color-circle"
            @click="openColorPicker"
        ></div>
      </div>

      <button @click="addTermin">Termin hinzufügen</button>
    </div>

    <!-- Stundenplan-Tabelle -->
    <table class="stundenplan">
      <thead>
      <tr>
        <th>Uhrzeit</th>
        <th v-for="tag in wochentage" :key="tag">{{ tag }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="zeit in zeitslots" :key="zeit">
        <td>{{ zeit }}</td>
        <td v-for="tag in wochentage" :key="tag" :class="{ slot: true, filled: isKursInSlot(tag, zeit) }">
          <div v-if="getTermineInSlot(tag, zeit).length" class="termin-container">
            <div
                v-for="kurs in getTermineInSlot(tag, zeit)"
                :key="kurs.name + kurs.termin + kurs.uhrzeit"
                class="kurs-info"
                :class="{ clickable: kurs.manuell }"
            :style="{ backgroundColor: kurs.farbe, width: `calc(100% / ${getTermineInSlot(tag, zeit).length})` }"
            @click="kurs.manuell && editTermin(kurs)"
            >
            <div class="kurs-header-inline">
              <p class="kurs-titel">{{ truncateText(kurs.name) }}</p>
            </div>
            <p class="kurs-raum">{{ kurs.raum }}</p>
          </div>
        </div>
      </td>


  </tr>
  </tbody>
  </table>

  <!-- Popup für Löschen -->
  <div v-if="selectedTermin" class="popup">
    <h3>Diesen Termin löschen?</h3>
    <button @click="deleteTermin">Löschen</button>
    <button @click="closePopup">Abbrechen</button>
  </div>


  </div>
</template>

<script>
import {useKursStore} from "@/stores/useKursStore";
import {ref, computed} from "vue";

export default {
  name: "Stundenplan",
  setup() {
    const kursStore = useKursStore();
    const wochentage = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
    const zeitslots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

    const selectedTermin = ref(null);
    const editTermin = (kurs) => {
      selectedTermin.value = {...kurs}; // Kopie des Objekts zur Bearbeitung
    };

    const benutzerTermine = ref([]);
    const neuerTermin = ref({
      name: "",
      raum: "",
      termin: "Montag",
      uhrzeit: "08:00",
      farbe: "#ffcc00",
    });

    const colorInput = ref(null);

    const openColorPicker = () => {
      colorInput.value.click();
    };

    const addTermin = () => {
      if (neuerTermin.value.name) {
        benutzerTermine.value.push({...neuerTermin.value, manuell: true});
        neuerTermin.value.name = "";
        neuerTermin.value.raum = "";
      }
    };

    const deleteTermin = () => {
      benutzerTermine.value = benutzerTermine.value.filter(
          (t) => !(t.name === selectedTermin.value.name &&
              t.termin === selectedTermin.value.termin &&
              t.uhrzeit === selectedTermin.value.uhrzeit)
      );
      closePopup();
    };

    // Schließt das Bearbeitungs-/Lösch-Popup
    const closePopup = () => {
      selectedTermin.value = null;
    };

    const isKursInSlot = (tag, zeit) => {
      return (
          benutzerTermine.value.some((termin) => termin.termin === tag && termin.uhrzeit === zeit) ||
          kursStore.getAngemeldeteKurse.some((kurs) => kurs.termin === tag && kurs.uhrzeit === zeit)
      );
    };

    const getKursInfo = (tag, zeit) => {
      return (
          benutzerTermine.value.find((termin) => termin.termin === tag && termin.uhrzeit === zeit) ||
          kursStore.getAngemeldeteKurse.find((kurs) => kurs.termin === tag && kurs.uhrzeit === zeit)
      );
    };

    const getKursFarbe = (tag, zeit) => {
      const kurs = getKursInfo(tag, zeit);
      return kurs ? kurs.farbe : "transparent";
    };

    const getTermineInSlot = (tag, zeit) => {
      return [
        ...benutzerTermine.value.filter(termin => termin.termin === tag && termin.uhrzeit === zeit),
        ...kursStore.getAngemeldeteKurse.filter(kurs => kurs.termin === tag && kurs.uhrzeit === zeit),
      ];
    };

    const saveTermin = () => {
      const index = benutzerTermine.value.findIndex(
          (t) => t.name === selectedTermin.value.name && t.termin === selectedTermin.value.termin && t.uhrzeit === selectedTermin.value.uhrzeit
      );
      if (index !== -1) {
        benutzerTermine.value[index].name = selectedTermin.value.name;
        benutzerTermine.value[index].raum = selectedTermin.value.raum;
        benutzerTermine.value[index].farbe = selectedTermin.value.farbe;
      }
      closePopup();
    };

    // Methode zum Abkürzen des Titels mit "..."
    const truncateText = (text) => {
      const maxLength = 20; // Maximale Länge des Titels
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    };

    return {
      wochentage,
      zeitslots,
      neuerTermin,
      benutzerTermine,
      addTermin,
      isKursInSlot,
      getKursInfo,
      getKursFarbe,
      getTermineInSlot,
      colorInput,
      openColorPicker,
      selectedTermin,
      editTermin,
      saveTermin,
      deleteTermin,
      closePopup,
      truncateText
    };
  },
};
</script>

<style scoped>
.stundenplan-container {
  text-align: center;
  margin: 20px;
  padding-bottom: 80px;
}

h1 {
  font-size: var(--font-title);
  color: var(--text-header);
  margin-bottom: 20px;
}

/* Formular-Styling */
.termin-form {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.termin-form input,
.termin-form select,
.termin-form button {
  padding: 8px;
  border: 1px solid var(--text-muted);
  border-radius: 5px;
}

.termin-form button {
  background-color: var(--secondary-color);
  color: var(--text-color);
  cursor: pointer;
}

.termin-form button:hover {
  background-color: var(--secondary-hover);
}

/* Farbkreis für Farbauswahl */
.color-picker-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: var(--text-muted);
}

.hidden-color-picker {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}

.color-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid var(--background-color);
  cursor: pointer;
  display: inline-block;
}

/* Stundenplan-Styling */
.stundenplan {
  width: 100%;
  border-collapse: collapse;
}

.stundenplan th,
.stundenplan td {
  border: 1px solid var(--text-header);
  padding: 10px;
  text-align: center;
  width: 120px; /* Feste Spaltenbreite */
}

.slot {
  height: 50px;
}

.filled {
  color: var(--background-color);
  font-size: var(--font-medium);
}

.kurs-info {
  flex: 1;
  margin: 2px;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  font-size: var(--font-medium);
}

.kurs-titel {
  font-weight: bold;
  overflow: hidden; /* Verhindert, dass der Text über das Element hinausgeht */
  text-overflow: ellipsis; /* Zeigt "..." an */
  max-width: 100%; /* Maximale Breite für den Text */
}

.kurs-raum {
  font-size: var(--font-small);
}

.termin-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.popup {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 300px;           /* Popup-Breite */
  text-align: center;     /* Zentriert den Text */
}

.popup h3 {
  margin: 0 0 20px;       /* Kein oberer Rand, 20px Abstand nach unten */
}

.popup button {
  display: inline-block;  /* Sorgt dafür, dass die Buttons nebeneinander stehen */
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;          /* Horizontale Abstände zwischen den Buttons */
}

/* Spezifische Styles für den Löschen-Button */
.popup button:first-of-type {
  background-color: #dc3545;  /* Rotes Beispiel für Löschen */
  color: white;
}

/* Spezifische Styles für den Abbrechen-Button */
.popup button:last-of-type {
  background-color: #ccc;     /* Grauer Button für Abbrechen */
  color: #333;
}


</style>
