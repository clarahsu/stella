<template>
  <div class="campus-map">
    <h1>Campusplan der Space University</h1>
    <svg viewBox="0 0 800 400" class="planet-map">
      <circle v-for="planet in planets" :key="planet.name"
              :cx="planet.x" :cy="planet.y" :r="planet.hover ? planet.r * 1.2 : planet.r"
              :fill="planet.color" @click="selectPlanet(planet)"
              class="planet" @mouseover="hoverPlanet(planet, true)"
              @mouseleave="hoverPlanet(planet, false)" />
    </svg>
    <div v-if="selectedPlanet" class="info-box">
      <h2>{{ selectedPlanet.name }}</h2>
      <p>{{ selectedPlanet.description }}</p>
      <button @click="selectedPlanet = null">Schließen</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      planets: [
        { name: "Merkur", x: 100, y: 200, r: 30, color: "gray", description: "Institut für Astrophysik", hover: false },
        { name: "Venus", x: 250, y: 180, r: 40, color: "orange", description: "Institut für Raumfahrttechnik", hover: false },
        { name: "Erde", x: 400, y: 220, r: 50, color: "blue", description: "Institut für intergalaktische Kommunikation", hover: false },
        { name: "Mars", x: 550, y: 200, r: 35, color: "red", description: "Institut für extraterrestrische Biologie", hover: false }
      ],
      selectedPlanet: null
    };
  },
  methods: {
    selectPlanet(planet) {
      this.selectedPlanet = planet;
    },
    hoverPlanet(planet, isHovering) {
      planet.hover = isHovering;
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
  height: auto;
  border: 1px solid var(--background-color);
  background-color: #001440;
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
