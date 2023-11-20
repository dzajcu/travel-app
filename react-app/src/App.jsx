import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SidebarOverlayWithMap from "./components/navigation/SidebarOverlayWithMap";
import SignInScreen from "./components/auth/SignInScreen";
import ForgotPassword from "./components/auth/ForgotPassword";
import Register from "./components/auth/RegisterScreen";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

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
        path: "/menu/map/*",
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
        path: "/auth/sign-up",
        element: <Register />,
    },
    {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
    },
]);

function App() {
    return (
        <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
            {/* <ForgotPassword /> */}
        </ChakraProvider>
    );
}

export default App;
