// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import Checkbox from './Checkbox';

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
