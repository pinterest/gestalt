// @flow strict
import Link from './Link.js';

const Valid = <Link href="https://example.com">content</Link>;

// $FlowExpectedError[prop-missing]
const MissingProp = <Link />; // eslint-disable-line jsx-a11y/anchor-is-valid

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Link nonexisting={33} />; // eslint-disable-line jsx-a11y/anchor-is-valid
