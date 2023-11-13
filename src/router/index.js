import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'markdown',
            component: () => import('../views/Markdown.vue')
        }
    ]
})

export default router
