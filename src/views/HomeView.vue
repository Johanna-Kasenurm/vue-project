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
            <span><div class = "PostHeader">{{ post.date }}</div></span>
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
  fetch("http://localhost:3000/auth/logout", {
    method: "POST",
    credentials: "include",
  })
    .then(() => {
      auth.user.authenticated = false; // Muudame kasutaja staatuse false-ks
      alert("Logged out successfully!");
      this.$router.push("/login");
    })
    .catch((err) => {
      console.error("Logout failed:", err.message);
      alert("Logout failed. Please try again.");
    });
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
  this.authResult = await auth.authenticated(); // Kontrollib autentimist
  if (this.authResult) {
    this.fetchPosts(); // Kui kasutaja on autentitud, lae postitused
  } else {
    this.$router.push("/login"); // Kui ei ole, suuna login lehele
  }
}
};
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
}

.item {
  align-self: center;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: fit-content;
  max-width: 30%;
  padding: 1%;
  margin: 0.5% auto;
  text-align: left;
  background-color: #d3f1e4;
  overflow: hidden;
  word-wrap: break-word;
  line-height: 1.5;
  border-radius: 10px;
}
.item:hover{
  transition: all 0.4s ease-in-out;
  background-color: rgb(170, 170, 170);
  box-shadow: 0 4px 8px rgb(66, 185, 131);
}
.PostHeader {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  /*align-items: flex-end;*/
}

button {
  background-color: rgb(66, 185, 131);
  border: none;
  margin: 1%;
  padding: 10px 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
}

button:hover {
  background-color: #668db4;
}

</style>
