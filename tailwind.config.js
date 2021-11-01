module.exports = {
  purge: {
    enabled: true,
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    // options: {
    //   safelist: ['dark'], //specific classes
    // },
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#f8cb00',
      },
      width: {
        'home-three': '29%',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['active'],
    },
  },
  daisyui: {
    utils: true,
    base: true,
    themes: [
      //     // 'light',
      'bumblebee',
      //     'dark',
      //     'cupcake',
      //     'halloween',
      //     {
      //       divinadark: {
      //         primary: '#570df8',
      //         'primary-focus': '#4506cb',
      //         'primary-content': '#ffffff',
      //         secondary: '#f000b8',
      //         'secondary-focus': '#bd0091',
      //         'secondary-content': '#ffffff',
      //         accent: '#37cdbe',
      //         'accent-focus': '#2aa79b',
      //         'accent-content': '#ffffff',
      //         neutral: '#3d4451',
      //         'neutral-focus': '#2a2e37',
      //         'neutral-content': '#ffffff',
      //         'base-100': '#ffffff',
      //         'base-200': '#f9fafb',
      //         'base-300': '#d1d5db',
      //         'base-content': '#1f2937',
      //         info: '#2094f3',
      //         success: '#009485',
      //         warning: '#ff9900',
      //         error: '#ff5724',
      //       },
      //     },
    ],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}
