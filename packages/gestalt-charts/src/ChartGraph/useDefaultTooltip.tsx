import { type ReactNode, useCallback } from 'react';
import { Box, Flex, Text } from 'gestalt';
import LegendIcon from './LegendIcon';

export default function useDefaultTooltip({
  isDarkMode,
  labelMap,
  isTimeSeries,
  isRtl,
  tickFormatter,
}: {
  isDarkMode: boolean;
  labelMap:
    | {
        [key: string]: string;
      }
    | null
    | undefined;
  tickFormatter?: {
    timeseries?: (arg1: number) => string | number;
    xAxisTop?: (arg1: number, arg2: number) => string | number;
    xAxisBottom?: (arg1: number, arg2: number) => string | number;
    yAxisRight?: (arg1: number, arg2: number) => string | number;
    yAxisLeft?: (arg1: number, arg2: number) => string | number;
  };
  isTimeSeries?: boolean;
  isRtl: boolean;
}): (arg1: {
  active: boolean;
  payload: ReadonlyArray<{
    dataKey: string;
    name: string;
    stroke: string | null | undefined;
    value: number;
    strokeDasharray: string | null | undefined | number;
    color: string | null | undefined;
    fill: string | null | undefined;
    legendType?: 'line' | 'rect';
    isLegend?: boolean;
    strokeWidth?: number;
  }>;
  label: number | string;
}) => ReactNode {
  return useCallback(
    ({ active, payload, label }) => (
      <div style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
        <Box
          borderStyle={isDarkMode ? undefined : 'shadow'}
          color={isDarkMode ? 'elevationFloating' : 'default'}
          maxWidth={300}
          padding={2}
          rounding={4}
        >
          {active && Array.isArray(payload) ? (
            <Flex direction="column" gap={2}>
              <Flex.Item>
                {payload.map(
                  (payloadData: {
                    dataKey: string;
                    name: string;
                    stroke: string | null | undefined;
                    value: number;
                    strokeDasharray: string | null | undefined | number;
                    color: string | null | undefined;
                    fill: string | null | undefined;
                    legendType?: 'line' | 'rect';
                    isLegend?: boolean;
                    strokeWidth?: number;
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
              <Text color="subtle" size="100">
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
