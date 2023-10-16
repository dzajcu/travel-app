import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SidebarWithHeader from "./components/SidebarWithHeader";
import SignIn from "./auth/SignInScreen";
import Register from "./auth/RegisterScreen";
import Statistics from "./components/Statistics";
import Planer from "./components/Planer";
import Settings from "./components/Settings";
// import {  extendBaseTheme, Button } from "@chakra-ui/react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Register />,
    },
    {
        path: "/statistics",
        element: <Statistics />,
    },
    {
        path: "/planer",
        element: <Planer />,
    },
    {
        path: "/settings",
        element: <Settings />,
    },
    {
        path: "/menu",
        element: <SidebarWithHeader />,
    },
    {
        path: "/sign-in",
        element: <SignIn />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
