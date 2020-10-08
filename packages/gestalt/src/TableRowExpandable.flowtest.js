// @flow strict
import React from 'react';
import TableRowExpandable from './TableRowExpandable.js';

const Valid = (
  <TableRowExpandable
    accessibilityExpandLabel="Expand"
    accessibilityCollapseLabel="Collapse"
    expandedContents={<div>Expanded Contents</div>}
    hoverStyle="none"
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
  >
    <div>row cells</div>
  </TableRowExpandable>
);

const MissingProp = (
  // $FlowExpectedError[prop-missing]
  <TableRowExpandable>
    <div>row cells</div>
  </TableRowExpandable>
); // eslint-disable-line jsx-a11y/anchor-is-valid

const NonExistingProp = (
  // $FlowExpectedError[prop-missing]
  <TableRowExpandable
    accessibilityExpandLabel="Expand"
    accessibilityCollapseLabel="Collapse"
    expandedContents={<div>Expanded Contents</div>}
    hoverStyle="none"
  />
); // eslint-disable-line jsx-a11y/anchor-is-valid
