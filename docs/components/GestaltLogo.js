// @flow strict
import { type Node } from 'react';

// Gestalt Logo context

type GestastLogoVariant = '01' | '02' | '03' | '04';

const LOGOS_PATHS = ['01', '02', '03', '04'];

export const getLogoVariant: GestastLogoVariant =
  LOGOS_PATHS[Math.floor(Math.random() * LOGOS_PATHS.length)];

// Gestalt Logo SVGs

const GestaltLogoSvg = ({ children }: {| children: Node |}) => (
  <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

type GestaltLogoType = () => Node;

const GestaltLogoO1: GestaltLogoType = () => (
  <GestaltLogoSvg>
    <path d="M100 50H50L100 100V50Z" fill="#48D5C6" />
    <path
      d="M5.54507e-07 50C2.48261e-07 77.6142 22.3858 100 50 100L50 50L5.54507e-07 50Z"
      fill="#ABDBFF"
    />
    <path d="M50 0C22.3858 0 0 22.3858 0 50H50V0Z" fill="#00857C" />
  </GestaltLogoSvg>
);

const GestaltLogoO2: GestaltLogoType = () => (
  <GestaltLogoSvg>
    <path d="M100 50H50L100 100V50Z" fill="#EB4242" />
    <path
      d="M5.54507e-07 50C2.48261e-07 77.6142 22.3858 100 50 100L50 50L5.54507e-07 50Z"
      fill="#0074E8"
    />
    <path d="M50 0C22.3858 0 0 22.3858 0 50H50V0Z" fill="#FFBED2" />
  </GestaltLogoSvg>
);

const GestaltLogoO3: GestaltLogoType = () => (
  <GestaltLogoSvg>
    <path d="M100 50H50L100 100V50Z" fill="#FDA161" />
    <path
      d="M5.54507e-07 50C2.48261e-07 77.6142 22.3858 100 50 100L50 50L5.54507e-07 50Z"
      fill="#B190FF"
    />
    <path d="M50 0C22.3858 0 0 22.3858 0 50H50V0Z" fill="#0074E8" />
  </GestaltLogoSvg>
);

const GestaltLogoO4: () => Node = () => (
  <GestaltLogoSvg>
    <path d="M100 50H50L100 100V50Z" fill="#26C0B4" />
    <path
      d="M5.54507e-07 50C2.48261e-07 77.6142 22.3858 100 50 100L50 50L5.54507e-07 50Z"
      fill="#0074E8"
    />
    <path d="M50 0C22.3858 0 0 22.3858 0 50H50V0Z" fill="#FDC900" />
  </GestaltLogoSvg>
);

export default function GestaltLogo(): Node {
  switch (getLogoVariant) {
    case '01':
      return <GestaltLogoO1 />;
    case '02':
      return <GestaltLogoO2 />;
    case '03':
      return <GestaltLogoO3 />;
    case '04':
      return <GestaltLogoO4 />;
    default:
      return <GestaltLogoO1 />;
  }
}
