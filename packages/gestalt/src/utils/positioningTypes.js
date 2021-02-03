// @flow strict

export type MainDirections = 'up' | 'right' | 'down' | 'left';

export type FlyoutDir = ?MainDirections;

export type CaretDir = MainDirections | 'middle';

export type Coordinates = {| x: number, y: number |};

export type Dimensions = {| height: number, width: number |};

export type ClientRect = {|
  ...Dimensions,
  bottom: number,
  left: number,
  right: number,
  top: number,
|};

export type Window = {|
  ...Dimensions,
  scrollY: number,
  scrollX: number,
|};

export type EdgeShift = {| caret: Coordinates, flyout: Coordinates |};

export type Offset = {|
  left: number,
  top: number,
|};

export type CaretOffset = {|
  left: null | number,
  top: null | number,
  bottom: null | number,
  right: null | number,
|};

export type DerivedState = {|
  caretOffset: CaretOffset,
  flyoutOffset: Offset,
  flyoutDir: MainDirections,
|};
