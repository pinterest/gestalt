// @flow strict-local
import { type Node as ReactNode, useCallback } from 'react';
import { Box, Flex, Text } from 'gestalt';
import LegendIcon from './LegendIcon';

type ReferenceAreaSummaryItem = {|
  label: string,
  style?: 'default',
|};

export default function useDefaultLegend({
  isHorizontalBiaxialLayout,
  isVerticalBiaxialLayout,
  isRtl,
  height,
  labelMap,
  setLegendHeight,
  referenceAreaSummary,
}: {
  isHorizontalBiaxialLayout: boolean,
  isVerticalBiaxialLayout: boolean,
  isRtl: boolean,
  height: number,
  labelMap: ?{ [string]: string },
  setLegendHeight: (number) => void,
  referenceAreaSummary: null | $ReadOnlyArray<ReferenceAreaSummaryItem>,
}): ({
  payload: $ReadOnlyArray<{
    payload: {
      color: ?string,
      dataKey: string,
      fill: ?string,
      name: string,
      stroke: ?string,
      strokeDasharray: ?(string | number),
      value: number,
    },
  }>,
}) => ReactNode {
  return useCallback(
    ({ payload }) => {
      const series = payload.map(
        ({
          payload: payloadData,
        }: {
          payload: {
            color: ?string,
            dataKey: string,
            fill: ?string,
            name: string,
            stroke: ?string,
            strokeDasharray: ?(string | number),
            value: number,
          },
        }) => (
          <Flex key={payloadData.dataKey} gap={{ row: 2, column: 0 }}>
            <LegendIcon payloadData={{ ...payloadData, isLegend: true }} />
            <Text size="200">{labelMap?.[payloadData.dataKey] || payloadData.dataKey}</Text>
          </Flex>
        ),
      );

      const referenceAreas =
        referenceAreaSummary?.map(({ label }: ReferenceAreaSummaryItem) => (
          <Flex key={label} gap={{ row: 2, column: 0 }}>
            <LegendIcon payloadData={{ referenceArea: 'default', isLegend: true }} />
            <Text size="200">{label}</Text>
          </Flex>
        )) || [];

      const legendItemsArray = [...series, ...referenceAreas];

      if (isHorizontalBiaxialLayout) {
        return (
          <div style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
            <Box color="transparent" marginBottom={6} width="100%">
              <Flex justifyContent="between">{legendItemsArray.slice(0, 2)}</Flex>
            </Box>
          </div>
        );
      }

      if (isVerticalBiaxialLayout) {
        return (
          <div style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
            <Box
              alignContent="end"
              color="transparent"
              dangerouslySetInlineStyle={{ __style: { top: '-15px' } }}
              display="flex"
              height={height}
              position="absolute"
            >
              <Flex direction="column" justifyContent="between">
                {legendItemsArray.slice(0, 2)}
              </Flex>
            </Box>
          </div>
        );
      }

      return (
        <div style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
          <Box
            ref={(ref) => {
              if (ref) setLegendHeight(ref.getBoundingClientRect().height);
            }}
            color="transparent"
            width="100%"
          >
            <Flex gap={{ row: 4, column: 0 }} wrap>
              {legendItemsArray}
            </Flex>
          </Box>
        </div>
      );
    },
    [
      isHorizontalBiaxialLayout,
      isVerticalBiaxialLayout,
      isRtl,
      height,
      labelMap,
      setLegendHeight,
      referenceAreaSummary,
    ],
  );
}
