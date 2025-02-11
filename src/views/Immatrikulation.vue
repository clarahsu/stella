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
  background-color: var(--background-color);
  box-sizing: border-box;
}

.container {
  background: var(--background-color);
  text-align: left;
  display: flex;
  padding-bottom: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input, select, button {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid var(--secondary-color);
  border-radius: 5px;
  box-sizing: border-box;
  display: block;
  font-size: var(--font-medium);
}

button {
  background: var(--accent-color);
  color: var(--text-color-inv);
  border: var(--accent-color);
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: var(--accent-dark);
}


input[type="file"] {
  margin-top: 5px;
}

p {
  font-size: var(--font-small);
  color: var(--text-header);
}
</style>