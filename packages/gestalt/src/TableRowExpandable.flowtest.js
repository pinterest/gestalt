// @flow strict
import TableRowExpandable from './TableRowExpandable.js';

const Valid = (
  <TableRowExpandable
    accessibilityExpandLabel="Expand"
    accessibilityCollapseLabel="Collapse"
    expandedContents={<div>Expanded Contents</div>}
    hoverStyle="none"
    id="expandableRow"
  >
    <div>row cells</div>
  </TableRowExpandable>
);

const InvalidTypeProp = (
  <TableRowExpandable
    accessibilityExpandLabel="Expand"
    // $FlowExpectedError[incompatible-type]
    accessibilityCollapseLabel={2}
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
    accessibilityExpandLabel="Expand"
    accessibilityCollapseLabel="Collapse"
    expandedContents={<div>Expanded Contents</div>}
    hoverStyle="none"
    id="expandableRow"
  />
);
