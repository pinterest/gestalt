// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import Checkbox from './Checkbox.js';

test('Checkbox', () => {
  const tree = create(<Checkbox id="id" onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox checked', () => {
  const tree = create(
    <Checkbox id="id" onChange={() => {}} checked />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox indeterminate', () => {
  const tree = create(
    <Checkbox id="id" onChange={() => {}} indeterminate />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox small', () => {
  const tree = create(
    <Checkbox size="sm" id="id" onChange={() => {}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox disabled', () => {
  const tree = create(
    <Checkbox disabled size="sm" id="id" onChange={() => {}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox disabled & checked', () => {
  const tree = create(
    <Checkbox disabled checked size="sm" id="id" onChange={() => {}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox with error', () => {
  const tree = create(
    <Checkbox hasError size="sm" id="id" onChange={() => {}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox handles click', () => {
  const mockOnClick = jest.fn();
  const wrapper = shallow(
    <Checkbox size="sm" id="id" onChange={() => {}} onClick={mockOnClick} />
  );
  wrapper.find('input').simulate('click', { currentTarget: { checked: true } });
  expect(mockOnClick).toHaveBeenCalledWith({
    event: { currentTarget: { checked: true } },
    checked: true,
  });
});
