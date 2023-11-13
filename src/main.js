import {createApp} from 'vue'
import { createPinia } from "pinia";
import router from './router'
import App from './App.vue'

import('./assets/sass/public.scss')

// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        themes: {
            light: {
                colors: {
                    black: '#333D45',
                    gray: '#999EA2',
                    'light-gray': '#E0E2E3',
                    blue: '#187ABA'
                },
            },
        },
    }
})

const app = createApp(App)
const pinia = createPinia();

app.use(router)
app.use(vuetify)
app.use(pinia)
app.mount('#app')
