<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/signup">Sign Up</router-link>
    </nav>
</template>

<script>

</script>

<style scoped>
nav {
  /* background-color:azure;*/
  background-color:#d3f1e4;
  margin: 0%;
  margin-bottom: auto;
  width: auto;
  position: relative;
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>