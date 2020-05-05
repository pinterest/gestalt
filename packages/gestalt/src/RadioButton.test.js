// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import RadioButton from './RadioButton.js';

test('RadioButton', () => {
  const tree = create(
    <RadioButton id="id" label="Name" onChange={() => {}} value="" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton without label', () => {
  const tree = create(
    <RadioButton id="id" onChange={() => {}} value="" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton checked', () => {
  const tree = create(
    <RadioButton checked id="id" onChange={() => {}} value="" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton small', () => {
  const tree = create(
    <RadioButton size="sm" id="id" label="Name" onChange={() => {}} value="" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton disabled', () => {
  const tree = create(
    <RadioButton disabled id="id" label="Name" onChange={() => {}} value="" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton disabled small', () => {
  const tree = create(
    <RadioButton
      size="sm"
      disabled
      id="id"
      label="Name"
      onChange={() => {}}
      value=""
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
