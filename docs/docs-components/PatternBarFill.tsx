import { Box, Flex, Mask, Text, useColorScheme } from 'gestalt';
import { TOKEN_COLOR_WHITE_MOCHIMALIST_0 } from 'gestalt-design-tokens';
import darkColorDesignTokens from 'gestalt-design-tokens/dist/json/classic/variables-dark.json';
import lightColorDesignTokens from 'gestalt-design-tokens/dist/json/classic/variables-light.json';

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
  | '12'
  | 'neutral';

export const useHexColor: () => (arg1: DataVisualizationColors) => string = () => {
  const { colorSchemeName } = useColorScheme();

  return (vizColor: DataVisualizationColors) => {
    if (vizColor === 'neutral') {
      return colorSchemeName === 'lightMode'
        ? lightColorDesignTokens['color-background-chartgraph-neutral']
        : darkColorDesignTokens['color-background-chartgraph-neutral'];
    }

    return colorSchemeName === 'lightMode'
      ? lightColorDesignTokens[`color-data-visualization-${vizColor}`]
      : darkColorDesignTokens[`color-data-visualization-${vizColor}`];
  };
};

export default function PatternBarFill() {
  const hexColor = useHexColor();

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
                    <Mask height={100} rounding={4} width={100}>
                      <svg height="100" width="100">
                        <defs>
                          <pattern
                            height="4"
                            id={`pattern-01-${idx}-${palette.name}`}
                            patternUnits="userSpaceOnUse"
                            width="4"
                          >
                            <rect fill={hexColor('01')} height="4" width="4" />
                          </pattern>
                          <pattern
                            height="5"
                            id={`pattern-02-${idx}-${palette.name}`}
                            patternUnits="userSpaceOnUse"
                            width="5"
                          >
                            <circle cx="2" cy="2" fill={hexColor('02')} r="2" />
                          </pattern>
                          <pattern
                            height="3"
                            id={`pattern-03-${idx}-${palette.name}`}
                            patternUnits="userSpaceOnUse"
                            width="3"
                          >
                            <rect fill={hexColor('03')} height="2" width="2" />
                          </pattern>
                          <pattern
                            height="7"
                            id={`pattern-04-${idx}-${palette.name}`}
                            patternUnits="userSpaceOnUse"
                            width="7"
                          >
                            <circle
                              cx="3"
                              cy="3"
                              fill={TOKEN_COLOR_WHITE_MOCHIMALIST_0}
                              r="2.5"
                              stroke={hexColor('04')}
                              strokeWidth="1px"
                            />
                          </pattern>
                          <pattern
                            height="8"
                            id={`pattern-05-${idx}-${palette.name}`}
                            patternUnits="userSpaceOnUse"
                            width="8"
                          >
                            <rect fill={hexColor('05')} height="8" width="8" x="0" y="0" />
                            <path
                              d="M 0 0 L 4 8 L 8 0"
                              fill="none"
                              stroke={TOKEN_COLOR_WHITE_MOCHIMALIST_0}
                              strokeWidth="1"
                            />
                          </pattern>
                          <pattern
                            height="4"
                            id={`pattern-06-${idx}-${palette.name}`}
                            patternUnits="userSpaceOnUse"
                            width="4"
                          >
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
                            id={`pattern-07-${idx}-${palette.name}`}
                            patternTransform="rotate(90)"
                            patternUnits="userSpaceOnUse"
                            width="8"
                          >
                            <path
                              d="M 0 0 L 4 8 L 8 0"
                              fill="none"
                              stroke={hexColor('07')}
                              strokeWidth="1"
                            />
                          </pattern>
                          <pattern
                            height="8"
                            id={`pattern-08-${idx}-${palette.name}`}
                            patternUnits="userSpaceOnUse"
                            width="8"
                            x="0"
                            y="0"
                          >
                            <rect fill={hexColor('08')} height="4" width="4" x="0" y="0" />
                            <rect fill={hexColor('08')} height="4" width="4" x="4" y="4" />
                          </pattern>
                          <pattern
                            height="4"
                            id={`pattern-09-${idx}-${palette.name}`}
                            patternTransform="rotate(90)"
                            patternUnits="userSpaceOnUse"
                            width="4"
                          >
                            <rect fill={hexColor('09')} height="4" width="2" />
                          </pattern>
                          <pattern
                            height="8"
                            id={`pattern-10-${idx}-${palette.name}`}
                            patternTransform="rotate(45)"
                            patternUnits="userSpaceOnUse"
                            width="8"
                            x="0"
                            y="0"
                          >
                            <rect fill={hexColor('10')} height="5" width="5" x="0" y="0" />
                          </pattern>
                          <pattern
                            height="4"
                            id={`pattern-11-${idx}-${palette.name}`}
                            patternTransform="rotate(180)"
                            patternUnits="userSpaceOnUse"
                            width="4"
                          >
                            <rect fill={hexColor('11')} height="4" width="2" />
                          </pattern>
                          <pattern
                            height="8"
                            id={`pattern-12-${idx}-${palette.name}`}
                            patternTransform="rotate(45)"
                            patternUnits="userSpaceOnUse"
                            width="8"
                            x="0"
                            y="0"
                          >
                            <rect fill={hexColor('12')} height="8" width="8" x="0" y="0" />
                            <rect
                              fill={TOKEN_COLOR_WHITE_MOCHIMALIST_0}
                              height="4"
                              width="4"
                              x="0"
                              y="0"
                            />
                          </pattern>
                        </defs>
                        <rect
                          height="100"
                          style={{ fill: `url(#pattern-${color}-${idx}-${palette.name})` }}
                          width="100"
                          x="0"
                          y="0"
                        />
                      </svg>
                    </Mask>
                  </Box>
                  <Text size="200">{`Pattern: ${color}`}</Text>{' '}
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}
