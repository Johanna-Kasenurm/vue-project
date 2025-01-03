import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignUpView from '@/views/SignUpView.vue';
import APost from '@/views/APost.vue';
import Contact from '@/views/Contact.vue';
import LoginPage from '@/views/LoginPage.vue';
import AddPost from '@/views/AddPost.vue';
import auth from '@/auth';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: async(to, from, next) => {
      let authResult = await auth.authenticated();
      console.log(authResult)
      if (!authResult) {
          next('/login')
      } else {
          next();
      }
  }
  },
  {
    path: '/api/allposts',
    name: 'allposts',
    component: HomeView,
  },
  {
    path: '/addpost',
    name: 'addpost',
    // meta: { requiresAuth: true }, // Only logged-in users can access AddPost
    component: AddPost,
    beforeEnter: async(to, from, next) => {
      let authResult = await auth.authenticated();
      console.log(authResult)
      if (!authResult) {
          next('/login')
      } else {
          next();
      }
    }
  },
  {
    path: '/api/apost/:id',
    name: 'apost',
    // meta: { requiresAuth: true }, // Add auth check for individual posts if needed
    component: APost,
    beforeEnter: async(to, from, next) => {
      let authResult = await auth.authenticated();
      console.log(authResult)
      if (!authResult) {
          next('/login')
      } else {
          next();
      }
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/:catchAll(.*)', // Catch-all for undefined routes
    name: 'notfound',
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});



// Global navigation guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true'; // Check if user is logged in
  if (to.meta.requiresAuth && !isLoggedIn) {
    // If the route requires authentication and the user isn't logged in
    alert('You must log in to access this page.');
    next({ name: 'login' }); // Redirect to login page
  } else {
    next(); // Proceed to the route
  }
});


export default router;
