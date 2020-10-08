// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import ExpandableModuleBase from './ExpandableModuleBase.js';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <ExpandableModuleBase
        title="test title"
        isCollapsed
        accessibilityLabel="click to expand/collapse"
        accessibilityControls="ChildId"
        type="info"
        onModuleClicked={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with icon', () => {
  const tree = renderer
    .create(
      <ExpandableModuleBase
        title="test title"
        isCollapsed
        icon="lock"
        iconAccessibilityLabel="lock icon label"
        accessibilityLabel="click to expand/collapse"
        accessibilityControls="ChildId"
        type="info"
        onModuleClicked={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with summary', () => {
  const tree = renderer
    .create(
      <ExpandableModuleBase
        title="test title"
        isCollapsed
        summary={['summary1', 'summary2', 'summary3']}
        accessibilityLabel="click to expand/collapse"
        accessibilityControls="ChildId"
        type="info"
        onModuleClicked={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with error', () => {
  const tree = renderer
    .create(
      <ExpandableModuleBase
        title="test title"
        isCollapsed
        type="error"
        accessibilityLabel="click to expand/collapse"
        accessibilityControls="ChildId"
        onModuleClicked={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with children', () => {
  const tree = renderer
    .create(
      <ExpandableModuleBase
        title="test title"
        isCollapsed
        accessibilityLabel="click to expand/collapse"
        accessibilityControls="ChildId"
        type="info"
        onModuleClicked={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with when expanded', () => {
  const tree = renderer
    .create(
      <ExpandableModuleBase
        title="test title"
        isCollapsed={false}
        summary={['summary1', 'summary2', 'summary3']}
        accessibilityLabel="click to expand/collapse"
        accessibilityControls="ChildId"
        type="info"
        onModuleClicked={() => {}}
      >
        <div>test children</div>
      </ExpandableModuleBase>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
