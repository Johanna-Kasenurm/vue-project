<template>
<div class="Home">
    <div id="post-list">
      <div class="container">
        <button   @click="Logout">Logout</button>
      </div>
      <ul>
        <div class="item" v-for="post in posts" :key="post.id">
            <a class= 'singlepost' :href="'/api/apost/' + post.id">
            <span class="title"> <b>Title:</b> {{ post.title }}  </span><br />
            <span class="body"> <b>Body:</b> {{ post.body }} </span> <br />
            <span class="url"> <b>Url:</b> {{ post.urllink }} </span> <br />
          </a>
        </div>
      </ul>
    </div>
  </div>

  <!--
  <div class="home">
    <ul class="postList">
      <li v-for="post in jsonData" :key="post.id">
        <Post :post="post" />
      </li>
      <button @click="resetAllLikes">Reset Likes</button>  //Reset button
    </ul>
    
  </div>
  -->
</template>

<script>
// import Post from "@/components/Post.vue";
// import { mapState, mapActions } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    fetchPosts() {
      // You should remember how Fetch API works
      // fetch is a GET request unless stated otherwise. Therefore, it will fetch all posts from the database
      fetch(`http://localhost:3000/api/posts/`)
        .then((response) => response.json())
        .then((data) => (this.posts = data))
        .catch((err) => console.log(err.message));
    },
  },
  mounted() {
    this.fetchPosts();
    console.log("mounted");
  },

  /*
  components: { Post },
  computed: {
    ...mapState(["jsonData"]),
  },
  methods: {
    ...mapActions(["resetAllLikes"]),
  },
  */
};
</script>


<style scoped>
ul {
  margin: 0;
  padding:0%;
}

.item {
  padding: 1%;
  margin-top: 0.5%;
  margin-bottom: 1%;
  text-align: center;
  background-color: lightgray;
  margin-left: 0%;
}

button {
  background-color: #42b983;
  border: none;
  margin-top: 1%;
  margin-bottom: 0.5%;
  /*border-radius: 10%;*/
  padding: 1%;
  color: azure;
  font-weight: bold;
}

/*
.postList {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.postList li {
  margin-bottom: 1rem; // Optional: Add spacing between posts
}

button {
  background-color: #42b983;
  margin-bottom: 1.5%;
  border: none;
  //border-radius: 10%;
  padding: 1%;
  color: azure;
  font-weight: bold;
}

button:hover {
  background-color: #2c3e50;
}
*/
</style>