<template>
  <div class="home">

    <!-- Hauptinhalt -->
    <h1>Home</h1>
    <p>Dies ist die Startseite der Space University!</p>
    <p>Wenn du bereits ein Teil der Space University bist, kannst du dich über das Anmeldeformular einloggen.</p>
    <p>Wenn du dich an der Space University immatrikulieren möchtest, klicke auf den folgenden Button:</p>
    <router-link to="/immatrikulation" class="immatrikulation-button">Immatrikulation</router-link>
    <!-- Logo mittig unten -->
    <div class="logo-container">
      <img src="@/assets/logo-hci.png" alt="Logo" class="logo" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center; /* Text zentrieren */
  height: calc(100vh - 80px); /* Vollbildhöhe minus die Höhe der Menüleiste */
  padding: 20px; /* Innenabstand für Mobilgeräte */
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px; /* Abstand zwischen Logo und Überschrift */
}

.logo {
  height: 200px; /* Logo-Größe anpassen */
  object-fit: contain;
}

.immatrikulation-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #414770;
  color: white;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.immatrikulation-button:hover {
  background-color: #6A9A98; /* Leicht dunklerer Farbton für Hover-Effekt */
}
</style>
