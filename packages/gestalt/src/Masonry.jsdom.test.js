// @flow
import React from 'react';
import { mount } from 'enzyme';
import { create } from 'react-test-renderer';
import Masonry from './Masonry.js';

type Item = { id: string };

describe('Masonry', () => {
  test('renders', () => {
    const a: Item = { id: 'a' };
    const b = { id: 'b' };
    const items1 = [a, b];
    const masonry = create(
      <Masonry
        comp={() => <div style={{ height: '100px', width: '200px' }} />}
        items={items1}
      />
    ).toJSON();
    expect(masonry).toMatchSnapshot();
  });

  test('renders with new items', () => {
    const a: Item = { id: 'a' };
    const b = { id: 'b' };
    const items1 = [a, b];
    const masonry = mount(<Masonry comp={() => <div />} items={items1} />);

    const items2 = [a];
    const comp2 = ({ data, itemIdx }: { data: Item, itemIdx: number }) => {
      expect(itemIdx).toBeLessThan(1);
      return <div>{data[itemIdx]}</div>;
    };
    masonry.setProps({ comp: comp2, items: items2 });
  });
});
