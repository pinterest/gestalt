// @flow strict
import renderer from 'react-test-renderer';
import TableRowExpandable from './TableRowExpandable.js';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <TableRowExpandable
        accessibilityExpandLabel="Expand"
        accessibilityCollapseLabel="Collapse"
        expandedContents={<div>Expanded Contents</div>}
        id="expandableRow"
        onExpand={() => {}}
      >
        <div>row cells</div>
      </TableRowExpandable>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with explicit hover', () => {
  const tree = renderer
    .create(
      <TableRowExpandable
        accessibilityExpandLabel="Expand"
        accessibilityCollapseLabel="Collapse"
        hoverStyle="gray"
        expandedContents={<div>Expanded Contents</div>}
        id="expandableRow"
        onExpand={() => {}}
      >
        <div>row cells</div>
      </TableRowExpandable>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly without hover', () => {
  const tree = renderer
    .create(
      <TableRowExpandable
        accessibilityExpandLabel="Expand"
        accessibilityCollapseLabel="Collapse"
        hoverStyle="none"
        expandedContents={<div>Expanded Contents</div>}
        id="expandableRow"
        onExpand={() => {}}
      >
        <div>row cells</div>
      </TableRowExpandable>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
