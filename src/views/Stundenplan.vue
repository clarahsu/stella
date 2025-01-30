<template>
  <div class="stundenplan-container">
    <h1>Stundenplan</h1>
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
        <td
            v-for="tag in wochentage"
            :key="tag"
            :class="{ slot: true, filled: isKursInSlot(tag, zeit) }"
        >
          <!-- Wenn ein Kurs existiert, zeige Details -->
          <div v-if="isKursInSlot(tag, zeit)" class="kurs-info" :style="{ backgroundColor: getKursFarbe(tag, zeit) }">
            <p class="kurs-titel">{{ getKursInfo(tag, zeit).name }}</p>
            <p class="kurs-raum">{{ getKursInfo(tag, zeit).raum }}</p>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useKursStore } from "@/stores/useKursStore";
import { computed } from "vue";

export default {
  name: "Stundenplan",
  setup() {
    const kursStore = useKursStore(); // Zugriff auf den Kurs-Store

    // Wochentage und Zeitslots definieren
    const wochentage = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
    const zeitslots = [
      "08:00", "10:00", "12:00", "14:00", "16:00", "18:00",
    ];

    // Getter für angemeldete Kurse
    const angemeldeteKurse = computed(() => kursStore.getAngemeldeteKurse);

    // Hilfsmethoden
    const isKursInSlot = (tag, zeit) => {
      return angemeldeteKurse.value.some(
          (kurs) => kurs.termin === tag && kurs.uhrzeit === zeit
      );
    };

    const getKursInfo = (tag, zeit) => {
      return angemeldeteKurse.value.find(
          (kurs) => kurs.termin === tag && kurs.uhrzeit === zeit
      );
    };

    const getKursFarbe = (tag, zeit) => {
      const kurs = getKursInfo(tag, zeit);
      return kurs ? kurs.farbe : "transparent";
    };

    return {
      wochentage,
      zeitslots,
      isKursInSlot,
      getKursInfo,
      getKursFarbe,
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
  padding: 5px;
  border-radius: 5px;
}

.kurs-titel {
  font-weight: bold;
}

.kurs-raum {
  font-size: 0.85rem;
}
</style>
