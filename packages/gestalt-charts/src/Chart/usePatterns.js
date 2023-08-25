// @flow strict-local
import { type Node } from 'react';
import { useColorScheme } from 'gestalt';
import { type DataVisualizationColors } from './types.js';

export default function usePatterns(): Node {
  const theme = useColorScheme();

  const hexColor = (vizColor: DataVisualizationColors) =>
    theme[`colorDataVisualization${vizColor}`];

  return (
    <defs>
      <pattern id="pattern-01" width="10" height="10" patternUnits="userSpaceOnUse">
        <polygon points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2" fill={hexColor('01')} />
      </pattern>

      <pattern
        id="pattern-02"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="2" height="4" fill={hexColor('02')} />
      </pattern>

      <pattern id="pattern-03" width="5" height="5" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="2" fill={hexColor('03')} />
      </pattern>

      <pattern
        id="pattern-04"
        x="0"
        y="0"
        width="10"
        height="10"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect x="0" width="5" height="5" y="0" fill={hexColor('04')} />
        <rect x="5" width="5" height="5" y="5" fill={hexColor('04')} />
      </pattern>

      <pattern
        id="pattern-05"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(135)"
      >
        <rect width="2" height="4" fill={hexColor('05')} />
      </pattern>

      <pattern id="pattern-06" width="10" height="7" patternUnits="userSpaceOnUse">
        <ellipse cx="5" cy="3" rx="5" ry="3" fill={hexColor('06')} />
      </pattern>

      <pattern
        id="pattern-07"
        width="10"
        height="10"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <polygon points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2" fill={hexColor('07')} />
      </pattern>

      <pattern
        id="pattern-08"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(90)"
      >
        <rect width="2" height="4" fill={hexColor('08')} />
      </pattern>

      <pattern id="pattern-09" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect x="0" width="5" height="5" y="0" fill={hexColor('09')} />
        <rect x="4" width="4" height="4" y="4" fill={hexColor('09')} />
      </pattern>

      <pattern
        id="pattern-10"
        width="10"
        height="7"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(90)"
      >
        <ellipse cx="5" cy="3" rx="5" ry="3" fill={hexColor('10')} />
      </pattern>

      <pattern
        id="pattern-11"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(180)"
      >
        <rect width="2" height="4" fill={hexColor('11')} />
      </pattern>

      <pattern id="pattern-12" width="2" height="2" patternUnits="userSpaceOnUse">
        <circle cx="0.5" cy="0.5" r="0.5" fill={hexColor('12')} />
      </pattern>
    </defs>
  );
}
