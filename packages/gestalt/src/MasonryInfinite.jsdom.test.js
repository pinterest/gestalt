// @flow
import React from 'react';
import { mount } from 'enzyme';
import MasonryInfinite from './MasonryInfinite.js';

describe('Masonry', () => {
  test('Masonry has these public methods', () => {
    const masonry = mount(<MasonryInfinite comp={() => <div />} items={[]} />);
    masonry.instance().handleResize();
    masonry.instance().reflow();
  });
});
