// @flow strict
import { type Node } from 'react';

const PATHS = {
  down: 'M0 4c.694 0 1.36-.278 1.846-.773L4.376.66c.806-.819 2.187-.885 3.083-.148.057.047.111.096.163.148l2.526 2.565A2.6 2.6 0 0012 4',
  left: 'M0 0c0 .694.278 1.36.773 1.846l2.567 2.53c.819.806.885 2.187.148 3.083a2.098 2.098 0 01-.148.163L.775 10.148A2.6 2.6 0 000 12',
  right:
    'M4 12c0-.694-.278-1.36-.773-1.847L.66 7.625C-.159 6.818-.225 5.437.512 4.54c.047-.057.096-.111.148-.163l2.565-2.526A2.6 2.6 0 004 0',
  up: 'M12 0c-.694 0-1.36.278-1.847.773L7.625 3.34c-.807.819-2.188.885-3.084.148a2.098 2.098 0 01-.163-.148L1.853.775A2.6 2.6 0 000 0',
};

type Props = {|
  direction: 'up' | 'right' | 'down' | 'left' | 'forceDown',
  height: 4 | 12,
  width: 4 | 12,
|};

export default function Caret(props: Props): Node {
  const { direction, height, width } = props;

  const path = PATHS[direction === 'forceDown' ? 'down' : direction];

  return (
    <svg height={height} width={width}>
      <path d={path} stroke="rgba(0, 0, 0, 0.02)" />
    </svg>
  );
}
