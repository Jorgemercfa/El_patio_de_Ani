import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home-item.vue';
import products from './views/Product-item.vue';
import Contact from './views/Contact-item.vue';
import productsDetails from './components/Component-coupons-item.vue';

// NUEVO
import SignIn from './views/Sign-in.vue';
import SignUp from './views/Sign-up.vue';
import ForgetPassword from './views/Forget-Password.vue';
import Profile from './views/Profile-item.vue';

import Cart from './views/Cart-item.vue';
import Checkout from './views/Checkout-item.vue';
import OrderConfirmation from './views/OrderConfirmation-item.vue';
import InflableReserva from './views/Inflable-reserva.vue';

// EMPRESA
import SignInCompany from './views/views_companies/Sign-in-companies.vue';
import SignUpCompany from './views/views_companies/Sign-up-companies.vue';
import ForgetPasswordCompany from './views/views_companies/Forget-password-companies.vue';
import HomeCompanies from './views/views_companies/Home-companies.vue';
import Createproducts from './views/views_companies/Create-product-item.vue';
import Companyproducts from './views/views_companies/Company-product-item.vue';
import OrdersCompanies from './views/views_companies/Orders-companies.vue';
import CompanyProfile from './views/views_companies/Company-profile-companies.vue';

import { useSession } from './auth/session';
import { useSessionCompany } from './auth/session_companies';

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { title: 'Inicio | El patio de Ani' }, },
  { path: '/Product-item', name: 'product', component: products, meta: { title: 'Servicios | El patio de Ani' }, },
  { path: '/Contact-item', name: 'Contact', component: Contact, meta: { title: 'Contacto | El patio de Ani' }, },
  { path: '/product/:id', name: 'productsDetails', component: productsDetails, meta: { title: 'Detalles del Servicio | El patio de Ani' } },

  // USUARIO
  { path: '/Sign-in', name: 'SignIn', component: SignIn },
  { path: '/Sign-up', name: 'SignUp', component: SignUp },
  {
    path: '/Forget-Password',
    name: 'ForgetPassword',
    component: ForgetPassword,
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: Cart,
    meta: { requiresAuth: true },
  },
  {
    path: '/Checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { requiresAuth: true },
  },
  {
    path: '/OrderConfirmation',
    name: 'OrderConfirmation',
    component: OrderConfirmation,
    meta: { requiresAuth: true },
  },
  {
    path: '/Inflable-reserva',
    name: 'InflableReserva',
    component: InflableReserva,
    meta: { title: 'Reservar Inflable | El Patio de Ani' },
  },

  // EMPRESA
  {
    path: '/Sign-in-companies',
    name: 'SignInCompany',
    component: SignInCompany,
  },
  {
    path: '/Sign-up-companies',
    name: 'SignUpCompany',
    component: SignUpCompany,
  },
  {
    path: '/Forget-Password-Companies',
    name: 'ForgetPasswordCompany',
    component: ForgetPasswordCompany,
  },
  {
    path: '/Home-companies',
    name: 'HomeCompanies',
    component: HomeCompanies,
    meta: { requiresCompanyAuth: true },
  },
  {
    path: '/Create-products',
    name: 'Createproducts',
    component: Createproducts,
    meta: { requiresCompanyAuth: true },
  },
  {
    path: '/Company-products',
    name: 'Companyproducts',
    component: Companyproducts,
    meta: { requiresCompanyAuth: true },
  },
  {
    path: '/Orders-companies',
    name: 'OrdersCompanies',
    component: OrdersCompanies,
    meta: { requiresCompanyAuth: true },
  },
  {
    path: '/Company-profile',
    name: 'CompanyProfile',
    component: CompanyProfile,
    meta: { requiresCompanyAuth: true },
  },

  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0, behavior: 'auto' };
  },
});

// Guard ÚNICO que maneja ambos tipos de auth
router.beforeEach((to) => {
  // Rutas de usuario
  if (to.meta?.requiresAuth) {
    const { isAuthenticated } = useSession();
    if (!isAuthenticated.value) {
      return { name: 'SignIn' };
    }
  }

  // Rutas de empresa
  if (to.meta?.requiresCompanyAuth) {
    const { isCompanyAuthenticated } = useSessionCompany();
    if (!isCompanyAuthenticated.value) {
      return { name: 'SignInCompany' };
    }
  }
});

// ✅ Asegurar scroll en navegación
router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
