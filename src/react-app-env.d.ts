/// <reference types="react-scripts" />

import { CSSProp } from 'styled-components';

declare module 'react-adsense';

declare module 'raw.macro';

declare module 'react-share';

declare module 'react-router-sitemap';

declare module 'react' {
  interface DOMAttributes<T> {
    css?: CSSProp;
  }
}
declare global {
  namespace JSX {
    /**
     * Do we need to modify `LibraryManagedAttributes` too,
     * to make `className` props optional when `css` props is specified?
     */

    interface IntrinsicAttributes {
      css?: CSSProp;
    }
  }
}
