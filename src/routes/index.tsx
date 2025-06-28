import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import { authLoader } from './protected-loader';
import Users from '@/pages/Users/indext';
import AuthLayout from '@/components/Layout/AuthLayout';
import Hotel from '@/pages/Hotel';
import OrderProduct from '@/pages/OrderProduct/indext';

const rootRoute = createRootRoute({
  component: Outlet,
});

const mainLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'mainLayout',
  component: Layout,
});

const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authLayout',
  component: AuthLayout,
});

const loginRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: '/login',
  component: Login,
});

const homeRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/',
  component: Home,
  loader: authLoader,
});

const usersRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/users',
  component: Users,
  loader: authLoader,
});

const hotelRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/hotel',
  component: Hotel,
  loader: authLoader,
});

const orderProductRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/orderProduct',
  component: OrderProduct,
  loader: authLoader,
});

const routeTree = rootRoute.addChildren([
  mainLayoutRoute.addChildren([homeRoute, usersRoute, hotelRoute, orderProductRoute]),
  authLayoutRoute.addChildren([loginRoute]),
]);

export const router = createRouter({
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
