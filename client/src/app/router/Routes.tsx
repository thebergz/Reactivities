import {createBrowserRouter} from "react-router";
import App from "../layout/App.tsx";
import HomePage from "../../features/home/HomePage.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import ActivityForm from "../../features/activities/form/ActivityForm.tsx";
import ActivityDetailPage from "../../features/activities/details/ActivityDetailPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: '', element: <HomePage />},
            {path: 'activities', element: <ActivityDashboard />},
            {path: 'activities/:id', element: <ActivityDetailPage />},
            {path: 'createActivity', element: <ActivityForm key='create'/>},
            {path: 'manage/:id', element: <ActivityForm />}
        ]
    }
]);