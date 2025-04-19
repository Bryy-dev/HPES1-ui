import { lazy } from 'react';
const LandingPage = lazy(() => import('../pages/landing-page/LandingPage'));
const GaleryPage = lazy(() => import('../pages/gallery-page/GaleryPage'));
const NewsAndEvents = lazy(() => import('../pages/news-events/News&Events'));
const RequestForm = lazy(() => import('../pages/issuance/Issuance'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <LandingPage />,
        layout: 'default',
    },
    {
        path: '/Gallery',
        element: <GaleryPage />,
        layout: 'default',
    },
    {
        path: '/News&Events',
        element: <NewsAndEvents />,
        layout: 'default',
    },
    {
        path: '/Issuance/Form',
        element: <RequestForm />,
        layout: 'default',
    },
];

export { routes };
