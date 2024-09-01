import { lazy } from 'react';
import { AppRouteInterface } from '../type';

const Login = lazy(() => import('@/pages/auth/login.tsx'));

const guestRoutes : AppRouteInterface[] = [
    {
        path : '/admin/login',
        element : (
            <Login />
        )
    }
];

export default guestRoutes