// @flow strict

import { CompositeZIndex, FixedZIndex } from './zIndex.js';

describe('FixedZIndex', () => {
  test('index', () => {
    const subject = new FixedZIndex(100);
    expect(subject.index()).toEqual(100);
  });
});

describe('CompositeZIndex', () => {
  test('empty', () => {
    const subject = new CompositeZIndex([]);
    expect(subject.index()).toEqual(0);
  });

  test('fixed parent', () => {
    const parent = new FixedZIndex(100);
    const subject = new CompositeZIndex([parent]);
    expect(subject.index()).toEqual(101);
  });

  test('complex tree', () => {
    const grandparent = new FixedZIndex(100);
    const parentA = new CompositeZIndex([grandparent]);
    const parentB = new FixedZIndex(50);
    const subject = new CompositeZIndex([parentA, parentB]);
    expect(subject.index()).toEqual(102);
  });
});
