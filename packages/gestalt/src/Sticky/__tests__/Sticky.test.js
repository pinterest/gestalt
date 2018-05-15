// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import Sticky from '../Sticky';

test('Sticky renders', () => {
  const tree = create(<Sticky top={1}>Sticky</Sticky>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Sticky correctly sets thresholds for number values', () => {
  const tree = create(
    <Sticky bottom={1} left={2} right={3} top={4}>
      Sticky
    </Sticky>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Sticky correctly sets thresholds for string values', () => {
  const tree = create(
    <Sticky bottom="50%" left="25%" right="25%" top="50%">
      Sticky
    </Sticky>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
