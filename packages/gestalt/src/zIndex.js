// @flow strict

// eslint-disable-next-line max-classes-per-file
export interface Indexable {
  index(): number;
}

export class FixedZIndex implements Indexable {
  +z: number;

  constructor(z: number) {
    this.z = z;
  }

  index(): number {
    return this.z;
  }
}

export class CompositeZIndex implements Indexable {
  +deps: Array<Indexable>;

  constructor(deps: Array<Indexable>) {
    this.deps = deps;
  }

  index(): number {
    return Math.max(-1, ...this.deps.map(dep => dep.index())) + 1;
  }
}
