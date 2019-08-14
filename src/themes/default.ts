interface IArrayExtended {
  [index: number]: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

const breakpoints: IArrayExtended = ['480px', '992px', '1200px', '1600px'];

breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

export default {
  breakpoints,
  colors: {
    red: '#e84b33',
    lightRed: '#FC6F6F',
    blue: 'cornflowerblue',
    darkGrey: '#777',
    grey: '#B5B5B5',
    green: '#2AA637',
    orange: '#F19700',
    lightGreen: '#5ecd6e',
    lightGrey: '#ddd',
    white: '#fff',
  },
  designColors: {
    background: '#F1ECCE',
    link: '#F19700',
  },
  space: ['0', '.25rem', '.5rem', '.75rem', '1rem', '1.5rem', '2rem', '2.5rem', '3rem'],
};
