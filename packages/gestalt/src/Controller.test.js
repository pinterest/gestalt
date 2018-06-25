// @flow
import React from 'react';
import { shallow } from 'enzyme';
import Controller from './Controller.js';
import Contents from './Contents.js';

describe('Flyout', () => {
  it('does not render Contents when anchor is null', () => {
    const wrapper = shallow(
      <Controller
        anchor={null}
        positionRelativeToAnchor
        bgColor="white"
        onDismiss={() => {}}
      />
    );
    expect(wrapper.find(Contents)).toHaveLength(0);
  });
});
