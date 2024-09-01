import Layout from "@/components/layout/layout";
import { AppRouteInterface } from "../type";


export const adminAuthenticatedRoutes:AppRouteInterface[] = [
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <div>Dashboard</div>
            },
            {
                path: "/clients",
                element: <div>Clients</div>
            },
            {
                path: "/admins",
                element: <div>Admins</div>
            },
        ]
    }
];
