import { extendTheme } from "@chakra-ui/react";

const colors = {
    bookTheme: {
        100: '#f5f5dc', // Светло бежово
        200: '#fafafa', // Кремаво
        300: '#e0dcd6', // Светъл пясък
    },
    buttonTheme: {
        primary: '#8b4513', 
        secondary: '#1E88E5', 
        hoverPrimary: '#a0522d', 
        hoverSecondary: '#1565C0', 
    },
    brand: {
        50: '#f0f4f8',
        100: '#d9e2ec',
        200: '#b0bec5',
        300: '#8c9ea3',
        400: '#607d8b',
        500: '#004d40',
        600: '#003d33',
        700: '#002b25',
        800: '#001b19',
        900: '#000a0a',
    },
};

// Персонализиране на шрифтове
const fonts = {
    heading: 'Arial, sans-serif',
    body: 'Poppins, sans-serif',
};

// Персонализиране на размера на бутоните
const components = {
    Button: {
        baseStyle: {
            fontWeight: "700"
        },
        sizes: {
            sm: {
                fontSize: 'sm',
                px: 4,
                py: 2,
            },
            md: {
                fontSize: 'md',
                px: 6,
                py: 3,
            },
            lg: {
                fontSize: 'lg',
                px: 8,
                py: 4,
            },
        },
        variants: {
            solid: {
                bg: 'buttonTheme.primary', // Използва тъмен шоколадов цвят
                color: 'white', // Бял цвят на текста
                _hover: {
                    bg: 'buttonTheme.secondary', // Светло кафяв цвят при задържане на мишката
                },
            },
            outline: {
                borderColor: 'buttonTheme.primary', // Тъмен шоколадов цвят на границата
                color: 'buttonTheme.primary', // Тъмен шоколадов цвят на текста
                _hover: {
                    bg: 'buttonTheme.200', // Кремаво при задържане на мишката
                },
            },
        },
    },

};

export const theme = extendTheme({ colors, fonts, components });
