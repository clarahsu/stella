<template>
  <div class="campus-map">
    <h1>Campusplan der Space University</h1>
    <p>Die Space University besteht aktuell aus den vier Campus Merkur, Venus, Erde und Mars.</p>
    <p>Fahren Sie mit der Maus über einen Planeten, um zu erfahren, welches Institut sich auf welchem Campus befindet.</p>
    <svg viewBox="0 0 800 400" class="planet-map">
      <circle v-for="planet in planets" :key="planet.name"
              :cx="planet.x" :cy="planet.y" :r="planet.hover ? planet.r * 1.2 : planet.r"
              :fill="planet.color"
              class="planet"
              @mouseover="hoverPlanet(planet, true)"
              @mouseleave="hoverPlanet(null, false)" />
    </svg>
    <div v-if="selectedPlanet" class="info-box">
      <h2>{{ selectedPlanet.name }}</h2>
      <p>{{ selectedPlanet.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      planets: [
        { name: "Merkur", x: 100, y: 200, r: 30, color: "gray", description: "Institut für Alte Geschichte, Institut für Astronomie", hover: false },
        { name: "Venus", x: 250, y: 180, r: 40, color: "orange", description: "Institut für Lunare Mathematik", hover: false },
        { name: "Erde", x: 400, y: 220, r: 50, color: "blue", description: "Institut für Weltraumkulturen", hover: false },
        { name: "Mars", x: 550, y: 200, r: 35, color: "red", description: "Institut für Marsianische Linguistik", hover: false }
      ],
      selectedPlanet: null
    };
  },
  methods: {
    hoverPlanet(planet, isHovering) {
      this.planets.forEach(p => p.hover = false); // Alle Planeten zurücksetzen
      if (isHovering) {
        planet.hover = true;
        this.selectedPlanet = planet;
      } else {
        this.selectedPlanet = null;
      }
    }
  }
};
</script>

<style scoped>
.campus-map {
  text-align: center;
  position: relative;
}

.planet-map {
  width: 100%;
  max-width: 800px;
  margin-bottom: 80px;
  height: auto;
  border: 1px solid var(--background-color);
  background-color: black;
}

.planet {
  cursor: pointer;
  transition: r 0.2s ease-in-out;
}

.info-box {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--background-color);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--text-color-inv);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
