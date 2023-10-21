import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import SidebarWithHeader from "./components/SidebarWithHeader";
import SignInScreen from "./auth/SignInScreen";
import Register from "./auth/RegisterScreen";
import Statistics from "./components/Statistics";
import Planer from "./components/Planer";
import Settings from "./components/Settings";
import { MainContent } from "./components/MainContent";
// import {  extendBaseTheme, Button } from "@chakra-ui/react";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Register />,
//     },
//     {
//         path: "/statistics",
//         element: <Statistics />,
//     },
//     {
//         path: "/planer",
//         element: <Planer />,
//     },
//     {
//         path: "/settings",
//         element: <Settings />,
//     },
//     {
//         path: "/menu",
//         element: <SidebarWithHeader />,
//     },
//     {
//         path: "/sign-in",
//         element: <SignIn />,
//     },
//     {
//         path: "/register",
//         element: <Register />,
//     },
// ]);
const router = createBrowserRouter([
    {
        path: "/",
        element: <SignInScreen />,
    },
    {
        path: "/menu/*",
        element: <SidebarWithHeader />,
        // children: [
        //     { path: "statistics", element: <Statistics /> },
        //     { path: "planer", element: <Planer /> },
        //     { path: "settings", element: <Settings /> },
        // ],
    },
    {
        path: "/auth/sign-in",
        element: <SignInScreen />,
    },
    {
        path: "/auth/register",
        element: <Register />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
