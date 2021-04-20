const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
    prefix: '',
    purge: {
      enabled: guessProductionMode(),
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'media',
    theme: {
      extend: {
        colors: {
          'primary': {
            DEFAULT: '#11A1FD',
            '50': '#F5FBFF',
            '100': '#DBF1FF',
            '200': '#A9DDFE',
            '300': '#76C9FE',
            '400': '#44B5FD',
            '500': '#11A1FD',
            '600': '#0285D9',
            '700': '#0166A7',
            '800': '#014774',
            '900': '#012841'
          },
          'basic': {
            DEFAULT: '#7D9EB5',
            '50': '#FFFFFF',
            '100': '#FFFFFF',
            '200': '#DEE7ED',
            '300': '#BECFDA',
            '400': '#9DB6C8',
            '500': '#7D9EB5',
            '600': '#5C86A3',
            '700': '#4A6B82',
            '800': '#375062',
            '900': '#253641'
          },
          'info': {
            DEFAULT: '#5A75F8',
            '50': '#FFFFFF',
            '100': '#FFFFFF',
            '200': '#EDF0FE',
            '300': '#BCC7FC',
            '400': '#8B9EFA',
            '500': '#5A75F8',
            '600': '#294CF6',
            '700': '#0A2FE2',
            '800': '#0825B1',
            '900': '#051A81'
          },
          'success': {
            DEFAULT: '#07C180',
            '50': '#B1FCE2',
            '100': '#99FBD9',
            '200': '#67FAC6',
            '300': '#36F8B4',
            '400': '#09F2A1',
            '500': '#07C180',
            '600': '#05905F',
            '700': '#035F3F',
            '800': '#022D1E',
            '900': '#000000'
          },
          'warn': {
            DEFAULT: '#FF9931',
            '50': '#FFFFFF',
            '100': '#FFFEFD',
            '200': '#FFE5CA',
            '300': '#FFCC97',
            '400': '#FFB264',
            '500': '#FF9931',
            '600': '#FD8000',
            '700': '#CA6600',
            '800': '#974C00',
            '900': '#643200'
          },
          'black': {
            DEFAULT: '#223345',
            '50': '#88A5C4',
            '100': '#7799BC',
            '200': '#557FAB',
            '300': '#446689',
            '400': '#334C67',
            '500': '#223345',
            '600': '#111A23',
            '700': '#000001',
            '800': '#000000',
            '900': '#000000'
          },
          'danger': {
            DEFAULT: '#FF3131',
            '50': '#FFFFFF',
            '100': '#FFFDFD',
            '200': '#FFCACA',
            '300': '#FF9797',
            '400': '#FF6464',
            '500': '#FF3131',
            '600': '#FD0000',
            '700': '#CA0000',
            '800': '#970000',
            '900': '#640000'
          },
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms'),require('@tailwindcss/line-clamp')],
};
