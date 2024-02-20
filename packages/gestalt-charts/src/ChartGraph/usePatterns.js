// @flow strict-local
import { type Node as ReactNode } from 'react';
import { useColorScheme } from 'gestalt';
import darkColorDesignTokens from 'gestalt-design-tokens/dist/json/variables-dark.json';
import lightColorDesignTokens from 'gestalt-design-tokens/dist/json/variables-light.json';
import { type DataVisualizationColors } from './types';

export const useHexColor: () => (DataVisualizationColors) => string = () => {
  const { name: colorSchemeName } = useColorScheme();
  return (vizColor: DataVisualizationColors) =>
    colorSchemeName === 'lightMode'
      ? lightColorDesignTokens[`color-data-visualization-${vizColor}`]
      : darkColorDesignTokens[`color-data-visualization-${vizColor}`];
};

export default function usePatterns(): ReactNode {
  const hexColor = useHexColor();

  return (
    <defs>
      {/* Line series markers */}
      <g id="points-01">
        <rect width="8" height="8" />
      </g>

      <g id="points-02">
        <path d="M0,0l4,8h-8z" />
      </g>

      <g id="points-03">
        <path d="M0,0h8l-4,8z" />
      </g>

      <g id="points-04">
        <path
          d="M36.6629 4.5L44.4605 28.1564L24 42.81L3.53951 28.1564L11.3371 4.5H36.6629Z"
          transform="scale(0.22)"
        />
      </g>

      <g id="points-05">
        <rect width="6" height="6" transform="rotate(45)" />
      </g>

      <g id="points-06">
        <rect width="8" height="8" />
      </g>

      <g id="points-07">
        <path d="M0,0l4,8h-8z" />
      </g>

      <g id="points-08">
        <path
          d="M24 3.45525L42 13.741V34.259L24 44.5447L6 34.259V13.741L24 3.45525Z"
          transform="scale(0.22)"
        />
      </g>

      <g id="points-09">
        <path
          d="M24 1.5L48 18.6885L38.8328 46.5H9.16718L0 18.6885L24 1.5Z"
          transform="scale(0.22)"
        />
      </g>

      <g id="points-10">
        <rect width="6" height="6" transform="rotate(45)" />
      </g>

      <g id="points-11">
        <path
          d="M24 3.45525L42 13.741V34.259L24 44.5447L6 34.259V13.741L24 3.45525Z"
          transform="scale(0.22)"
        />
      </g>

      <g id="points-12">
        <path d="M0,0h8l-4,8z" />
      </g>

      {/* Bar pattern fills */}

      <pattern id="pattern-01" width="4" height="4" patternUnits="userSpaceOnUse">
        <rect width="4" height="4" fill={hexColor('01')} />
      </pattern>

      <pattern id="pattern-02" width="5" height="5" patternUnits="userSpaceOnUse">
        <rect width="5" height="5" fill="var(--color-white-mochimalist-0)" />
        <circle cx="2" cy="2" r="2" fill={hexColor('02')} />
      </pattern>

      <pattern id="pattern-03" width="3" height="3" patternUnits="userSpaceOnUse">
        <rect width="3" height="3" fill="var(--color-white-mochimalist-0)" />
        <rect width="2" height="2" fill={hexColor('03')} />
      </pattern>

      <pattern id="pattern-04" width="7" height="7" patternUnits="userSpaceOnUse">
        <rect width="7" height="7" fill="var(--color-white-mochimalist-0)" />
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
        <rect width="8" height="8" fill="var(--color-white-mochimalist-0)" />
        <path d="M 0 0 L 4 8 L 8 0" stroke={hexColor('07')} strokeWidth="1" fill="none" />
      </pattern>

      <pattern id="pattern-08" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="var(--color-white-mochimalist-0)" />
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
        <rect width="4" height="4" fill="var(--color-white-mochimalist-0)" />
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
        <rect width="8" height="8" fill="var(--color-white-mochimalist-0)" />
        <rect x="0" width="5" height="5" y="0" fill={hexColor('10')} />
      </pattern>

      <pattern
        id="pattern-11"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(180)"
      >
        <rect width="4" height="4" fill="var(--color-white-mochimalist-0)" />
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
