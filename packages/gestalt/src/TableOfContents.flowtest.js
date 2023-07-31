// @flow strict
import TableOfContents from './TableOfContents.js';

const Valid = <TableOfContents title="Title" items={[{ label: 'Label', href: '#' }]} />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <TableOfContents nonexisting={33} />;
