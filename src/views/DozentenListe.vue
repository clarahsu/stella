<template>
  <div class="wrapper">
    <div class="container">
      <h1>Dozierenden-Profile</h1>
      <p>Hier finden Sie eine Auflistung der Dozierenden der Space University. Wenn Sie mehr über eine Person erfahren möchten, klicken Sie auf das Profil.</p>
      <div v-if="dozenten.length > 0">
        <ul>
          <li v-for="dozent in dozenten" :key="dozent.id">
            <div class="dozent-item">
              <img :src="dozent.profilbild || defaultImage" alt="Dozent Profilbild" class="dozent-img"/>
              <div class="dozent-info">
                <router-link :to="'/profil/' + dozent.id">
                  <h3 class="dozent-name">{{ dozent.name }}</h3>
                </router-link>
                <p>{{ dozent.fachbereich }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Es sind keine Dozenten verfügbar.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dozenten: [
        { id: 1, name: 'Space Dozentin', fachbereich: 'Astronomie', profilbild: '' },
        { id: 3, name: 'Dr. Lisa Stern', fachbereich: 'Lunare Mathematik', profilbild: '' },
        { id: 4, name: 'Dr. Michael Fischer', fachbereich: 'Alte Geschichte', profilbild: '' },
        { id: 5, name: 'Dr. Dallas Skerritt', fachbereich: 'Marsianische Linguistik', profilbild: '' },
        { id: 6, name: 'Dr. Ellen Hurt', fachbereich: 'Weltraumkulturen', profilbild: '' }
      ],
      defaultImage: 'https://th.bing.com/th/id/R.c564ae6358d40e47eb291f717bf53b56?rik=lTPuAW48qj9orQ&riu=http%3a%2f%2fwww.interiorgas.com%2fwp-content%2fuploads%2fblank-profile-picture-300x300.png&ehk=5drVIh9jSZOVq4E6%2fN3JZCmR8XCkRLOHl6%2botKIIemY%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
    };
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: var(--background-color);
}

.container {
  background: var(--background-color);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10%;
  width: 100%;
}

h1 {
  font-size: var(--font-title);
  color: var(--text-header);
}

ul {
  list-style-type: none;
  padding: 0;
  padding-bottom: 30%;
  width: 100%;
}

.dozent-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.dozent-item:hover {
  background-color: var(--accent-light);
}

.dozent-img {
  width: 50px;
  height: 50px;
  border-radius: 10px; 
  margin-right: 15px;
  object-fit: cover;
}

.dozent-name {
  font-size: var(--font-medium);
  margin: 0;
  color: var(--primary-color);
  text-decoration: none;
}

.dozent-name:hover {
  color: var(--primary-hover);
}

.dozent-info p {
  font-size: var(--font-small);
  color: var(--text-color-inv);
}
</style>
