import { ReactNode } from 'react';
import { useColorScheme } from 'gestalt';
import {
  TOKEN_COLOR_BORDER_CONTAINER,
  TOKEN_COLOR_WHITE_MOCHIMALIST_0,
} from 'gestalt-design-tokens';
import darkColorDesignTokens from 'gestalt-design-tokens/dist/json/variables-dark.json';
import lightColorDesignTokens from 'gestalt-design-tokens/dist/json/variables-light.json';
import { DataVisualizationColors } from './types';

export const useHexColor: () => (arg1: DataVisualizationColors) => string = () => {
  const { colorSchemeName } = useColorScheme();
  return (vizColor: DataVisualizationColors) =>
    colorSchemeName === 'lightMode'
      ? lightColorDesignTokens[`color-data-visualization-${vizColor}`]
      : darkColorDesignTokens[`color-data-visualization-${vizColor}`];
};

export default function usePatterns() {
  const hexColor = useHexColor();

  return (
    <defs>
      {/* Line series markers */}
      <g id="points-01">
        <rect height="8" width="8" />
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
        <rect height="6" transform="rotate(45)" width="6" />
      </g>

      <g id="points-06">
        <rect height="8" width="8" />
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
        <rect height="6" transform="rotate(45)" width="6" />
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

      <pattern height="4" id="pattern-01" patternUnits="userSpaceOnUse" width="4">
        <rect fill={hexColor('01')} height="4" width="4" />
      </pattern>

      <pattern height="5" id="pattern-02" patternUnits="userSpaceOnUse" width="5">
        <rect fill={TOKEN_COLOR_WHITE_MOCHIMALIST_0} height="5" width="5" />
        <circle cx="2" cy="2" fill={hexColor('02')} r="2" />
      </pattern>

      <pattern height="3" id="pattern-03" patternUnits="userSpaceOnUse" width="3">
        <rect fill={TOKEN_COLOR_WHITE_MOCHIMALIST_0} height="3" width="3" />
        <rect fill={hexColor('03')} height="2" width="2" />
      </pattern>

      <pattern height="7" id="pattern-04" patternUnits="userSpaceOnUse" width="7">
        <rect fill={TOKEN_COLOR_WHITE_MOCHIMALIST_0} height="7" width="7" />
        <circle
          cx="3"
          cy="3"
          fill={TOKEN_COLOR_WHITE_MOCHIMALIST_0}
          r="2.5"
          stroke={hexColor('04')}
          strokeWidth="1px"
        />
      </pattern>

      <pattern height="8" id="pattern-05" patternUnits="userSpaceOnUse" width="8">
        <rect fill={hexColor('05')} height="8" width="8" x="0" y="0" />
        <path
          d="M 0 0 L 4 8 L 8 0"
          fill="none"
          stroke={TOKEN_COLOR_WHITE_MOCHIMALIST_0}
          strokeWidth="1"
        />
      </pattern>

      <pattern height="4" id="pattern-06" patternUnits="userSpaceOnUse" width="4">
        <rect
          fill={TOKEN_COLOR_WHITE_MOCHIMALIST_0}
          height="4"
          stroke={hexColor('06')}
          strokeWidth="1px"
          width="4"
        />
      </pattern>

      <pattern
        height="8"
        id="pattern-07"
        patternTransform="rotate(90)"
        patternUnits="userSpaceOnUse"
        width="8"
      >
        <rect fill={TOKEN_COLOR_WHITE_MOCHIMALIST_0} height="8" width="8" />
        <path d="M 0 0 L 4 8 L 8 0" fill="none" stroke={hexColor('07')} strokeWidth="1" />
      </pattern>

      <pattern height="8" id="pattern-08" patternUnits="userSpaceOnUse" width="8" x="0" y="0">
        <rect fill={TOKEN_COLOR_WHITE_MOCHIMALIST_0} height="8" width="8" />
        <rect fill={hexColor('08')} height="4" width="4" x="0" y="0" />
        <rect fill={hexColor('08')} height="4" width="4" x="4" y="4" />
      </pattern>

      <pattern
        height="4"
        id="pattern-09"
        patternTransform="rotate(90)"
        patternUnits="userSpaceOnUse"
        width="4"
      >
        <rect fill={TOKEN_COLOR_WHITE_MOCHIMALIST_0} height="4" width="4" />
        <rect fill={hexColor('09')} height="4" width="2" />
      </pattern>

      <pattern
        height="8"
        id="pattern-10"
        patternTransform="rotate(45)"
        patternUnits="userSpaceOnUse"
        width="8"
        x="0"
        y="0"
      >
        <rect fill={TOKEN_COLOR_WHITE_MOCHIMALIST_0} height="8" width="8" />
        <rect fill={hexColor('10')} height="5" width="5" x="0" y="0" />
      </pattern>

      <pattern
        height="4"
        id="pattern-11"
        patternTransform="rotate(180)"
        patternUnits="userSpaceOnUse"
        width="4"
      >
        <rect fill={TOKEN_COLOR_WHITE_MOCHIMALIST_0} height="4" width="4" />
        <rect fill={hexColor('11')} height="4" width="2" />
      </pattern>

      <pattern
        height="8"
        id="pattern-12"
        patternTransform="rotate(45)"
        patternUnits="userSpaceOnUse"
        width="8"
        x="0"
        y="0"
      >
        <rect fill={hexColor('12')} height="8" width="8" x="0" y="0" />
        <rect fill={TOKEN_COLOR_WHITE_MOCHIMALIST_0} height="4" width="4" x="0" y="0" />
      </pattern>

      <pattern
        height="4"
        id="pattern-referencearea-01"
        patternTransform="rotate(45)"
        patternUnits="userSpaceOnUse"
        width="4"
      >
        <rect fill={TOKEN_COLOR_BORDER_CONTAINER} height="4" width="2" />
      </pattern>
    </defs>
  );
}
