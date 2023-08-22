// @flow strict-local
import { type Node, useCallback } from 'react';
import { Box, Flex, Text } from 'gestalt';
import LegendIcon from './LegendIcon.js';

export default function useDefaultLegend({
  isHorizontalBiaxial,
  isVerticalBiaxial,
  legend,
  height,
  labelMap,
  setLegendHeight,
  referenceAreaSummary,
}: {|
  isHorizontalBiaxial: boolean,
  isVerticalBiaxial: boolean,
  legend: 'auto' | 'none' | 'complete',
  height: number,
  labelMap: ?{| [string]: string |},
  setLegendHeight: (number) => void,
  referenceAreaSummary: null | $ReadOnlyArray<{| label: string, style?: 'default' |}>,
|}): ({|
  payload: $ReadOnlyArray<{|
    payload: {|
      color: ?string,
      dataKey: string,
      fill: ?string,
      name: string,
      stroke: ?string,
      strokeDasharray: ?(string | number),
      value: number,
    |},
  |}>,
|}) => Node {
  return useCallback(
    ({ payload }) => {
      const series = payload.map(
        ({
          payload: payloadData,
        }: {|
          payload: {|
            color: ?string,
            dataKey: string,
            fill: ?string,
            name: string,
            stroke: ?string,
            strokeDasharray: ?(string | number),
            value: number,
          |},
        |}) => (
          <Flex key={payloadData.dataKey} gap={{ row: 2, column: 0 }}>
            <LegendIcon payloadData={{ ...payloadData, isLegend: true }} />
            <Text size="200">{labelMap?.[payloadData.dataKey] || payloadData.dataKey}</Text>
          </Flex>
        ),
      );

      const referenceAreas =
        // TO DO FIX
        // eslint-disable-next-line no-unused-vars
        referenceAreaSummary?.map(({ style, label }: {| style?: 'default', label: string |}) => (
          <Flex key={label} gap={{ row: 2, column: 0 }}>
            <LegendIcon payloadData={{ referenceArea: 'default', isLegend: true }} />
            <Text size="200">{label}</Text>
          </Flex>
        )) || [];

      const legendItemsArray = [...series, ...referenceAreas];

      if (isHorizontalBiaxial && legend === 'auto') {
        return (
          <Box color="transparent" marginBottom={6} width="100%">
            <Flex justifyContent="between">{legendItemsArray.slice(0, 2)}</Flex>
          </Box>
        );
      }

      if (isVerticalBiaxial && legend === 'auto') {
        return (
          <Box
            dangerouslySetInlineStyle={{ __style: { top: '-15px' } }}
            color="transparent"
            position="absolute"
            height={height}
            display="flex"
            alignContent="end"
          >
            <Flex direction="column" justifyContent="between">
              {legendItemsArray.slice(0, 2)}
            </Flex>
          </Box>
        );
      }

      return (
        <Box
          color="transparent"
          width="100%"
          ref={(ref) => {
            if (ref) setLegendHeight(ref.getBoundingClientRect().height);
          }}
        >
          <Flex gap={{ row: 4, column: 0 }} wrap>
            {legendItemsArray}
          </Flex>
        </Box>
      );
    },
    [
      isHorizontalBiaxial,
      isVerticalBiaxial,
      height,
      labelMap,
      legend,
      setLegendHeight,
      referenceAreaSummary,
    ],
  );
}
