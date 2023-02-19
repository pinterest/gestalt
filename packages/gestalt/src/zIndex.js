// @flow strict
// eslint-disable-next-line max-classes-per-file
export interface Indexable {
  index(): number;
}

/**
 *
 * [FixedZIndex](https://gestalt.pinterest.systems/web/zindex_classes#FixedZIndex) is used for setting fixed z-index values. Use this class when you want to create an initial z-index to stack others on top of. FixedZIndex must be instantiated with a number.
 *
 * ![ZIndex light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ZIndex.spec.mjs-snapshots/ZIndex-chromium-darwin.png)
 *
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
 *
 * [CompositeZIndex](https://gestalt.pinterest.systems/web/zindex_classes#CompositeZIndex) is used for dynamically composing z-index values. Use this class to layer components on top of an existing z-index in the stacking context. CompositeZIndex must be instantiated with an array of FixedZIndex or CompositeZIndex instances. CompositeZIndex returns the highest z-index value in the array +1.
 *
 * ![ZIndex light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ZIndex.spec.mjs-snapshots/ZIndex-chromium-darwin.png)
 */
export class CompositeZIndex implements Indexable {
  +deps: $ReadOnlyArray<Indexable>;

  constructor(deps: $ReadOnlyArray<Indexable>) {
    this.deps = deps;
  }

  index(): number {
    return Math.max(-1, ...this.deps.map((dep) => dep.index())) + 1;
  }
}
