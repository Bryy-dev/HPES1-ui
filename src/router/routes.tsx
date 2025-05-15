import { lazy } from 'react';
const LandingPage = lazy(() => import('../pages/landing-page/LandingPage'));
const GaleryPage = lazy(() => import('../pages/gallery-page/GaleryPage'));
const NewsAndEvents = lazy(() => import('../pages/news-events/News&Events'));
const RequestForm = lazy(() => import('../pages/issuance/Issuance'));
const LearningModules = lazy(() => import('../pages/modules/Modules'));
const OrganizationalChart = lazy(() => import('../pages/organizational-chart/OrganizationalChart'));
const History = lazy(() => import('../pages/history/History'));
const BrigadaForm = lazy(() => import('../pages/issuance/brigadaForm'));
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
    {
        path: '/Issuance/Brigada/Form',
        element: <BrigadaForm />,
        layout: 'default',
    },
    {
        path: '/Services/LearningModules',
        element: <LearningModules />,
        layout: 'default',
    },

    {
        path: '/AboutUs/OrganizationalChart',
        element: <OrganizationalChart />,
        layout: 'default',
    },

    {
        path: '/AboutUs/History',
        element: <History />,
        layout: 'default',
    },
];

export { routes };
