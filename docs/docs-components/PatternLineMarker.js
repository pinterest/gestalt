// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Text, useColorScheme } from 'gestalt';
import { TOKEN_COLOR_WHITE_MOCHIMALIST_0 } from 'gestalt-design-tokens';
import darkColorDesignTokens from 'gestalt-design-tokens/dist/json/variables-dark.json';
import lightColorDesignTokens from 'gestalt-design-tokens/dist/json/variables-light.json';

type DataVisualizationColors =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12';

export const useHexColor: () => (DataVisualizationColors) => string = () => {
  const { colorSchemeName } = useColorScheme();
  return (vizColor: DataVisualizationColors) =>
    colorSchemeName === 'lightMode'
      ? lightColorDesignTokens[`color-data-visualization-${vizColor}`]
      : darkColorDesignTokens[`color-data-visualization-${vizColor}`];
};

export default function PatternBarFill(): ReactNode {
  const hexColor = useHexColor();

  const decalDotCoordCorrection = {
    '01': { coordinate: [4, 4] },
    '02': { coordinate: [0, 4], fill: 'empty' },
    '03': { coordinate: [4, 4] },
    '04': { coordinate: [5.5, 5.5], fill: 'empty', stroke: 'bold' },
    '05': { coordinate: [0, 4.5] },
    '06': { coordinate: [4, 4], fill: 'empty' },
    '07': { coordinate: [0, 4] },
    '08': { coordinate: [5.5, 5.5], fill: 'empty', stroke: 'bold' },
    '09': { coordinate: [5.5, 5.5] },
    '10': { coordinate: [0, 4.5], fill: 'empty' },
    '11': { coordinate: [5.5, 5.5] },
    '12': { coordinate: [4, 4], fill: 'empty' },
  };

  return (
    <Box>
      <Flex direction="column" gap={2}>
        {[
          { name: 'Main', data: ['01', '02', '03', '04', '05', '06'] },
          { name: 'Extended', data: ['07', '08', '09', '10', '11', '12'] },
        ].map((palette) => (
          <Flex key={palette.name} direction="column" gap={2}>
            <Text size="300" weight="bold">
              {`${palette.name} palette`}
            </Text>
            <Flex gap={2} wrap>
              {palette.data.map((color, idx) => (
                <Flex key={color} direction="column" gap={2}>
                  <Box height={100} width={100}>
                    <svg height="100" viewBox="-10 -10 20 20" width="100">
                      <defs>
                        <g id={`points-01-${idx}-${palette.name}`}>
                          <rect height="8" width="8" />
                        </g>

                        <g id={`points-02-${idx}-${palette.name}`}>
                          <path d="M0,0l4,8h-8z" />
                        </g>

                        <g id={`points-03-${idx}-${palette.name}`}>
                          <path d="M0,0h8l-4,8z" />
                        </g>

                        <g id={`points-04-${idx}-${palette.name}`}>
                          <path
                            d="M36.6629 4.5L44.4605 28.1564L24 42.81L3.53951 28.1564L11.3371 4.5H36.6629Z"
                            transform="scale(0.22)"
                          />
                        </g>

                        <g id={`points-05-${idx}-${palette.name}`}>
                          <rect height="6" transform="rotate(45)" width="6" />
                        </g>

                        <g id={`points-06-${idx}-${palette.name}`}>
                          <rect height="8" width="8" />
                        </g>

                        <g id={`points-07-${idx}-${palette.name}`}>
                          <path d="M0,0l4,8h-8z" />
                        </g>

                        <g id={`points-08-${idx}-${palette.name}`}>
                          <path
                            d="M24 3.45525L42 13.741V34.259L24 44.5447L6 34.259V13.741L24 3.45525Z"
                            transform="scale(0.22)"
                          />
                        </g>

                        <g id={`points-09-${idx}-${palette.name}`}>
                          <path
                            d="M24 1.5L48 18.6885L38.8328 46.5H9.16718L0 18.6885L24 1.5Z"
                            transform="scale(0.22)"
                          />
                        </g>

                        <g id={`points-10-${idx}-${palette.name}`}>
                          <rect height="6" transform="rotate(45)" width="6" />
                        </g>

                        <g id={`points-11-${idx}-${palette.name}`}>
                          <path
                            d="M24 3.45525L42 13.741V34.259L24 44.5447L6 34.259V13.741L24 3.45525Z"
                            transform="scale(0.22)"
                          />
                        </g>

                        <g id={`points-12-${idx}-${palette.name}`}>
                          <path d="M0,0h8l-4,8z" />
                        </g>
                      </defs>
                      <use
                        fill={
                          decalDotCoordCorrection[color].fill === 'empty'
                            ? TOKEN_COLOR_WHITE_MOCHIMALIST_0
                            : hexColor(color)
                        }
                        href={`#points-${color}-${idx}-${palette.name}`}
                        stroke={hexColor(color)}
                        strokeWidth={decalDotCoordCorrection[color].stroke === 'bold' ? '6' : '1.5'}
                        x={0 - decalDotCoordCorrection[color].coordinate[0]}
                        y={0 - decalDotCoordCorrection[color].coordinate[1]}
                      />
                    </svg>
                  </Box>
                  <Text size="200">{`Marker: ${color}`}</Text>{' '}
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}
