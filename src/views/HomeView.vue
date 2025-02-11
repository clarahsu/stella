<template>
  <div class="home">
    <!-- Inhalt für nicht angemeldete Nutzer -->
    <template v-if="!isLoggedIn">
      <h1>Home</h1>
      <p>Dies ist die Startseite der Space University!</p>
      <p>Wenn du bereits ein Teil der Space University bist, kannst du dich über das Anmeldeformular einloggen.</p>
      <p>Wenn du dich an der Space University immatrikulieren möchtest, klicke auf den folgenden Button:</p>
      <router-link to="/immatrikulation" class="immatrikulation-button">Immatrikulation</router-link>
    </template>

    <!-- Inhalt für Studentinnen -->
    <template v-else-if="isSpaceStudentin">
      <h1>Willkommen zurück!</h1>
      <div class="box-grid studentin">
        <router-link to="/kursuebersicht" class="info-box">Kurs- und Prüfungsübersicht</router-link>
        <router-link to="/notenuebersicht" class="info-box">Notenübersicht</router-link>
        <router-link to="/dokumente" class="info-box">Persönliche Dokumente</router-link>
        <router-link to="/stundenplan" class="info-box">Stundenplan</router-link>
        <router-link to="/dozentenliste" class="info-box">Dozierenden-Profile</router-link>
        <router-link to="/about" class="info-box">Campuspläne</router-link>
      </div>
    </template>

    <!-- Inhalt für Dozentinnen -->
    <template v-else-if="isSpaceDozentin">
      <h1>Willkommen zurück!</h1>
      <div class="box-grid dozentin">
        <router-link to="/kursuebersicht" class="info-box">Kurs- und Prüfungsübersicht</router-link>
        <router-link to="/noteneingabe" class="info-box">Noteneingabe</router-link>
        <router-link to="/dozentenliste" class="info-box">Dozierenden-Profile</router-link>
        <router-link to="/about" class="info-box">Campuspläne</router-link>
      </div>
    </template>
  </div>
</template>


<script>
import {computed} from "vue";
import {useAuthStore} from "@/stores/useAuthStore";

export default {
  name: "HomeView",
  setup() {
    const authStore = useAuthStore();

    const isLoggedIn = computed(() => !!authStore.userRole);
    const isSpaceStudentin = computed(() => authStore.userRole === "studentin");
    const isSpaceDozentin = computed(() => authStore.userRole === "dozentin");

    console.log(authStore.userRole)
    console.log("Auth Store:", authStore);

    return {
      isLoggedIn,
      isSpaceStudentin,
      isSpaceDozentin,
    };
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: calc(100vh - 80px);
  padding: 20px;
}

.immatrikulation-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--accent-color);
  color: var(--text-color-inv);
  text-decoration: none;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.immatrikulation-button:hover {
  background-color: var(--accent-dark);
}

/* Boxen-Grid */
.box-grid {
  display: grid;
  gap: 20px;
  margin-top: 20px;
}

/* 3 Spalten für Studentinnen */
.box-grid.studentin {
  grid-template-columns: repeat(3, 1fr);
}

/* 2 Spalten für Dozentinnen */
.box-grid.dozentin {
  grid-template-columns: repeat(2, 1fr);
}

.info-box {
  padding: 15px 30px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  text-decoration: none;
  font-size: var(--font-medium);
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  text-align: center;
}

.info-box:hover {
  background-color: var(--secondary-hover);
}
</style>
