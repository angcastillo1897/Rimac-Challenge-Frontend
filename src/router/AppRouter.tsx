import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';

import { QuotePage } from '../HealthInsurance/pages/QuotePage';
import { PlansPage } from '../HealthInsurance/pages/PlansPage';
import ProtectedRoute from './ProtectedRoute';

import {useStore} from '../store/store'

export const AppRouter = () => {
	const isAuthenticated = useStore((state) => state.isAuthenticated)
    const routes=[
        {
            path: '/',
            element: <QuotePage /> 
        },
        {
            path: 'plans',
            element: <ProtectedRoute element={<PlansPage />} isAuthenticated={isAuthenticated} />
        },
        {
            path: '*',
            element: <Navigate to='/' />
        }
    ]


	const router = createBrowserRouter(routes);

	return <RouterProvider router={router} />;
};
