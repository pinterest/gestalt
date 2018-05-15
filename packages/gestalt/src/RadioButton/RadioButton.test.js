// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import RadioButton from './RadioButton';

test('RadioButton', () => {
  const tree = create(
    <RadioButton id="id" onChange={() => {}} value="" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton small', () => {
  const tree = create(
    <RadioButton size="sm" id="id" onChange={() => {}} value="" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton disabled', () => {
  const tree = create(
    <RadioButton disabled id="id" onChange={() => {}} value="" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton disabled small', () => {
  const tree = create(
    <RadioButton size="sm" disabled id="id" onChange={() => {}} value="" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
