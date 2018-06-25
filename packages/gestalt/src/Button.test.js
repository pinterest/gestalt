// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from './Button.js';

test('<Button color="transparent" />', () => {
  const tree = create(
    <Button color="transparent" text="Hello World" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button handles click', () => {
  const mockOnClick = jest.fn();
  const wrapper = shallow(<Button text="Text" onClick={mockOnClick} />);
  wrapper.find('button').simulate('click');
  expect(mockOnClick).toBeCalled();
});
