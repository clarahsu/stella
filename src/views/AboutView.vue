<template>
  <div class="about">
    <h1>Campuspläne</h1>
    <p>Hier können Sie die Pläne zum Campus der Space University einsehen.</p>
  </div>
  <div class="image-container">
    <figure>
      <h2>Lageplan der Space University</h2>
      <img :src="planetenImage" alt="Lageplan">
      <figcaption>Hier sehen Sie die Institute Merkur, Venus, Erde und Mars (v.l.n.r.)</figcaption>
    </figure>

    <figure>
      <h2>Institut Merkur</h2>
      <iframe src="https://solarsystem.nasa.gov/gltf_embed/2369/"></iframe>
      <figcaption>Lageplan des Institut Merkur</figcaption>
    </figure>
  </div>
</template>

<script>
export default {
  data() {
    return {
      planetenImage: require('@/assets/planeten.jpg'),
    };
  },
};
</script>

<style scoped>
.about {
  text-align: center; /* Zentriert den Text horizontal */
  margin-top: 50px; /* Abstand nach oben */
}

.image-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Zentriert die Inhalte horizontal */
  gap: 30px; /* Abstand zwischen den Elementen */
  margin-top: 20px;
}

figure {
  display: inline-block;
  margin: 0;
  text-align: center; /* Zentriert die Inhalte innerhalb des Figures */
}

img {
  max-width: 100%;
  height: auto;
  border: 2px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

figcaption {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #555;
}

iframe {
  width: 80%; /* Reduziert die Breite des iframes für bessere Darstellung */
  max-width: 600px;
  height: 400px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
