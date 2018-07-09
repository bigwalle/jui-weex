import App from '../views/app.vue'
import juiweex from '../js/juiweex.js'

Vue.use(juiweex);

App.el = '#root'

new Vue(App)
