import { lazy } from 'react';
const Index = lazy(() => import('../pages/LandingPage'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },

];

export { routes };
