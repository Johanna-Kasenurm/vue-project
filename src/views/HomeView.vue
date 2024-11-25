<template>
  <div class="home">
    
    <ul class="postList">
      <li v-for="post in jsonData" :key="post.id">
        <Post :post="post" />
      </li>
      <button @click="resetAllLikes">Reset Likes</button> <!-- Reset button -->
    </ul>
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "HomeView",
  components: { Post },
  computed: {
    ...mapState(["jsonData"]),
  },
  methods: {
    ...mapActions(["resetAllLikes"]),
  },
};
</script>


<style scoped>
.postList {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.postList li {
  margin-bottom: 1rem; /* Optional: Add spacing between posts */
}

button {
  background-color: #42b983;
  margin-bottom: 1.5%;
  border: none;
  /*border-radius: 10%;*/
  padding: 1%;
  color: azure;
  font-weight: bold;
}

button:hover {
  background-color: #2c3e50;
}
</style>