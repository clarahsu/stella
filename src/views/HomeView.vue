<template>
  <div class="home">
    <h1>Home</h1>
    <p>Dies ist die Startseite!</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
