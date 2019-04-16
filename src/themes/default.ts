interface IArrayExtended {
  [index: number]: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

const breakpoints: IArrayExtended = ['480px', '992px', '1200px', '1600px'];

breakpoints.sm = breakpoints[1];
breakpoints.md = breakpoints[2];
breakpoints.lg = breakpoints[3];
breakpoints.xl = breakpoints[4];

export default {
  breakpoints,
  colors: {
    blue: 'cornflowerblue',
    darkGrey: '#777',
    grey: '#aaa',
    lightGrey: '#ddd',
    white: '#fff',
  },
  space: ['0', '.25rem', '.5rem', '.75rem', '1rem'],
};
