<template>
  <div class="Home">
    <div id="post-list">
      <div class="container">
        <!-- Logout Button -->
        <button @click="logout">Logout</button>
      </div>

      <ul>
        <div class="item" v-for="post in posts" :key="post.id">
          <!-- Each Post is Clickable and Redirects to a Specific Post Page -->
          <a class="singlepost" :href="'/api/apost/' + post.id">
            <span class="body">{{ post.body }}</span>
          </a>
        </div>
      </ul>

      <div class="postButtons">
        <!-- Add Post Button -->
        <button @click="redirectToAddPost">Add Post</button>

        <!-- Delete All Posts Button -->
        <button @click="deleteAllPosts">Delete All</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      posts: [], // Stores all posts fetched from the database
    };
  },
  methods: {
    // Fetch all posts from the database
    fetchPosts() {
      fetch(`http://localhost:3000/api/posts/`) // Replace with your actual backend URL
        .then((response) => response.json())
        .then((data) => {
          this.posts = data; // Update posts array
        })
        .catch((err) => console.error(err.message));
    },

    // Logout Functionality
    logout() {
      localStorage.removeItem("userLoggedIn"); // Remove login state
      alert("Logged out successfully!");
      this.$router.push("/login"); // Redirect to login page
    },

    // Redirect to the Add Post page
    redirectToAddPost() {
      this.$router.push("/addpost"); // Ensure you create an "AddPost" page/component
    },

    // Delete All Posts from the Database
    deleteAllPosts() {
      if (confirm("Are you sure you want to delete all posts?")) {
        fetch(`http://localhost:3000/api/posts/`, {
          method: "DELETE", // Delete all posts via API
        })
          .then((response) => {
            if (response.ok) {
              this.posts = []; // Clear the local posts array
              alert("All posts have been deleted.");
            } else {
              throw new Error("Failed to delete posts.");
            }
          })
          .catch((err) => alert(err.message));
      }
    },
  },
  mounted() {
    this.fetchPosts(); // Automatically fetch posts on component load
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
