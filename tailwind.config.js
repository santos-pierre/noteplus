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
                        color: theme('colors.gray.200'),
                        h1: {
                            color: theme('colors.purple.700'),
                        },
                        h2: {
                            color: theme('colors.purple.700'),
                        },
                        h3: {
                            color: theme('colors.purple.700'),
                        },
                        h4: {
                            color: theme('colors.purple.700'),
                        },
                        h5: {
                            color: theme('colors.purple.700'),
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
