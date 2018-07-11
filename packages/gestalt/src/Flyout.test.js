// @flow
import React from 'react';
import { shallow } from 'enzyme';
import Flyout from './Flyout.js';

it('Flyout renders', () => {
  const wrapper = shallow(
    <Flyout
      anchor={
        <button onClick={() => null} type="button">
          test
        </button>
      }
      idealDirection="down"
      onDismiss={jest.fn()}
      size="sm"
    />
  );
  expect(wrapper.find('Controller')).toHaveLength(1);
});

test('Flyout does not render when the anchor is null', () => {
  const wrapper = shallow(<Flyout anchor={null} onDismiss={() => {}} />);
  expect(wrapper.find('Controller')).toHaveLength(0);
});
