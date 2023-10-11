import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        body: `'DM Sans', sans-serif`,
    },
    styles: {
        global: {
          body: {
            letterSpacing: "-0.5px",
          },
          button: {
            letterSpacing: "-0.5px",
          },
          
        },
      },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>
);
