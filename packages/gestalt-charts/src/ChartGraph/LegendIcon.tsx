import {ReactNode} from 'react';
import { useColorScheme } from 'gestalt';
import darkColorDesignTokens from 'gestalt-design-tokens/dist/json/variables-dark.json';
import lightColorDesignTokens from 'gestalt-design-tokens/dist/json/variables-light.json';
import { useChartContext } from './ChartGraphContext';
import { GraphPoint } from './renderGraphPoint';
import { DataVisualizationColors } from './types';

type Props = {
  /**
    Data received from  the `renderTooltip`.

    See the [custom tooltip variant](https://gestalt.pinterest.systems/web/chartgraph#Tooltip) for implementation guidance.
    */
  payloadData: {
    dataKey: string,
    name: string,
    stroke: string | null | undefined,
    value: number,
    strokeDasharray: string | null | undefined | number,
    strokeWidth?: number,
    color: string | null | undefined,
    fill: string | null | undefined,
    legendType?: "line" | "rect",
    isLegend?: boolean
  } | {
    referenceArea: "default",
    isLegend?: boolean
  }
};

/**
 * [LegendIcon](https://gestalt.pinterest.systems/web/chartgraph) should only be used within custom tooltips. See the [custom tooltip variant](https://gestalt.pinterest.systems/web/chartgraph#Tooltip) for implementation guidance.
 */

function LegendIcon(
  {
    payloadData,
  }: Props,
) {
  const { decal: showVisualPattern } = useChartContext();
  const isAccessible = showVisualPattern === 'visualPattern';
  const { colorSchemeName } = useColorScheme();

  if (payloadData.referenceArea === 'default') {
    const dimension = 16;

    return (
      <svg aria-hidden height={dimension} width={dimension}>
        <rect
          height={dimension}
          rx={2}
          style={{ fill: 'url(#pattern-referencearea-01)', strokeOpacity: 0.3 }}
          width={dimension}
        />
      </svg>
    );
  }

  const source = colorSchemeName === 'lightMode' ? lightColorDesignTokens : darkColorDesignTokens;
  const colorMap = Object.entries({
    '01': source['color-data-visualization-01'],
    '02': source['color-data-visualization-02'],
    '03': source['color-data-visualization-03'],
    '04': source['color-data-visualization-04'],
    '05': source['color-data-visualization-05'],
    '06': source['color-data-visualization-06'],
    '07': source['color-data-visualization-07'],
    '08': source['color-data-visualization-08'],
    '09': source['color-data-visualization-09'],
    '10': source['color-data-visualization-10'],
    '11': source['color-data-visualization-11'],
    '12': source['color-data-visualization-12'],
  });

  const isLine = payloadData.legendType === 'line' || !!payloadData.strokeWidth;
  const isBar = payloadData.legendType === 'rect' || !payloadData.strokeWidth;

  if (isBar) {
    const dimension = payloadData.isLegend || isAccessible ? 16 : 8;

    return (
      <svg aria-hidden height={dimension} width={dimension}>
        <rect
          height={dimension}
          rx={2}
          style={{ fill: payloadData.color || payloadData.fill }}
          width={dimension}
        />
      </svg>
    );
  }

  const isEstimate = payloadData.strokeDasharray === '8 8';

  if (isLine && isAccessible) {
    const colorId = colorMap
      .map(([colorNumber, color]: [any, any]) => {
        if (color === payloadData.stroke) return colorNumber;
        return undefined;
      })
      .filter(Boolean);

    const colorPoint: DataVisualizationColors = colorId[0];
    return (
      <svg height="14" viewBox="0 0 12 12" width="14">
        <rect height={3} style={{ fill: 'transparent' }} width={1} x={4} y={8} />
        <GraphPoint color={colorPoint} cx={7} cy={7} />
        <rect height={3} style={{ fill: 'transparent' }} width={1} x={4} y={8} />
      </svg>
    );
  }

  if (isLine && !isEstimate) {
    const dimension = payloadData.isLegend ? 24 : 12;

    return (
      <svg height={16} width={dimension}>
        <rect height={3} rx={2} style={{ fill: payloadData.stroke }} width={dimension} y={8} />
      </svg>
    );
  }

  if (isLine && isEstimate) {
    const dimension = payloadData.isLegend ? 24 : 12;

    return (
      <svg height={16} width={dimension}>
        <rect fill={payloadData.stroke} height={3} rx={1} width={3} x={0} y={8} />
        <rect fill="transparent" height={3} width={2} x={3} y={8} />
        <rect fill={payloadData.stroke} height={3} rx={1} width={3} x={5} y={8} />
        <rect fill="transparent" height={3} width={2} x={8} y={8} />
        <rect fill={payloadData.stroke} height={3} rx={1} width={3} x={10} y={8} />
      </svg>
    );
  }
}

export default LegendIcon;
