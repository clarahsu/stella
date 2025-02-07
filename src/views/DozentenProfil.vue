<template>
  <div class="profil-container">
    <div class="profil-header">
      <img :src="dozentin.profilbild || defaultImage" alt="Dozent Profilbild" class="profilbild" />
      <h1>{{ dozentin.name }}</h1>
      <p><strong>Pronomen:</strong> {{ dozentin.pronomen }}</p>
      <p><strong>Fachbereich:</strong> {{ dozentin.fachbereich }}</p>
      <p><strong>Raum:</strong> {{ dozentin.raum }}</p>
      <p><strong>Sprechzeiten:</strong> {{ dozentin.sprechzeiten }}</p>
      <p><strong>Email:</strong> <a :href="'mailto:' + dozentin.email">{{ dozentin.email }}</a></p>

      <div v-if="dozentin.bemerkungen">
        <h3>Zusätzliche Informationen</h3>
        <p>{{ dozentin.bemerkungen }}</p>
      </div>
    </div>

    <button class="kontaktieren" @click="kontaktieren">Kontaktieren</button>
    <button class="bearbeiten" @click="bearbeiten">Profil bearbeiten</button>
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

    const defaultImage = 'https://th.bing.com/th/id/R.c564ae6358d40e47eb291f717bf53b56?rik=lTPuAW48qj9orQ&riu=http%3a%2f%2fwww.interiorgas.com%2fwp-content%2fuploads%2fblank-profile-picture-300x300.png&ehk=5drVIh9jSZOVq4E6%2fN3JZCmR8XCkRLOHl6%2botKIIemY%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1';

    const kontaktieren = () => {
      window.location.href = "mailto:" + dozentin.email;
    };

    const bearbeiten = () => {
      router.push("/profil/1/edit"); // Weiterleitung zur Bearbeitungsseite
    };

    return {
      dozentin,
      kontaktieren,
      bearbeiten,
      defaultImage
    };
  },
};
</script>

<style scoped>
.profil-container {
  background-color: var(--background-color);
  color: var(--text-color-inv);
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profil-header {
  text-align: center;
}

.profilbild {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 15px;
  object-fit: cover;
}

h1 {
  font-size: var(--font-title);
  color: var(--text-header);
}

p {
  font-size: var(--font-medium);
  color: var(--text-color-inv);
  margin: 5px 0;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: var(--font-medium);
  margin-top: 10px;
  width: 100%;
}

button.kontaktieren {
  background-color: var(--primary-color);
  color: white;
}

button.kontaktieren:hover {
  background-color: var(--accent-dark);
}

button.bearbeiten {
  background-color: #ddd;
  color: #333;
}

button.bearbeiten:hover {
  background-color: #bbb;
}

a {
  text-decoration: none;
  color: var(--primary-color);
}

a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .profil-container {
    padding: 15px;
  }

  .profilbild {
    width: 120px;
    height: 120px;
  }
}
</style>