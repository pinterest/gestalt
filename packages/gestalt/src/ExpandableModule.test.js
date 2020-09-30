// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import ExpandableModule from './ExpandableModule.js';

test('renders correctly with one item', () => {
  const tree = renderer
    .create(
      <ExpandableModule
        items={[
          {
            title: 'Title',
            summary: ['summary1', 'summary2', 'summary3'],
            children: 'Children',
          },
        ]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with multiple items', () => {
  const tree = renderer
    .create(
      <ExpandableModule
        items={[
          {
            title: 'Title1',
            summary: ['summary1'],
            children: 'Children1',
          },
          {
            title: 'Title2',
            summary: ['summary2'],
            children: 'Children2',
          },
          {
            title: 'Title3',
            summary: ['summary3'],
            children: 'Children3',
            hasError: true,
          },
        ]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
