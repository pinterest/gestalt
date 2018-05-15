// @flow
import React from 'react';
import { shallow } from 'enzyme';
import Flyout from '../Flyout';

describe('Display checks', () => {
  it('Renders Controller', () => {
    const wrapper = shallow(
      <Flyout
        anchor={<button onClick={() => null}> test </button>}
        idealDirection="down"
        onDismiss={jest.fn()}
        size="sm"
      />
    );
    wrapper.instance();
    expect(wrapper.find('Controller')).toHaveLength(1);
  });
});
