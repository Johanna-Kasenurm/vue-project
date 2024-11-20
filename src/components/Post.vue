<template>
    <div class="post">
        <div class ="postheader">
            <div class="user">
                <img :src="item.profile_pic" alt="Profile Picture">
                <p>{{ item.username }}</p>
            </div>
            <p>{{ item.date }}</p>
        </div>
        <img v-if="item.img" :src="item.img" alt="Post Image">
        <p>{{ item.text }}</p>
        <div class="postfooter">
            <img src="@/assets/like.png" alt="Like">
            <p>Counter</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    item: {
        type: Object,
        required: true
    }
  }
}
</script>

<style scoped>
.post {
    background-color: lightgrey;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 2%;
    border-radius: 1pc;
    padding: 0%;
}

.post img {
    width: 98%;
    margin: 1%;
    margin-bottom: 0%;
}

.post p {
    margin-left: 1%;
    margin-right: 1%;
    margin-top: 0.5%;
    margin-bottom: 0.5%;
    font-size: large;
}

.postheader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 1%;
    margin-bottom: 0%;
}
.postheader p {
    justify-content: space-between;
}

.postfooter {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 1%;
    margin-top: 0%;
}

.user {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.user p {
    color: dimgray;
}

/* img is an immediate child of user or postfooter class */
.user > img, .postfooter > img {
    border-radius: 1pc;
    padding: 0%;
    width: 6%;
    min-width: 20px;
    margin-left: 0%;
}

/* Matches a p element that directly follows the user class. */
.user + p {
    color: dimgray;
    word-spacing: 8px; 
    /* Keeps the text on one line */
    white-space: nowrap;  
}

/* When the width of the screen is 500px or less */
@media (max-width: 500px) {
    .post {
        margin-left: 0.5%;
        margin-right: 0.5%;
    }
}
</style>