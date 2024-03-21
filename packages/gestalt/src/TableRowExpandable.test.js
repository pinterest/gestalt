// @flow strict
import renderer from 'react-test-renderer';
import TableRowExpandable from './TableRowExpandable';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <TableRowExpandable
        accessibilityCollapseLabel="Collapse"
        accessibilityExpandLabel="Expand"
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
        accessibilityCollapseLabel="Collapse"
        accessibilityExpandLabel="Expand"
        expandedContents={<div>Expanded Contents</div>}
        hoverStyle="gray"
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
        accessibilityCollapseLabel="Collapse"
        accessibilityExpandLabel="Expand"
        expandedContents={<div>Expanded Contents</div>}
        hoverStyle="none"
        id="expandableRow"
        onExpand={() => {}}
      >
        <div>row cells</div>
      </TableRowExpandable>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
