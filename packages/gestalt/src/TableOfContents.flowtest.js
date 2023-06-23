// @flow strict
import TableOfContents from './TableOfContents.js';

const Valid = <TableOfContents />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <TableOfContents nonexisting={33} />;
