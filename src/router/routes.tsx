import { lazy } from 'react';
const LandingPage = lazy(() => import('../pages/landing-page/LandingPage'));
const GaleryPage = lazy(() => import('../pages/gallery-page/GaleryPage'));
const NewsAndEventsPage = lazy(() => import('../pages/news-events/News&Events'));
const RequestFormPage = lazy(() => import('../pages/issuance/Issuance'));
const ModulesPage = lazy(() => import('../pages/modules/Modules'));
const OrganizationalChartPage = lazy(() => import('../pages/organizational-chart/OrganizationalChart'));
const HistoryPage = lazy(() => import('../pages/history/History'));
const BrigadaFormPage = lazy(() => import('../pages/issuance/brigadaForm'));
const FullDetailsPage = lazy(() => import('../pages/news-events/FullDetails'));
const SuggestionPage = lazy(() => import('../pages/suggestion'));
const PrimeReportPage = lazy(() => import('../pages/school-paper/primeReport'));
const routes = [
    // dashboard
    {
        path: '/',
        element: <LandingPage />,
        layout: 'default',
    },
    {
        path: '/gallery',
        element: <GaleryPage />,
        layout: 'default',
    },
    {
        path: '/news&events',
        element: <NewsAndEventsPage />,
        layout: 'default',
    },
    {
        path: '/issuance/form',
        element: <RequestFormPage />,
        layout: 'default',
    },
    {
        path: '/issuance/brigada/form',
        element: <BrigadaFormPage />,
        layout: 'default',
    },
    {
        path: '/services/modules',
        element: <ModulesPage />,
        layout: 'default',
    },

    {
        path: '/aboutUs/organizational-chart',
        element: <OrganizationalChartPage />,
        layout: 'default',
    },
    {
        path: '/:type/:id/:title',
        element: <FullDetailsPage />,
        layout: 'default',
    },

    {
        path: '/aboutUs/history',
        element: <HistoryPage />,
        layout: 'default',
    },
    {
        path: '/school-paper/prime-report',
        element: <PrimeReportPage />,
        layout: 'default',
    },
    {
        path: '/suggestion/form',
        element: <SuggestionPage />,
        layout: 'default',
    },
];

export { routes };
