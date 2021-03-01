const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                dark: colors.coolGray,
                palenight: '#292D3E',
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: 'hsl(180, 100%, 97%)',
                        blockquote: {
                            color: theme('colors.gray.200'),
                            borderLeftColor: theme('colors.blue.500'),
                        },
                        h1: {
                            color: 'hsl(39, 100%, 71%)',
                        },
                        h2: {
                            color: 'hsl(39, 100%, 71%)',
                        },
                        h3: {
                            color: 'hsl(39, 100%, 71%)',
                        },
                        h4: {
                            color: 'hsl(39, 100%, 71%)',
                        },
                        h5: {
                            color: 'hsl(39, 100%, 71%)',
                        },
                        h6: {
                            color: 'hsl(39, 100%, 71%)',
                        },
                        a: {
                            color: theme('colors.blue.700'),
                            '&:hover': {
                                color: theme('colors.blue.700'),
                                textDecoration: 'none',
                            },
                        },
                    },
                },
            }),
        },
    },
    variants: {},
    plugins: [require('@tailwindcss/typography')],
};
