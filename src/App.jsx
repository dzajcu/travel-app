import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import SidebarOverlayWithMap from "./components/navigation/SidebarOverlayWithMap";
import SignInScreen from "./components/auth/SignInScreen";
import Register from "./components/auth/RegisterScreen";

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
        element: <SidebarOverlayWithMap />,
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
