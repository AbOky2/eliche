import { createTheme } from '@material-ui/core/styles';
import '@fontsource/space-grotesk';

const shared = {
  colors: {
    primary: '#1A2E6C',
    newBlue: '#4F80FF',
    normalBlue: '#3679FF',
    newDarkBlue: '#113EB6',
    newLightBlue: '#849CD9',
    mapBlueOverlay: '#4f80ff8a',
    newGray: '#8C97B6',
    lightBlue: '#D2DCF5',
    hoverGray: '#F4F5F7',
    lighterGray: '#1a2e6c80',
    iconBlue: '#5379EF',
    gray: '#c7cfd6',
    grayBlue: '#EFF4FF',
    lightGray: '#E2E2E2',
    white: '#fff',
    red: '#E02A50',
    newDark: '#272832',
    newBlack: '#0E0E2C',
  },
  fonts: {
    titles: {
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
    others: {
      fontSize: '1.8rem',
      lineHeight: '2.8rem',
    },
    secondFontFamily: 'Nunito',
  },
};

const theme = createTheme({
  overrides: {
    MuiBackdrop: {
      root: {
        background:
          'linear-gradient(109.69deg, rgba(204, 149, 223, 0.3) 6.69%, rgba(79, 128, 255, 0.3) 63.14%)',
      },
    },
  },
  ui: {
    bordered: {
      borderRadius: 15,
    },
  },
  palette: {
    primary: {
      main: shared.colors.newBlue,
    },
    newBlue: shared.colors.newBlue,
    newDarkBlue: shared.colors.newDarkBlue,
    newLightBlue: shared.colors.newLightBlue,
    normalBlue: shared.colors.normalBlue,
    blue: shared.colors.primary,
    red: shared.colors.red,
    gray: shared.colors.gray,
    grayBlue: shared.colors.grayBlue,
    newGray: shared.colors.newGray,
    lightGray: shared.colors.lightGray,
    lighterGray: shared.colors.lighterGray,
    hoverGray: shared.colors.hoverGray,
    lightBlue: shared.colors.lightBlue,
    newBlack: shared.colors.newBlack,
    button: shared.colors.button,
  },
  space: {
    bodyWrapper: {
      padding: '2rem',
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: 'Space Grotesk',
    secondFontFamily: shared.fonts.secondFontFamily,
    h1: {
      ...shared.fonts.titles,
      fontFamily: 'Space Grotesk',
      fontSize: '3rem',
      lineHeight: '4.1rem',
      color: shared.colors.newBlue,
    },
    h2: {
      ...shared.fonts.titles,
      fontFamily: 'Space Grotesk',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '1.8rem',
      lineHeight: '2.3rem',
      color: shared.colors.newDark,
    },
    h3: {
      ...shared.fonts.titles,
      ...shared.fonts.others,
      lineHeight: '2.7rem',
      fontFamily: 'Space Grotesk',
      color: shared.colors.newBlue,
      fontSize: '2rem',
    },
    h4: {
      ...shared.fonts.titles,
      ...shared.fonts.others,
      fontFamily: 'Space Grotesk',
      color: shared.colors.primary,
    },
    subtitle1: {
      ...shared.fonts.titles,
      ...shared.fonts.others,
      fontWeight: '600',
      color: shared.colors.primary,
    },
    body1: {
      fontStyle: 'normal',
      fontFamily: 'Space Grotesk',
      fontWeight: '500',
      fontSize: '1.4rem',
      lineHeight: '1.8rem!important',
      color: '#6976A0',
      marginBottom: '0.4rem',
    },
  },
});
theme.ui.listContainer = {
  width: '25%',
  marginBottom: '2rem',
  '&:nth-child(3n+2)': {
    padding: '0 1rem 0rem',
  },
  '&:nth-child(3n+1)': {
    paddingRight: '1rem',
  },
  '&:nth-child(3n+3)': {
    paddingLeft: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '0!important',
    '&:last-child': {
      marginBottom: 0,
    },
  },
};
theme.ui.searchInput = {
  fontFamily: theme.typography.fontFamily,
  color: '#6976A0',
  fontSize: '12px',
  fontWeight: '600!important',
  lineHeight: '2rem!important',
};
export { theme, shared };
