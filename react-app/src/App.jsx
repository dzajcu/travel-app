import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SidebarOverlayWithMap from "./components/navigation/SidebarOverlayWithMap";
import SignInScreen from "./components/auth/SignInScreen";
import SignUpScreen from "./components/auth/SignUpScreen";
import ForgotPassword from "./components/auth/ForgotPassword";
import { ChakraProvider } from "@chakra-ui/react";
import theme, { toastOptions } from "./theme";
import { NavRoutes } from "./components/routes/NavRoutes";

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
        path: "/menu",
        element: <SidebarOverlayWithMap />,
        children: [
            { path: "/menu/*", element: <NavRoutes /> },
        ],
    },
    {
        path: "/auth/sign-in",
        element: <SignInScreen />,
    },
    {
        path: "/auth/sign-up",
        element: <SignUpScreen />,
    },
    {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
    },
]);

function App() {
    return (
        <ChakraProvider
            theme={theme}
            toastOptions={{ defaultOptions: toastOptions }}
        >
            <RouterProvider router={router} />
        </ChakraProvider>
    );
}

export default App;
