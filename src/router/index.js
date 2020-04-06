import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Beranda from '../views/Beranda.vue'
import Navbar from '../views/Navbar.vue'
import Footer from '../views/Footer.vue'
import DataAdmin from '../views/DataAdmin.vue'
import DataSiswa from '../views/DataSiswa.vue'
import DataGuru from '../views/DataGuru.vue'
import InputGambar from '../views/InputGambar.vue'
import InputVideo from '../views/InputVideo.vue'
import InputQuotes from '../views/InputQuotes.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'beranda',
      components: {default: Beranda, header: Navbar, footer: Footer},
      meta: { 
        requiresAuth: true
      }
    },
  {
    path: '/data_admin',
    name: 'data_admin',
    components: {default: DataAdmin, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/data_siswa',
    name: 'data_siswa',
    components: {default: DataSiswa, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/data_guru',
    name: 'data_guru',
    components: {default: DataGuru, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/input_gambar',
    name: 'input_gambar',
    components: {default: InputGambar, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/input_video',
    name: 'input_video',
    components: {default: InputVideo, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/input_quotes',
    name: 'input_quotes',
    components: {default: InputQuotes, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {default: Login},
  },
  {
    path: '/register',
    name: 'register',
    components: {default: Register},
  },



]

const router = new VueRouter({
  routes
})

export default router
