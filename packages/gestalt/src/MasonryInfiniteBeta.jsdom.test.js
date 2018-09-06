// @flow
import React from 'react';
import { mount, shallow } from 'enzyme';
import MasonryInfinite from './MasonryInfiniteBeta.js';
import MasonryBeta from './MasonryBeta.js';

describe('Masonry', () => {
  const comp = () => <div />;

  test('Masonry has these public methods', () => {
    const masonry = mount(<MasonryInfinite comp={comp} items={[]} />);
    masonry.instance().handleResize();
    masonry.instance().reflow();

    expect(MasonryInfinite.createMeasurementStore()).toBeTruthy();
  });

  test('handleOnAutoMeasuringUpdate', () => {
    const onAutoMeasuringUpdate = jest.fn();
    const masonry = shallow(
      <MasonryInfinite
        comp={comp}
        items={[]}
        onAutoMeasuringUpdate={onAutoMeasuringUpdate}
      />
    );
    masonry.instance().handleOnAutoMeasuringUpdate('measuring');
    expect(onAutoMeasuringUpdate.mock.calls).toHaveLength(1);
  });

  test('fetchMore', () => {
    const loadItems = jest.fn();
    const masonry = shallow(
      <MasonryInfinite comp={comp} items={[]} loadItems={loadItems} />
    );
    masonry.instance().fetchMore();
    expect(loadItems.mock.calls).toHaveLength(1);
  });

  test('getDerivedStateFromProps', () => {
    const items = [];
    const state = MasonryInfinite.getDerivedStateFromProps(
      { ...MasonryBeta.defaultProps, comp, items },
      {
        containerHeight: 0,
        hasPendingMeasurements: false,
        isFetching: false,
        items: [],
        scrollTop: 0,
        scrollHeight: 0,
      }
    );

    if (state) {
      expect(state.items).toBe(items);
      expect(state.isFetching).toBe(false);
    } else {
      expect(state).toBeTruthy();
    }
  });
});
