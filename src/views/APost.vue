<template>
  <div class="APost">
    <div id="form">
      <h3>A Post</h3>
      <label for="body">Body:</label>
      <input name="body" type="text" id="body" required v-model="post.body" />
    </div>
    <div class="container">
      <!-- Buttons for updating and deleting the post -->
      <button @click="updatePost" class="updatePost">Update Post</button>
      <button @click="deletePost" class="deletePost">Delete Post</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "APost",
  data() {
    return {
      post: {
        id: "",
        body: "",
        date: "",
        username: "",
      },
    };
  },
  methods: {
    // Fetch the specific post based on the ID
    fetchAPost(id) {
      console.log("Fetching the post...");
      fetch(`http://localhost:3000/api/posts/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch post");
          }
          return response.json();
        })
        .then((data) => {
          this.post = data;
          console.log("Post fetched:", this.post);
        })
        .catch((err) => {
          console.error(err.message);
          alert("Error fetching the post. Please try again.");
        });
    },
    // Update the current post
    updatePost() {
      if (!this.post.body.trim()) {
        alert("Post body cannot be empty.");
        return;
      }
      fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.post),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update post");
          }
          alert("Post updated successfully!");
          this.$router.push("/"); // Redirect to the home page
        })
        .catch((e) => {
          console.error(e);
          alert("Error updating the post. Please try again.");
        });
    },
    // Delete the current post
    deletePost() {
      if (!confirm("Are you sure you want to delete this post?")) {
        return;
      }
      fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete post");
          }
          alert("Post deleted successfully!");
          this.$router.push("/"); // Redirect to the home page
        })
        .catch((e) => {
          console.error(e);
          alert("Error deleting the post. Please try again.");
        });
    },
  },
  // Fetch the post when the component is mounted
  mounted() {
    const postId = this.$route.params.id; // Get post ID from route parameters
    if (postId) {
      this.fetchAPost(postId);
    } else {
      alert("No post ID provided.");
    }
  },
};
</script>

<style scoped>
/* Styling for the form container */
#form {
  max-width: 420px;
  margin: 30px auto;
  background: #d3f1e4;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

/* Styling for the title */
h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}

/* Styling for labels */
label {
  color: rgb(8, 110, 110);
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

/* Styling for input fields */
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid white;
  color: rgb(8, 110, 110);
}

/* Styling for buttons */
button {
  background: rgb(7, 65, 65);
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
}

/* Hover effect for buttons */
button:hover {
  background: rgb(10, 90, 90);
}

/* Flex container for buttons */
.container {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
