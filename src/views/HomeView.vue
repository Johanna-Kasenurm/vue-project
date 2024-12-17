<template>
  <div class="Home" v-if="authResult">
    <div id="post-list">
      <div class="container">
        <!-- Logout Button -->
        <button @click="logout">Logout</button>
      </div>

      <ul>
        <div class="item" v-for="post in posts" :key="post.id">
          <a class="singlepost" @click="this.$router.push(`/api/apost/${post.id}`)">
            <span class="body">{{ post.body }}</span>
          </a>
        </div>
      </ul>

      <div class="postButtons">
        <button @click="redirectToAddPost">Add Post</button>
        <button @click="deleteAllPosts">Delete All</button>
      </div>
    </div>
  </div>
  <div v-else>
    <p>You must be logged in to view this page.</p>
  </div>
</template>

<script>
import auth from '@/auth'; // Impordi autentimise logika

export default {
  name: "HomeView",
  data() {
    return {
      posts: [],
      authResult: false, // Algseis: kasutaja ei ole autentitud
    };
  },
  methods: {
    fetchPosts() {
      fetch(`http://localhost:3000/api/posts/`)
        .then((response) => response.json())
        .then((data) => {
          this.posts = data;
        })
        .catch((err) => console.error(err.message));
    },

    logout() {
      localStorage.removeItem("userLoggedIn");
      alert("Logged out successfully!");
      this.$router.push("/login");
    },

    redirectToAddPost() {
      this.$router.push("/addpost");
    },

    deleteAllPosts() {
      if (confirm("Are you sure you want to delete all posts?")) {
        fetch(`http://localhost:3000/api/posts/`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              this.posts = [];
              alert("All posts have been deleted.");
            } else {
              throw new Error("Failed to delete posts.");
            }
          })
          .catch((err) => alert(err.message));
      }
    },
  },
  async mounted() {
    // Kontrollime, kas kasutaja on autentitud
    this.authResult = await auth.authenticated();
    if (this.authResult) {
      this.fetchPosts();
    } else {
      this.$router.push("/login"); // Kui kasutaja ei ole autentitud, suuname sisselogimislehele
    }
  },
};
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
}

.item {
  padding: 1%;
  margin: 0.5% 0;
  text-align: center;
  background-color: lightgray;
}

button {
  background-color: #42b983;
  border: none;
  margin: 1%;
  padding: 10px 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #2c3e50;
}
</style>
