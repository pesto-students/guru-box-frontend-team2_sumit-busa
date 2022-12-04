import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

// import { createTheme } from '@mui/material';
//
// const theme = createTheme({
//   // breakpoints: {
//   //   values: {
//   //     xs: 0,
//   //     sm: 0,
//   //     md: 0,
//   //     lg: 900,
//   //     xl: 900,
//   //   },
//   // },
//   typography: {
//     fontFamily: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'].join(','),
//   },
//   palette: {
//     primary: {
//       main: '#0056FD',
//     },
//   },
// });
//
// export default theme;

import { extendTheme } from '@chakra-ui/react';

import breakpoints from './breakpoints';
import colors from './colors';
import fonts from './fonts';
import components from './components';
import styles from './styles';

const theme = extendTheme({ breakpoints, colors, fonts, components, styles });

export default theme;