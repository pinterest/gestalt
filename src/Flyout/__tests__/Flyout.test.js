/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Flyout from '../Flyout';

describe('Display checks', () => {
  it('Renders Controller', () => {
    const wrapper = shallow(
      <Flyout
        anchor={<button onClick={() => null}> test </button>}
        accessibilityCloseLabel="close"
        idealDirection="down"
        onDismiss={jest.fn()}
        size="sm"
      />
    );
    wrapper.instance();
    expect(wrapper.find('Controller').length).toEqual(1);
  });
});
