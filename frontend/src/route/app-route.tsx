import { useNavigate, useRoutes } from "react-router-dom"

import { ThemeProvider } from "@/components/theme-provider"
import useAuth from "@/hooks/useAuth.tsx";

import { Toaster } from "@/components/ui/toaster.tsx";
import { adminAuthenticatedRoutes } from "./constants/admin-routes";
import guestRoutes from "./constants/guest-routes";
import NotFoundError from "@/pages/errors/not-found";


const AppRoute = () => {

  const adminIsAuthenticated = useAuth();

  const routes = adminIsAuthenticated ? adminAuthenticatedRoutes : guestRoutes;

  const commonRoutes = [
    {
      path: "*",
      element: adminIsAuthenticated ? <NotFoundError authenticated /> : <NotFoundError />
    }];

 
  const routeCollection = useRoutes([...routes, ...commonRoutes]);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      {routeCollection}

      <Toaster />
    </ThemeProvider>
  )
}

export default AppRoute