<template>
  <div class="post">
    <div class="postheader">
      <div class="user">
        <img :src="post.profile_pic" alt="Profile Picture" />
        <p>{{ post.username }}</p>
      </div>
      <p>{{ post.date }}</p>
    </div>
    <img v-if="post.img" :src="post.img" alt="Post Image" />
    <p>{{ post.text }}</p>
    <div class="postfooter">
      <button @click="likePost">
        <img src="@/assets/like.png" alt="Like" />
      </button>
      <p>{{ post.likes }} </p>
    </div>
  </div>
</template>
  
  <script>
  import { mapActions } from "vuex";
  
  export default {
    name: "Post",
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
    methods: {
      ...mapActions(["incrementLike"]),
      likePost() {
        this.incrementLike(this.post.id); // Increment like count for the specific post
      },
    },
  };
  </script>

<style scoped>
.post {
    background-color: #d3f1e4;
    margin: 1%;
    margin-left: 30%;
    margin-right: 30%;
    /*border-radius: 1pc;*/
    padding: 0.5%;
    padding-top: 0.5%;
    padding-bottom: 0.5%;
}

.post img {
    width: 98%;
    margin: 1%;
    margin-bottom: 0%;
}

.post p {
    margin: 1%;
    margin-bottom: 0.5%;
    margin-top: 3%;
    text-align: left;
    font-size: large;
}

.postheader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 1%;
    white-space: nowrap;
}

.postfooter {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 1%;
    margin-top: 1.5%;
}

.postfooter button {
    background: none; /* Remove default button styling */
    border: none; /* Remove default button border */
    padding: 0%; /* Remove default button padding */
    width:min-content;
}

.postfooter img {
    width: 10%; /* Ensure the size matches the profile picture */
    min-width: 30px;
    border-radius: 50%; /* Make the image round */
    margin: 0%;
}
.user {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.user p {
    color:  #2c3e50;
}

/* img is an immediate child of user or postfooter class */
.user > img {
    border-radius: 1pc;
    padding: 0%;
    width: 8%;
    min-width: 20px;
    margin-left: 0%;
}

/* Matches a p element that directly follows the user class. */
.user + p {
    color:  #2c3e50;
    word-spacing: 8px; 
    /* Keeps the text on one line */
    white-space: nowrap;  
}

/* When the width of the screen is 500px or less */
@media (max-width: 600px) {
    .post {
        margin-left: 0.5%;
        margin-right: 0.5%;
    }
}
</style>