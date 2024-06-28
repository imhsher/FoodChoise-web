import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router';
import "vuetify/styles";
import "tailwindcss/tailwind.css"
import { createPinia } from 'pinia'

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title + ""
    }
    window.scrollTo(0, 0);
    next()
});

const pinia = createPinia()


createApp(App).use(vuetify).use(router).use(pinia).mount('#app')
