import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { FontAwesomeIcon } from './plugins/font-awesome';

createApp(App)
    .use(store)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
