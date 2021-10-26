// eslint-disable-next-line max-classes-per-file
export interface Indexable {
  index(): number;
}

/**
 * https://gestalt.pinterest.systems/ZIndex%20Classes
 */
export class FixedZIndex implements Indexable {
  readonly z: number;

  constructor(z: number) {
    this.z = z;
  }

  index(): number {
    return this.z;
  }
}

/**
 * https://gestalt.pinterest.systems/ZIndex%20Classes
 */
export class CompositeZIndex implements Indexable {
  readonly deps: ReadonlyArray<FixedZIndex | CompositeZIndex>;

  constructor(deps: ReadonlyArray<FixedZIndex | CompositeZIndex>) {
    this.deps = deps;
  }

  index(): number {
    return Math.max(-1, ...this.deps.map((dep) => dep.index())) + 1;
  }
}