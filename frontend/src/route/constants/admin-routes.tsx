import Layout from "@/components/layout/layout";
import { AppRouteInterface } from "../type";
import ClientPage from "@/pages/clients";
import AdminPage from "@/pages/admins";
import Action from "@/pages/admins/action";

export const adminAuthenticatedRoutes:AppRouteInterface[] = [
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <ClientPage />
            },
            {
                path: "/admins",
                element: <AdminPage />
            },
            {
                path: "/admins/add",
                element: <Action />
            },
        ]
    }
];
