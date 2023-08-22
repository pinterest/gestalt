// @flow strict-local
import { type Node } from 'react';
import { ReferenceArea } from 'recharts';

type Props = {|
  isFront: boolean,
  x1: string,
  x2: string,
  y1: number,
  y2: number,
  yAxisId: string,
  stroke: string,
  strokeOpacity: number,
|};

/**
 * [ReferenceArea](https://gestalt.pinterest.systems/web/chart) component should be used for ... on the page.
 */
function Chart({ x1, x2, y1, y2, yAxisId, stroke, strokeOpacity, isFront }: Props): Node {
  return (
    <ReferenceArea
      isFront={isFront}
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      yAxisId={yAxisId}
      stroke={stroke}
      strokeOpacity={strokeOpacity}
    />
  );
}

export default Chart;
