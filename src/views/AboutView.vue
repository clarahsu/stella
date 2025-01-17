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
.image-container {
  text-align: center;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

figure {
  display: inline-block;
  margin: 0;
}

img {
  max-width: 100%;
  height: auto;
  border: 2px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.merkur-image {
  width: 300px;
  height: auto;
}

figcaption {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #555;
}
</style>