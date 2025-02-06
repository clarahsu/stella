<template>
  <div class="stundenplan-container">
    <h1>Stundenplan</h1>

    <!-- Formular zum Hinzufügen eines Termins -->
    <div class="termin-form">
      <input v-model="neuerTermin.name" placeholder="Kursname" />
      <input v-model="neuerTermin.raum" placeholder="Raum" />
      <select v-model="neuerTermin.termin">
        <option v-for="tag in wochentage" :key="tag" :value="tag">{{ tag }}</option>
      </select>
      <select v-model="neuerTermin.uhrzeit">
        <option v-for="zeit in zeitslots" :key="zeit" :value="zeit">{{ zeit }}</option>
      </select>

      <!-- Farbpicker als runder Button -->
      <div class="color-picker-wrapper">
        <input type="color" v-model="neuerTermin.farbe" class="hidden-color-picker" ref="colorInput" />
        <div
            class="color-circle"
            :style="{ backgroundColor: neuerTermin.farbe }"
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
          <!-- Kursanzeige -->
          <div v-if="isKursInSlot(tag, zeit)" class="kurs-info" :style="{ backgroundColor: getKursFarbe(tag, zeit) }">
            <p class="kurs-titel">{{ getKursInfo(tag, zeit).name }}</p>
            <p class="kurs-raum">{{ getKursInfo(tag, zeit).raum }}</p>
          </div>
        </td>
        <td class="slot">
          <div v-if="getTermineInSlot(tag, zeit).length" class="termin-container">
            <div
                v-for="kurs in getTermineInSlot(tag, zeit)"
                :key="kurs.name + kurs.termin + kurs.uhrzeit"
                class="kurs-info"
                :style="{ backgroundColor: kurs.farbe, width: `calc(100% / ${getTermineInSlot(tag, zeit).length})` }"
            >
              <p class="kurs-titel">{{ kurs.name }}</p>
              <p class="kurs-raum" v-if="kurs.raum">{{ kurs.raum }}</p>
            </div>
          </div>
        </td>

      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useKursStore } from "@/stores/useKursStore";
import { ref, computed } from "vue";

export default {
  name: "Stundenplan",
  setup() {
    const kursStore = useKursStore();
    const wochentage = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
    const zeitslots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

    // Reaktive Daten für benutzerdefinierte Termine
    const benutzerTermine = ref([]);

    // Eingabeformular für neuen Termin
    const neuerTermin = ref({
      name: "",
      raum: "",
      termin: "Montag",
      uhrzeit: "08:00",
      farbe: "#ffcc00",
    });

    const colorInput = ref(null);

    // Methode zur Farbauswahl über Klick auf Kreis
    const openColorPicker = () => {
      colorInput.value.click();
    };

    // Methoden zur Terminverwaltung
    const addTermin = () => {
      if (neuerTermin.value.name) {
        benutzerTermine.value.push({ ...neuerTermin.value });
        neuerTermin.value.name = "";
        neuerTermin.value.raum = "";
      }
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
    };
  },
};
</script>

<style scoped>
.stundenplan-container {
  text-align: center;
  margin-top: 20px;
}

h1 {
  font-size: 2rem;
  color: #333;
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
  border: 1px solid #ccc;
  border-radius: 5px;
}

.termin-form button {
  background-color: #28a745;
  color: white;
  cursor: pointer;
}

.termin-form button:hover {
  background-color: #218838;
}

/* Farbkreis für Farbauswahl */
.color-picker-wrapper {
  position: relative;
  display: flex;
  align-items: center;
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
  border: 2px solid #999;
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
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.slot {
  height: 50px;
}

.filled {
  color: white;
  font-size: 0.9rem;
}

.kurs-info {
  flex: 1;
  margin: 2px;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  font-size: 0.9rem;
}

.kurs-titel {
  font-weight: bold;
}

.kurs-raum {
  font-size: 0.85rem;
}

.termin-container {
  display: flex;
  width: 100%;
  height: 100%;
}

</style>
