import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SidebarWithHeader from "./components/SidebarWithHeader";
import Statistics from "./components/Statistics"
import Planer from "./components/Planer" 
import Settings from "./components/Settings"

import {  extendBaseTheme, Button } from "@chakra-ui/react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SidebarWithHeader />,
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
]);

const theme = extendBaseTheme({
    components: {
        Button,
    },
});
function App() {
        return <RouterProvider router={router} />
}

export default App;
