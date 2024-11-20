<template>
  <div class="home">
    <ul class="postList">
      <li v-for="item in jsonData" :key="item.id">
        <Post :item="item"/>
      </li>
    </ul>
  </div>
  
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue';
import { mapState } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapState(['jsonData'])
  },
  components: {
    Post
  }
}
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
</style>