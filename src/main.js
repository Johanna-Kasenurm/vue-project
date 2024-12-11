import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

/*
const app = createApp(App)
;

// Trigger file upload before mounting the application
store.dispatch('loadJsonData').then(() => {
    app.use(store).use(router).mount('#app')
})
*/

