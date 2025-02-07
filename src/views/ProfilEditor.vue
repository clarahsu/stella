<template>
  <div class="profil-container">
    <h1>Profil bearbeiten</h1>
    <div class="profil-header">
      <div class="profilbild-container">
        <img :src="editedDozentin.profilbild || defaultImage" alt="Dozent Profilbild" class="profilbild" />
        <input type="file" @change="updateProfilbild" />
        <button @click="deleteProfilbild">Profilbild löschen</button>
      </div>
      <input type="text" v-model="editedDozentin.name" placeholder="Name" />
      <input type="text" v-model="editedDozentin.pronomen" placeholder="Pronomen" />
      <input type="text" v-model="editedDozentin.fachbereich" placeholder="Fachbereich" />
      <input type="text" v-model="editedDozentin.raum" placeholder="Raum" />
      <input type="text" v-model="editedDozentin.sprechzeiten" placeholder="Sprechzeiten" />
      <input type="email" v-model="editedDozentin.email" placeholder="E-Mail" />
      <textarea v-model="editedDozentin.bemerkungen" placeholder="Bemerkungen"></textarea>
    </div>
    <button @click="speichern">Speichern</button>
  </div>
</template>

<script>
import { useNotenStore } from "@/stores/useNotenStore";
import { useRouter } from "vue-router";

export default {
  setup() {
    const notenStore = useNotenStore();
    const router = useRouter();
    const dozentin = notenStore.getDozentinById("1");
    const editedDozentin = { ...dozentin }; // Kopie des aktuellen Dozent-Objekts

    const defaultImage = 'https://th.bing.com/th/id/R.c564ae6358d40e47eb291f717bf53b56?rik=lTPuAW48qj9orQ&riu=http%3a%2f%2fwww.interiorgas.com%2fwp-content%2fuploads%2fblank-profile-picture-300x300.png&ehk=5drVIh9jSZOVq4E6%2fN3JZCmR8XCkRLOHl6%2botKIIemY%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1';

    const speichern = () => {
      notenStore.updateDozentin("1", editedDozentin); // Änderungen speichern
      router.push(`/profil/1`); // Zurück zur Profilansicht
    };

    const updateProfilbild = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          editedDozentin.profilbild = reader.result; // Profilbild aktualisieren
        };
        reader.readAsDataURL(file); // Datei in Base64 umwandeln
      }
    };

    const deleteProfilbild = () => {
      editedDozentin.profilbild = defaultImage; // Auf Standardbild zurücksetzen
    };

    return {
      editedDozentin,
      speichern,
      updateProfilbild,
      deleteProfilbild,
      defaultImage
    };
  },
};
</script>
