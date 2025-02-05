import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Kursuebersicht from '../views/Kursuebersicht.vue'
import Stundenplan from '../views/Stundenplan.vue' // Importiere die Stundenplan-Komponente
import { useAuthStore } from '@/stores/useAuthStore'
import Immatrikulation from '../views/Immatrikulation.vue';
import Dokumente from "@/views/Dokumente.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/kursuebersicht',
    name: 'Kursuebersicht',
    component: Kursuebersicht,
    meta: { requiresAuth: true } // Authentifizierung für Kursübersicht
  },
  {
    path: '/stundenplan',
    name: 'Stundenplan',
    component: Stundenplan, // Füge die Stundenplan-Komponente hinzu
    meta: { requiresAuth: true } // Authentifizierung für Stundenplan
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/dokumente',
    name: 'Dokumente',
    component: Dokumente,
    meta: { requiresAuth: true } // Authentifizierung für Kursübersicht
  },
  {
    path: '/immatrikulation',
    name: 'Immatrikulation',
    component: Immatrikulation,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Route Guard: Überprüft, ob der Benutzer eingeloggt ist
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Wenn die Route "requiresAuth" erfordert und der Benutzer nicht eingeloggt ist
  if (to.meta.requiresAuth && !authStore.getIsAuthenticated) {
    next('/') // Leite den Benutzer zur Startseite um
  } else {
    next() // Lass den Benutzer die Route betreten
  }
})

export default router
