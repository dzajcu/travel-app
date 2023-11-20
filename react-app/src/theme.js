import { extendTheme } from "@chakra-ui/react";

import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const outline = defineStyle({
    border: "1px", // change the appearance of the border
    borderRadius: "2xl", // remove the border radius
    fontSize: "sm", // change the font size
    _focus: {
        borderColor: "#808000",
        boxShadow: "0 0 0 2px var(--chakra-ui-focus-ring-color)",
    },
});

export const textareaTheme = defineStyleConfig({
    variants: { outline },
});
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
    components: {
        Input: {
            variants: {
                outline: {
                    field: {
                        _focus: {
                            borderColor: "#808000",
                            boxShadow: "0 0 0 2px var(--chakra-ui-focus-ring-color)",
                        },
                    },
                },
            },
        },
        Textarea: textareaTheme,
    },
});
export const toastOptions = {
    position: "top",
    duration: 5000,
    isClosable: true,
    variant: "subtle",
}
export default theme;
