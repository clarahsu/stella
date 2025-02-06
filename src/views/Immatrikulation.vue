<template>
  <div class="wrapper">
    <div class="container">
      <h1>Immatrikulation</h1>
      <center><p>Willkommen zur Immatrikulation!<br> Bitte füllen Sie das Formular sorgfältig aus.</p></center>
      <form>
        <label for="vorname">Vorname:</label>
        <input type="text" id="vorname" name="vorname" required>

        <label for="nachname">Nachname:</label>
        <input type="text" id="nachname" name="nachname" required>

        <label for="geburtsdatum">Geburtsdatum:</label>
        <input type="date" id="geburtsdatum" name="geburtsdatum" required>

        <label for="geschlecht">Geschlecht:</label>
        <select id="geschlecht" name="geschlecht" required>
          <option value="" disabled selected>--bitte wählen--</option>
          <option value="maennlich">Männlich</option>
          <option value="weiblich">Weiblich</option>
          <option value="divers">Divers</option>
        </select>


        <label for="herkunfstplanet">Herkunftsplanet:</label>
        <input type="text" id="nationalitaet" name="nationalitaet" required>

        <label for="staatsangehoerigkeit">Staatsangehörigkeit:</label>
        <input type="text" id="staatsangehoerigkeit" name="staatsangehoerigkeit" required>

        <label for="strasse">Straße:</label>
        <input type="text" id="strasse" name="strasse" required>

        <label for="hausnummer">Hausnummer:</label>
        <input type="text" id="hausnummer" name="hausnummer" required>

        <label for="plz">PLZ:</label>
        <input type="text" id="plz" name="plz" pattern="\d{4,6}" required>

        <label for="stadt">Stadt:</label>
        <input type="text" id="stadt" name="stadt" required>

        <label for="email">E-Mail:</label>
        <input type="email" id="email" name="email" required>

        <label for="telefon">Telefonnummer:</label>
        <input type="tel" id="telefon" name="telefon" required>

        <label for="hochschulzugangsberechtigung">Hochschulzugangsberechtigung:</label>
        <select v-model="hochschulzugangsberechtigung" @change="handleChange" required>
          <option value="" disabled selected>--bitte wählen--</option>
          <option value="abitur">Abitur</option>
          <option value="fachabitur">Fachabitur</option>
          <option value="auslaendische_qualifikation">Ausländische Qualifikation</option>
          <option value="andere">Andere</option>
        </select>

        <div v-if="hochschulzugangsberechtigung === 'andere'">
          <label for="andere_qualifikation">Bitte geben Sie Ihre Qualifikation an:</label>
          <input type="text" id="andere_qualifikation" v-model="andereQualifikation" />
        </div>

        <div>
          <label for="dokumente">Zeugnisse und andere Dokumente hochladen:</label>
          <input type="file" id="dokumente" @change="handleFileUpload" multiple />
          <p v-if="fileNames.length">Ausgewählte Dateien: {{ fileNames.join(', ') }}</p>
        </div>

        <label for="studiengang">Studiengang:</label>
        <select id="studiengang" name="studiengang" required>
          <option value="" disabled selected>--bitte wählen--</option>
          <option value="interstellare_kommunikation">Interstellare Kommunikation</option>
          <option value="planetare_geschichte">Planetare Geschichte</option>
          <option value="futuristische_informatik">Futuristische Informatik</option>
        </select>
        <br>
        <button type="submit">Immatrikulieren</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Immatrikulation",
  data() {
    return {
      hochschulzugangsberechtigung: '',
      andereQualifikation: '',
      files: [],
      fileNames: []
    };
  },
  methods: {
    handleChange() {
    },
    handleFileUpload(event) {
      const selectedFiles = event.target.files;
      this.files = Array.from(selectedFiles);
      this.fileNames = this.files.map(file => file.name);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 20px 0; /* Abstand oben und unten */
  background-color: #f4f4f4;
  box-sizing: border-box;
}


.container {
  background: white;
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;
}

input, select, button {
  width: 100%; /* Alle Elemente gleich lang */
  padding: 10px; /* Einheitlicher Innenabstand */
  margin: 5px 0; /* Gleichmäßiger Abstand */
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Verhindert, dass Padding/Borders die Größe ändern */
  display: block; /* Stellt sicher, dass jedes Element eine eigene Zeile bekommt */
}

button {
  background: #28a745;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background: #218838;
}


input[type="file"] {
  margin-top: 5px;
}

p {
  font-size: 14px;
  color: #555;
}
</style>