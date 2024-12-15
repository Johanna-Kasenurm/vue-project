import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '@/views/SignUpView.vue'
import APost from '@/views/APost.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
    /*
    component: () =>
      import ("../views/HomeView.vue")
    */
  },
  {
    path: "/api/allposts",
    name: "home",
    component: HomeView,
  },
  {
    path: "/api/apost/:id",
    name: "APost",
    component: APost,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  { //will route to HomeView view if none of the previous routes apply
    path: "/:catchAll(.*)",
    name: "home",
    component: HomeView,
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
