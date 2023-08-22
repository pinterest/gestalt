// @flow strict-local
import { type Node } from 'react';
import { type DataVisualizationColors } from './types.js';
import { useHexColor } from './usePatterns.js';

type Props = {|
  noReposition?: boolean,
  active: boolean,
  color: DataVisualizationColors,
  cx: number,
  cy: number,
|};

export function GraphPoint(props: Props): Node {
  const { color, cx, cy, active, noReposition = false } = props;
  const hexColor = useHexColor();
  const decalDotCoordCorrection = {
    '01': [0, 0], // circle
    '02': [0, 6], // rhombus
    '03': [4, 4], // square
    '04': [0, 4], // triangle
    '05': [4, 4], // triangle inverse
    '06': [0, 0], // circle
    '07': [0, 6], // rhombus
    '08': [2, 2], // square
    '09': [0, 0], // circle
    '10': [0, 3], // rhombus
    '11': [2, 4], // triangle inverse
    '12': [-4, 4], // triangle
  };

  const cxCorrection = noReposition ? 0 : decalDotCoordCorrection[color][0];
  const cyCorrection = noReposition ? 0 : decalDotCoordCorrection[color][1];

  return cy === null ? null : (
    <use
      href={`#points-${color}`}
      x={cx - cxCorrection}
      y={cy - cyCorrection}
      fill={hexColor(color)}
      stroke={active ? hexColor(color) : undefined}
      strokeWidth={active ? '2' : undefined}
    />
  );
}

const renderGraphPoint: ({| color: DataVisualizationColors, active: boolean |}) => ({
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
