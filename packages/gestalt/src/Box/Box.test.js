// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import Box from './Box';

test('Box renders', () => {
  const tree = create(<Box />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box has correct *-hide classes when display is false', () => {
  const tree = create(
    <Box display="none" smDisplay="none" mdDisplay="none" lgDisplay="none" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box has correct classes when display is flex', () => {
  const tree = create(<Box />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box has correct *-flex-column classes when display is flexColumn', () => {
  const tree = create(
    <Box
      direction="column"
      smDirection="column"
      mdDirection="column"
      lgDirection="column"
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box has correct *-inline-block classes when display is inlineBlock', () => {
  const tree = create(
    <Box
      display="inlineBlock"
      smDisplay="inlineBlock"
      mdDisplay="inlineBlock"
      lgDisplay="inlineBlock"
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box allows zero values for whitespace', () => {
  const tree = create(<Box padding={0} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box dangerouslySetInlineStyle', () => {
  expect(
    create(
      <Box dangerouslySetInlineStyle={{ __style: { width: 100 } }} />
    ).toJSON()
  ).toMatchSnapshot();
});

test('Box has correct marginStart and marginEnd when marginStart equals 1 and marginEnd equals 2', () => {
  expect(create(<Box marginStart={1} marginEnd={2} />)).toMatchSnapshot();
});

test('Box has correct marginStart and marginEnd when marginStart and marginEnd are negative', () => {
  expect(create(<Box marginStart={-1} marginEnd={-3} />)).toMatchSnapshot();
});
