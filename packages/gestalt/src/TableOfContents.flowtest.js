// @flow strict
import TableOfContents from './TableOfContents';

const Valid = (
  <TableOfContents title="Title">
    <TableOfContents.Item active href="#" label="Label" />
  </TableOfContents>
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <TableOfContents nonexisting={33} />;
