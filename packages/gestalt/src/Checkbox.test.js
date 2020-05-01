// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Checkbox from './Checkbox.js';

test('Checkbox', () => {
  const tree = create(
    <Checkbox id="id" label="Name" onChange={() => {}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox without label', () => {
  const tree = create(<Checkbox id="id" onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox checked', () => {
  const tree = create(
    <Checkbox id="id" label="Name" onChange={() => {}} checked />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox indeterminate', () => {
  const tree = create(
    <Checkbox id="id" label="Name" onChange={() => {}} indeterminate />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox small', () => {
  const tree = create(
    <Checkbox size="sm" id="id" label="Name" onChange={() => {}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox disabled', () => {
  const tree = create(
    <Checkbox disabled size="sm" id="id" label="Name" onChange={() => {}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox disabled & checked', () => {
  const tree = create(
    <Checkbox
      disabled
      checked
      size="sm"
      id="id"
      label="Name"
      onChange={() => {}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox with error', () => {
  const tree = create(
    <Checkbox
      errorMessage="Error message"
      size="sm"
      id="id"
      label="Name"
      onChange={() => {}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
