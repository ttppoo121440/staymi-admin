import AppSidebar from './AppSidebar';
import { Outlet } from '@tanstack/react-router';

const Layout = () => {
  return (
    <>
      <AppSidebar>
        <Outlet />
      </AppSidebar>
    </>
  );
};

export default Layout;
