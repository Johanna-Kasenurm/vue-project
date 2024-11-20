<template>
  <div id="app">
    <Header></Header>
    <main>
      <router-view/>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';

  export default {
    name: "App",
    components: {
      Header,
      Footer
    }
  }
</script>

<style>

* {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Make the container fill the viewport */
}

main {
    flex: 1; /* Expand to fill remaining space */
}
</style>
