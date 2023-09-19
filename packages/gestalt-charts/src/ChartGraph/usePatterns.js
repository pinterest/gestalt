// @flow strict-local
import { type Node } from 'react';
import { useColorScheme } from 'gestalt';
import { type DataVisualizationColors } from './types.js';

export const useHexColor: () => (DataVisualizationColors) => string = () => {
  const theme = useColorScheme();
  return (vizColor: DataVisualizationColors) => theme[`colorDataVisualization${vizColor}`];
};

export default function usePatterns(): Node {
  const hexColor = useHexColor();

  return (
    <defs>
      <g id="points-01">
        <circle r="4" />
      </g>

      <g id="points-02">
        <rect width="8" height="8" transform="rotate(45)" />
      </g>

      <g id="points-03">
        <rect width="8" height="8" />
      </g>

      <g id="points-04">
        <path d="M0,0l4,8h-8z" />
      </g>

      <g id="points-05">
        <path d="M0,0h8l-4,8z" />
      </g>

      <g id="points-06">
        <circle r="2" />
      </g>

      <g id="points-07">
        <rect width="8" height="8" transform="rotate(45)" />
      </g>

      <g id="points-08">
        <rect width="4" height="4" />
      </g>

      <g id="points-09">
        <circle r="4" />
      </g>

      <g id="points-10">
        <rect width="4" height="4" transform="rotate(45)" />
      </g>

      <g id="points-11">
        <path d="M0,0h8l-4,8z" transform="rotate(45)" />
      </g>

      <g id="points-12">
        <path d="M0,0l4,8h-8z" transform="rotate(45)" />
      </g>

      <pattern id="pattern-01" width="4" height="4" patternUnits="userSpaceOnUse">
        <rect width="4" height="4" fill={hexColor('01')} />
      </pattern>

      <pattern id="pattern-02" width="5" height="5" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="2" fill={hexColor('02')} />
      </pattern>

      <pattern id="pattern-03" width="3" height="3" patternUnits="userSpaceOnUse">
        <rect width="2" height="2" fill={hexColor('03')} />
      </pattern>

      <pattern id="pattern-04" width="7" height="7" patternUnits="userSpaceOnUse">
        <circle
          cx="3"
          cy="3"
          r="2.5"
          fill="var(--color-white-mochimalist-0)"
          stroke={hexColor('04')}
          strokeWidth="1px"
        />
      </pattern>

      <pattern id="pattern-05" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect x="0" width="8" height="8" y="0" fill={hexColor('05')} />
        <path
          d="M 0 0 L 4 8 L 8 0"
          stroke="var(--color-white-mochimalist-0)"
          strokeWidth="1"
          fill="none"
        />
      </pattern>

      <pattern id="pattern-06" width="4" height="4" patternUnits="userSpaceOnUse">
        <rect
          width="4"
          height="4"
          fill="var(--color-white-mochimalist-0)"
          stroke={hexColor('06')}
          strokeWidth="1px"
        />
      </pattern>

      <pattern
        id="pattern-07"
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(90)"
      >
        <path d="M 0 0 L 4 8 L 8 0" stroke={hexColor('07')} strokeWidth="1" fill="none" />
      </pattern>

      <pattern id="pattern-08" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect x="0" width="4" height="4" y="0" fill={hexColor('08')} />
        <rect x="4" width="4" height="4" y="4" fill={hexColor('08')} />
      </pattern>

      <pattern
        id="pattern-09"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(90)"
      >
        <rect width="2" height="4" fill={hexColor('09')} />
      </pattern>

      <pattern
        id="pattern-10"
        x="0"
        y="0"
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect x="0" width="5" height="5" y="0" fill={hexColor('10')} />
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

      <pattern
        id="pattern-12"
        x="0"
        y="0"
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect x="0" width="8" height="8" y="0" fill={hexColor('12')} />
        <rect x="0" width="4" height="4" y="0" fill="var(--color-white-mochimalist-0)" />
      </pattern>

      <pattern
        id="pattern-referencearea-01"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="2" height="4" fill="var(--color-border-container)" />
      </pattern>
    </defs>
  );
}
