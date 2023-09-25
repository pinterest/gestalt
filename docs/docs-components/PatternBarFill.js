// @flow strict
import { type Node } from 'react';
import { Box, Flex, Mask, Text, useColorScheme } from 'gestalt';

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
  const theme = useColorScheme();
  return (vizColor: DataVisualizationColors) => theme[`colorDataVisualization${vizColor}`];
};

export default function PatternBarFill(): Node {
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
            <Flex wrap gap={2}>
              {palette.data.map((color, idx) => (
                <Flex key={color} direction="column" gap={2}>
                  <Box height={100} width={100}>
                    <Mask height={100} width={100} rounding={4}>
                      <svg height="100" width="100">
                        <defs>
                          <pattern
                            id={`pattern-01-${idx}`}
                            width="4"
                            height="4"
                            patternUnits="userSpaceOnUse"
                          >
                            <rect width="4" height="4" fill={hexColor('01')} />
                          </pattern>
                          <pattern
                            id={`pattern-02-${idx}`}
                            width="5"
                            height="5"
                            patternUnits="userSpaceOnUse"
                          >
                            <circle cx="2" cy="2" r="2" fill={hexColor('02')} />
                          </pattern>
                          <pattern
                            id={`pattern-03-${idx}`}
                            width="3"
                            height="3"
                            patternUnits="userSpaceOnUse"
                          >
                            <rect width="2" height="2" fill={hexColor('03')} />
                          </pattern>
                          <pattern
                            id={`pattern-04-${idx}`}
                            width="7"
                            height="7"
                            patternUnits="userSpaceOnUse"
                          >
                            <circle
                              cx="3"
                              cy="3"
                              r="2.5"
                              fill="var(--color-white-mochimalist-0)"
                              stroke={hexColor('04')}
                              strokeWidth="1px"
                            />
                          </pattern>
                          <pattern
                            id={`pattern-05-${idx}`}
                            width="8"
                            height="8"
                            patternUnits="userSpaceOnUse"
                          >
                            <rect x="0" width="8" height="8" y="0" fill={hexColor('05')} />
                            <path
                              d="M 0 0 L 4 8 L 8 0"
                              stroke="var(--color-white-mochimalist-0)"
                              strokeWidth="1"
                              fill="none"
                            />
                          </pattern>
                          <pattern
                            id={`pattern-06-${idx}`}
                            width="4"
                            height="4"
                            patternUnits="userSpaceOnUse"
                          >
                            <rect
                              width="4"
                              height="4"
                              fill="var(--color-white-mochimalist-0)"
                              stroke={hexColor('06')}
                              strokeWidth="1px"
                            />
                          </pattern>
                          <pattern
                            id={`pattern-07-${idx}`}
                            width="8"
                            height="8"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(90)"
                          >
                            <path
                              d="M 0 0 L 4 8 L 8 0"
                              stroke={hexColor('07')}
                              strokeWidth="1"
                              fill="none"
                            />
                          </pattern>
                          <pattern
                            id={`pattern-08-${idx}`}
                            x="0"
                            y="0"
                            width="8"
                            height="8"
                            patternUnits="userSpaceOnUse"
                          >
                            <rect x="0" width="4" height="4" y="0" fill={hexColor('08')} />
                            <rect x="4" width="4" height="4" y="4" fill={hexColor('08')} />
                          </pattern>
                          <pattern
                            id={`pattern-09-${idx}`}
                            width="4"
                            height="4"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(90)"
                          >
                            <rect width="2" height="4" fill={hexColor('09')} />
                          </pattern>
                          <pattern
                            id={`pattern-10-${idx}`}
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
                            id={`pattern-11-${idx}`}
                            width="4"
                            height="4"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(180)"
                          >
                            <rect width="2" height="4" fill={hexColor('11')} />
                          </pattern>
                          <pattern
                            id={`pattern-12-${idx}`}
                            x="0"
                            y="0"
                            width="8"
                            height="8"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(45)"
                          >
                            <rect x="0" width="8" height="8" y="0" fill={hexColor('12')} />
                            <rect
                              x="0"
                              width="4"
                              height="4"
                              y="0"
                              fill="var(--color-white-mochimalist-0)"
                            />
                          </pattern>
                        </defs>
                        <rect
                          style={{ fill: `url(#pattern-${color}-${idx})` }}
                          x="0"
                          y="0"
                          height="100"
                          width="100"
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
