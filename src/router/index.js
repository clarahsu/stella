import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Kursuebersicht from '../views/Kursuebersicht.vue'
import Stundenplan from '../views/Stundenplan.vue' // Importiere die Stundenplan-Komponente
import { useAuthStore } from '@/stores/useAuthStore'
import Immatrikulation from '../views/Immatrikulation.vue';
import Dokumente from "@/views/Dokumente.vue";
import Noteneingabe from '@/views/Noteneingabe.vue'
import Notenuebersicht from '@/views/Notenuebersicht.vue'
import DozentenListe from "@/views/DozentenListe.vue";
import DozentenProfil from "@/views/DozentenProfil.vue";
import ProfilEditor from "@/views/ProfilEditor.vue";


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
    meta: { requiresAuth: true } // Authentifizierung für Dokumente
  },
  {
    path: '/immatrikulation',
    name: 'Immatrikulation',
    component: Immatrikulation,
  },
  {
    path: '/noteneingabe',
    name: 'Noteneingabe',
    component: Noteneingabe,
    meta: { requiresAuth: true }
  },
  {
    path: '/notenuebersicht',
    name: 'Notenübersicht',
    component: Notenuebersicht,
    meta: { requiresAuth: true }
  },
  {
    path: "/dozentenliste",
    name: "DozentenListe", 
    component: DozentenListe
  },
  {
    path: "/profil/:id", 
    name: "DozentenProfil", 
    component: DozentenProfil
  },
  {
    path: "/profil/:id/edit", 
    name: "ProfilEditor", 
    component: ProfilEditor
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()


  if (to.meta.requiresAuth && !authStore.getIsAuthenticated) {
    next('/') 
  } else {
    next() 
  }
})

export default router

