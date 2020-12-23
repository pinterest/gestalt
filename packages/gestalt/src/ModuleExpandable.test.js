// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import ModuleExpandable from './ModuleExpandable.js';

describe('Module Expandable', () => {
  test('renders correctly with one item', () => {
    const tree = renderer
      .create(
        <ModuleExpandable
          id="uniqueTestID"
          accessibilityExpandLabel="click to expand"
          accessibilityCollapseLabel="click to collapse"
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
        <ModuleExpandable
          id="uniqueTestID"
          accessibilityExpandLabel="click to expand"
          accessibilityCollapseLabel="click to collapse"
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
              type: 'error',
            },
          ]}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

test('renders correctly with multiple items with extExpandedId', () => {
  const tree = renderer
    .create(
      <ModuleExpandable
        id="uniqueTestID"
        accessibilityExpandLabel="click to expand"
        accessibilityCollapseLabel="click to collapse"
        extExpandedId="uniqueTestID-0"
        setExtExpandedId={() => {}}
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
            type: 'error',
          },
        ]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
