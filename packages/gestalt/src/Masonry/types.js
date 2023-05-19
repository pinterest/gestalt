// @flow strict

export type Position = {|
  top: number,
  left: number,
  width: number,
  height: number,
|};

export type NodeData = {|
  // $FlowFixMe[unclear-type]
  id: any,
  heights: $ReadOnlyArray<number>,
  positions: $ReadOnlyArray<Position>,
|};
