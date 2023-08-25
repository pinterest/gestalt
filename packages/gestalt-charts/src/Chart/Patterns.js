// @flow strict-local
import { type Node } from 'react';
import { useHexPalette } from './helpers.js';

export default function Patterns(): Node {
  const hexColors = useHexPalette();

  return (
    <defs>
      <pattern id="pattern-A" width="10" height="10" patternUnits="userSpaceOnUse">
        <polygon points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2" fill={hexColors[0]} />
      </pattern>
      <pattern
        id="pattern-B"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="2" height="4" fill={hexColors[1]} />
      </pattern>
      <pattern
        id="pattern-C"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(135)"
      >
        <rect width="2" height="4" fill={hexColors[2]} />
      </pattern>
    </defs>
  );
}
