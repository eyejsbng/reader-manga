import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Manga from './views/Manga.vue'
import Search from './views/Search.vue'
import Chapter from './views/Chapter.vue'
import Genre from './views/Genre.vue'
import Latest from './views/Latest.vue'
const routes =  [
    {
        path: '/',
        name: 'Home', 
        component: Home,
    },
    {
        path: '/manga/:slug',
        name: 'Manga',
        component: Manga,
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
    },
    {
        path: '/manga/chapter/:chapter',
        name: 'Chapter',
        component: Chapter,
        props: true
    },
    {
        path: '/genre/:genre',
        name: 'Genre',
        component: Genre
    },
    {
        path: '/latest/all',
        name: 'Latest',
        component: Latest
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router

