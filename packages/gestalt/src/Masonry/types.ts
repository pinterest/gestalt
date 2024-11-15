export type Position = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type NodeData<T> = {
  id: 'start' | T;
  heights: ReadonlyArray<number>;
  positions: ReadonlyArray<{
    item: T;
    position: Position;
  }>;
};

export type GetGraphPositionsReturn<T> = {
  winningNode: NodeData<T>;
  numberOfIterations: number;
};

export type Align = 'start' | 'center' | 'end';

export type Layout =
  | 'basic'
  | 'basicCentered'
  | 'flexible'
  | 'serverRenderedFlexible'
  | 'uniformRow'
  | 'uniformRowFlexible';

export type LoadingStateItem = { height: number };
