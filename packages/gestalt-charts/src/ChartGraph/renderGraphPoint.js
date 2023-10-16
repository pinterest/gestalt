// @flow strict-local
import { type Node } from 'react';
import { type DataVisualizationColors } from './types.js';
import { useHexColor } from './usePatterns.js';

type Props = {
  noReposition?: boolean,
  active: boolean,
  color: DataVisualizationColors,
  cx: number,
  cy: number,
};

export function GraphPoint(props: Props): Node {
  // eslint-disable-next-line no-unused-vars
  const { color, cx, cy, active, noReposition = false } = props;
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

  const cxCorrection = noReposition ? 0 : decalDotCoordCorrection[color].coordinate[0];
  const cyCorrection = noReposition ? 0 : decalDotCoordCorrection[color].coordinate[1];

  return cy === null ? null : (
    <use
      href={`#points-${color}`}
      x={cx - cxCorrection}
      y={cy - cyCorrection}
      fill={
        decalDotCoordCorrection[color].fill === 'empty'
          ? 'var(--color-white-mochimalist-0)'
          : hexColor(color)
      }
      stroke={hexColor(color)}
      strokeWidth={decalDotCoordCorrection[color].stroke === 'bold' ? '6' : '1.5'}
    />
  );
}

const renderGraphPoint: ({
  color: DataVisualizationColors,
  active: boolean,
}) => ({
  cx: number,
  cy: number,
  ...
}) => Node = (props) => {
  const renderPoint: ({
    cx: number,
    cy: number,
    ...
  }) => Node = ({ cx, cy }) => (
    <GraphPoint
      key={props.color + cy + cx}
      color={props.color}
      cy={cy}
      cx={cx}
      active={props.active}
    />
  );

  return renderPoint;
};

export default renderGraphPoint;
