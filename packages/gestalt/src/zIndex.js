// @flow strict
// eslint-disable-next-line max-classes-per-file
export interface Indexable {
  index(): number;
}

/**
 * https://gestalt.pinterest.systems/web/zindex_classes#FixedZIndex
 */
export class FixedZIndex implements Indexable {
  +z: number;

  constructor(z: number) {
    this.z = z;
  }

  index(): number {
    return this.z;
  }
}

/**
 * https://gestalt.pinterest.systems/web/zindex_classes#CompositeZIndex
 */
export class CompositeZIndex implements Indexable {
  // eslint-disable-next-line no-use-before-define
  +deps: $ReadOnlyArray<FixedZIndex | CompositeZIndex>;

  constructor(deps: $ReadOnlyArray<FixedZIndex | CompositeZIndex>) {
    this.deps = deps;
  }

  index(): number {
    return Math.max(-1, ...this.deps.map((dep) => dep.index())) + 1;
  }
}
