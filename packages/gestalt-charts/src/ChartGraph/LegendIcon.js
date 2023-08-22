// @flow strict-local
import { type Node } from 'react';
import { useColorScheme } from 'gestalt';
import { useChartContext } from './ChartGraphContext.js';
import { GraphPoint } from './renderGraphPoint.js';
import { type DataVisualizationColors } from './types.js';

type Props = {|
  payloadData:
    | {|
        dataKey: string,
        name: string,
        stroke: ?string,
        value: number,
        strokeDasharray: ?string | number,
        color: ?string,
        fill: ?string,
        legendType?: 'line' | 'rect',
        isLegend?: boolean,
      |}
    | {| referenceArea: 'default', isLegend?: boolean |},
|};

/**
 * [LegendIcon](https://gestalt.pinterest.systems/web/chartgraph) component should be used for ....
 */

function LegendIcon({ payloadData }: Props): Node {
  const theme = useColorScheme();

  const { decal: showVisualPattern } = useChartContext();

  if (payloadData.referenceArea === 'default') {
    const dimension = 16;

    return (
      <svg height={dimension} width={dimension} aria-hidden>
        <rect
          style={{ fill: '#ccc', fillOpacity: '0.5' }}
          height={dimension}
          width={dimension}
          rx={2}
        />
      </svg>
    );
  }

  const { isLegend } = payloadData;

  const colorMap = Object.entries({
    '01': theme.colorDataVisualization01,
    '02': theme.colorDataVisualization02,
    '03': theme.colorDataVisualization03,
    '04': theme.colorDataVisualization04,
    '05': theme.colorDataVisualization05,
    '06': theme.colorDataVisualization06,
    '07': theme.colorDataVisualization07,
    '08': theme.colorDataVisualization08,
    '09': theme.colorDataVisualization09,
    '10': theme.colorDataVisualization10,
    '11': theme.colorDataVisualization11,
    '12': theme.colorDataVisualization12,
  });

  const isLine = payloadData.legendType === 'line' || payloadData.stroke;
  const isBar = payloadData.legendType === 'rect' || !payloadData.stroke;

  if (isBar) {
    const dimension = isLegend || showVisualPattern ? 16 : 8;

    return (
      <svg height={dimension} width={dimension} aria-hidden>
        <rect
          style={{ fill: payloadData.color || payloadData.fill }}
          height={dimension}
          width={dimension}
          rx={2}
        />
      </svg>
    );
  }

  const isEstimate = payloadData.strokeDasharray === '8 8';

  if (isLine && showVisualPattern === 'accessible') {
    const colorId = colorMap
      .map(([colorNumber, color]) => {
        if (color === payloadData.stroke) return colorNumber;
        return undefined;
      })
      .filter(Boolean);

    const colorPoint: DataVisualizationColors = colorId[0];
    return (
      <svg width="14" height="14" viewBox="0 0 12 12">
        <rect x={4} style={{ fill: 'transparent' }} height={3} width={1} y={8} />
        <GraphPoint active={false} color={colorPoint} cx={7} cy={7} />
        <rect x={4} style={{ fill: 'transparent' }} height={3} width={1} y={8} />
      </svg>
    );
  }

  if (isLine && !isEstimate) {
    const dimension = isLegend ? 24 : 12;

    return (
      <svg height={16} width={dimension}>
        <rect style={{ fill: payloadData.stroke }} height={3} width={dimension} rx={2} y={8} />
      </svg>
    );
  }

  if (isLine && isEstimate) {
    const dimension = isLegend ? 24 : 12;

    return (
      <svg height={16} width={dimension}>
        <rect x={0} style={{ fill: payloadData.stroke }} height={3} width={3} rx={1} y={8} />
        <rect x={3} style={{ fill: 'transparent' }} height={3} width={2} y={8} />
        <rect x={5} style={{ fill: payloadData.stroke }} height={3} width={3} rx={1} y={8} />
        <rect x={8} style={{ fill: 'transparent' }} height={3} width={2} y={8} />
        <rect x={10} style={{ fill: payloadData.stroke }} height={3} width={3} rx={1} y={8} />
      </svg>
    );
  }
}

export default LegendIcon;
