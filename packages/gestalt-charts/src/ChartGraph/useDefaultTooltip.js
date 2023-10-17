// @flow strict-local
import { type Node, useCallback } from 'react';
import { Box, Flex, Text } from 'gestalt';
import LegendIcon from './LegendIcon.js';

export default function useDefaultTooltip({
  isDarkMode,
  labelMap,
  isTimeSeries,
  isRtl,
  tickFormatter,
}: {
  isDarkMode: boolean,
  labelMap: ?{ [string]: string },
  tickFormatter?: {
    timeseries?: (number) => string | number,
    xAxisTop?: (number, number) => string | number,
    xAxisBottom?: (number, number) => string | number,
    yAxisRight?: (number, number) => string | number,
    yAxisLeft?: (number, number) => string | number,
  },
  isTimeSeries?: boolean,
  isRtl: boolean,
}): ({
  active: boolean,
  payload: $ReadOnlyArray<{
    dataKey: string,
    name: string,
    stroke: ?string,
    value: number,
    strokeDasharray: ?string | number,
    color: ?string,
    fill: ?string,
    legendType?: 'line' | 'rect',
    isLegend?: boolean,
    strokeWidth?: number,
  }>,
  label: number | string,
}) => Node {
  return useCallback(
    ({ active, payload, label }) => (
      <div style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
        <Box
          color={isDarkMode ? 'elevationFloating' : 'default'}
          borderStyle={isDarkMode ? undefined : 'shadow'}
          maxWidth={300}
          padding={2}
          rounding={4}
        >
          {active && Array.isArray(payload) ? (
            <Flex direction="column" gap={2}>
              <Flex.Item>
                {payload.map(
                  (payloadData: {
                    dataKey: string,
                    name: string,
                    stroke: ?string,
                    value: number,
                    strokeDasharray: ?string | number,
                    color: ?string,
                    fill: ?string,
                    legendType?: 'line' | 'rect',
                    isLegend?: boolean,
                    strokeWidth?: number,
                  }) => (
                    <Flex key={payloadData.name} alignItems="center" gap={2}>
                      <LegendIcon payloadData={payloadData} />
                      <Flex.Item flex="grow">
                        <Text size="100">
                          {labelMap?.[payloadData.dataKey] || payloadData.name}
                        </Text>
                      </Flex.Item>
                      <Text size="200" weight="bold">
                        {payloadData.value}
                      </Text>
                    </Flex>
                  ),
                )}
              </Flex.Item>
              <Text size="100" color="subtle">
                {isTimeSeries && typeof label === 'number' && tickFormatter?.timeseries
                  ? tickFormatter.timeseries(label)
                  : null}
                {!isTimeSeries ? (typeof label === 'string' && labelMap?.[label]) || label : null}
              </Text>
            </Flex>
          ) : null}
        </Box>
      </div>
    ),
    [isDarkMode, labelMap, isTimeSeries, tickFormatter, isRtl],
  );
}
