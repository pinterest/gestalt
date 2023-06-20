// @flow strict

export type Position = {|
  top: number,
  left: number,
  width: number,
  height: number,
  column?: number,
|};

export type NodeData<T> = {|
  id: 'start' | T,
  heights: $ReadOnlyArray<number>,
  positions: $ReadOnlyArray<{| item: T, position: Position |}>,
|};
