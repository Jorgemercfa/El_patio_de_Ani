import { createRouter, createWebHistory } from 'vue-router';
// Usuarios
import Home from './views/Home-item.vue';
import products from './views/Product-item.vue';
import productsDetails from './components/Component-coupons-item.vue';
import SignIn from './views/Sign-in.vue';
import SignUp from './views/Sign-up.vue';
import ForgetPassword from './views/Forget-Password.vue';
const Contact = () => import('./views/Contact-item.vue');
const Profile = () => import('./views/Profile-item.vue');
const InflableReserva = () => import('./views/Inflable-reserva.vue');
const ServicioReserva = () => import('./views/Servicio-reserva.vue');
const Cart = () => import('./views/Cart-item.vue');
const Checkout = () => import('./views/Checkout-item.vue');
const OrderConfirmation = () => import('./views/OrderConfirmation-item.vue');
const PrivacyPolicy = () => import('./views/Privacy-Policy.vue');
const TermsOfUse = () => import('./views/Terms-of-use.vue');
const FAQ = () => import('./views/FAQ-item.vue');

// EMPRESA
import SignInCompany from './views/views_companies/Sign-in-companies.vue';
import SignUpCompany from './views/views_companies/Sign-up-companies.vue';
import ForgetPasswordCompany from './views/views_companies/Forget-password-companies.vue';
const HomeCompanies = () => import('./views/views_companies/Home-companies.vue');
const Createproducts = () => import('./views/views_companies/Create-product-item.vue');
const ServicesAdmin = () => import('./views/views_companies/Services-admin.vue');
const EditServiceItem = () => import('./views/views_companies/Edit-service-item.vue');
const OrdersCompanies = () => import('./views/views_companies/Orders-companies.vue');
const CompanyProfile = () => import('./views/views_companies/Company-profile-companies.vue');

import { useSession } from './auth/session';
import { useSessionCompany } from './auth/session_companies';

// 80ms gives dynamic views a brief extra tick to finish rendering before the second scroll reset.
const DYNAMIC_CONTENT_SCROLL_DELAY = 80;

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
    meta: {
      requiresAuth: true,
      authOptional: true,
      title: 'Reservar Inflable | El Patio de Ani',
    },
  },
  {
    path: '/Servicio-reserva',
    name: 'ServicioReserva',
    component: ServicioReserva,
    meta: {
      requiresAuth: true,
      authOptional: true,
      title: 'Reservar Servicio | El Patio de Ani',
    },
  },
  {
    path: '/Privacy-Policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
    meta: { title: 'Política de Privacidad | El patio de Ani' },
  },
  {
    path: '/Terms-of-Use',
    name: 'TermsOfUse',
    component: TermsOfUse,
    meta: { title: 'Términos de Uso | El patio de Ani' },
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    component: FAQ,
    meta: { title: 'Preguntas Frecuentes | El patio de Ani' },
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
    path: '/Services-admin',
    name: 'ServicesAdmin',
    component: ServicesAdmin,
    meta: { requiresCompanyAuth: true },
  },
  {
    path: '/Edit-service/:id',
    name: 'EditService',
    component: EditServiceItem,
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
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/El_patio_de_Ani/' : '/'),
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
    const { isAuthenticated, ensureReady } = useSession();
    return ensureReady().then(() => {
      if (!isAuthenticated.value && !to.meta?.authOptional) {
        return { name: 'SignIn' };
      }
      return true;
    });
  }

  // Rutas de empresa
  if (to.meta?.requiresCompanyAuth) {
    const { isCompanyAuthenticated, ensureReady } = useSessionCompany();
    return ensureReady().then(() => {
      if (!isCompanyAuthenticated.value) {
        return { name: 'SignInCompany' };
      }
      return true;
    });
  }

  return true;
});

// ✅ Asegurar scroll en navegación
router.afterEach(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  // Segundo intento para vistas con contenido dinámico que terminan de montar tras la navegación.
  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, DYNAMIC_CONTENT_SCROLL_DELAY);
});

export default router;
