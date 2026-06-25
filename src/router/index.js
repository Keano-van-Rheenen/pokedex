import FavoritesView from '@/components/pages/favorites.vue'
import PokedexView from '@/components/pages/pokedex.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: PokedexView
    },
    {
      path: "/favorites",
      component: FavoritesView
    },
  ],
})

export default router