// @flow strict
import TableOfContents from './TableOfContents.js';

const Valid = (
  <TableOfContents title="Title">
    <TableOfContents.Item label="Label" href="#" />
  </TableOfContents>
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <TableOfContents nonexisting={33} />;
