import { ReactNode } from 'react';
import { TOKEN_COLOR_WHITE_MOCHIMALIST_0 } from 'gestalt-design-tokens';
import { DataVisualizationColors } from './types';
import { useHexColor } from './usePatterns';

type Props = {
  noReposition?: boolean;
  color: DataVisualizationColors;
  cx: number;
  cy: number;
};

export function GraphPoint({ color, cx, cy, noReposition = false }: Props) {
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
  } as const;

  const cxCorrection = noReposition ? 0 : decalDotCoordCorrection[color].coordinate[0];
  const cyCorrection = noReposition ? 0 : decalDotCoordCorrection[color].coordinate[1];

  return cy === null ? null : (
    <use
      fill={
        decalDotCoordCorrection[color].fill === 'empty'
          ? TOKEN_COLOR_WHITE_MOCHIMALIST_0
          : hexColor(color)
      }
      href={`#points-${color}`}
      stroke={hexColor(color)}
      strokeWidth={decalDotCoordCorrection[color].stroke === 'bold' ? '6' : '1.5'}
      x={cx - cxCorrection}
      y={cy - cyCorrection}
    />
  );
}

const renderGraphPoint: (arg1: {
  color: DataVisualizationColors;
  active: boolean;
}) => (arg1: { cx: number; cy: number }) => ReactNode = (props) => {
  const renderPoint: (arg1: { cx: number; cy: number }) => ReactNode = ({ cx, cy }) => (
    <GraphPoint key={props.color + cy + cx} color={props.color} cx={cx} cy={cy} />
  );

  return renderPoint;
};

export default renderGraphPoint;
