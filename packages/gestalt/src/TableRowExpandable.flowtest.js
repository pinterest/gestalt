// @flow strict
import TableRowExpandable from './TableRowExpandable';

const Valid = (
  <TableRowExpandable
    accessibilityCollapseLabel="Collapse"
    accessibilityExpandLabel="Expand"
    expandedContents={<div>Expanded Contents</div>}
    hoverStyle="none"
    id="expandableRow"
  >
    <div>row cells</div>
  </TableRowExpandable>
);

const InvalidTypeProp = (
  <TableRowExpandable
    // $FlowExpectedError[incompatible-type]
    accessibilityCollapseLabel={2}
    accessibilityExpandLabel="Expand"
    expandedContents={<div>Expanded Contents</div>}
    // $FlowExpectedError[incompatible-type]
    hoverStyle={2}
    id="expandableRow"
    // $FlowExpectedError[incompatible-type]
    onExpand="gray"
  >
    <div>row cells</div>
  </TableRowExpandable>
);

const MissingProp = (
  // $FlowExpectedError[prop-missing]
  <TableRowExpandable>
    <div>row cells</div>
  </TableRowExpandable>
);

const NonExistingProp = (
  // $FlowExpectedError[prop-missing]
  <TableRowExpandable
    accessibilityCollapseLabel="Collapse"
    accessibilityExpandLabel="Expand"
    expandedContents={<div>Expanded Contents</div>}
    hoverStyle="none"
    id="expandableRow"
  />
);
