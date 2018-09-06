// @flow
import React from 'react';
import { mount, shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import Masonry from './MasonryBeta.js';
import { UniformRowLayoutSymbol } from './legacyLayoutSymbols.js';

jest.mock('./scrollUtils.js', () => ({
  getElementHeight: () => 1,
  getScrollPos: () => 2,
  getRelativeScrollTop: () => 3,
}));

type Item = { id: string };

describe('Masonry', () => {
  const a: Item = { id: 'a' };
  const b = { id: 'b' };
  const items1 = [a, b];

  describe('renders layout', () => {
    test.each([null, UniformRowLayoutSymbol])('renders', layout => {
      const masonry = create(
        <Masonry
          comp={() => <div style={{ height: '100px', width: '200px' }} />}
          items={items1}
          layout={layout}
        />
      ).toJSON();
      expect(masonry).toMatchSnapshot();
    });

    test('renders full width', () => {
      const masonry = create(
        <Masonry
          comp={() => <div style={{ height: '100px', width: '200px' }} />}
          items={items1}
          flexible
        />
      ).toJSON();
      expect(masonry).toMatchSnapshot();
    });
  });

  test('renders with new items', () => {
    const masonry = mount(<Masonry comp={() => <div />} items={items1} />);

    const items2 = [a];
    const comp2 = ({ data, itemIdx }: { data: Item, itemIdx: number }) => {
      expect(itemIdx).toBeLessThan(1);
      return <div>{data[itemIdx]}</div>;
    };
    masonry.setProps({ comp: comp2, items: items2 });
  });

  test('updateScrollPosition', () => {
    const masonry = shallow(<Masonry comp={() => <div />} items={items1} />);

    masonry.instance().scrollContainer = {
      getScrollContainerRef: () => jest.fn(),
    };

    const updateMock = jest.fn();
    masonry.instance().handleVirtualizationWindowUpdate = updateMock;
    masonry.instance().updateScrollPosition();

    expect(updateMock.mock.calls.length).toBeGreaterThan(0);
  });

  test('measureContainer', () => {
    const masonry = shallow(<Masonry comp={() => <div />} items={items1} />);

    masonry.instance().scrollContainer = {
      getScrollContainerRef: () => jest.fn(),
    };

    masonry.instance().gridWrapper = document.createElement('div');
    masonry.instance().measureContainer();
    expect(masonry.instance().containerHeight).toBe(1);
    expect(masonry.instance().containerOffset).toBe(3);
  });

  test('handleOnAutoMeasuringUpdate', () => {
    const onAutoMeasuringUpdate = jest.fn();
    const masonry = shallow(
      <Masonry
        comp={() => <div />}
        items={items1}
        onAutoMeasuringUpdate={onAutoMeasuringUpdate}
      />
    );
    masonry.instance().handleOnAutoMeasuringUpdate('measuring');
    expect(onAutoMeasuringUpdate.mock.calls.length).toBeGreaterThan(0);
  });

  test('handleVirtualizationWindowUpdate', () => {
    const onVirtualizationWindowUpdate = jest.fn();
    const masonry = shallow(
      <Masonry
        comp={() => <div />}
        items={items1}
        onVirtualizationWindowUpdate={onVirtualizationWindowUpdate}
      />
    );
    masonry.instance().containerHeight = 1;
    masonry.instance().handleVirtualizationWindowUpdate('measuring');
    expect(onVirtualizationWindowUpdate.mock.calls.length).toBeGreaterThan(0);
  });
});
