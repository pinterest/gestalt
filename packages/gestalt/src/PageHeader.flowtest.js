// @flow strict
import PageHeader from './PageHeader.js';

const Valid = <PageHeader title="Settings" />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <PageHeader nonexisting={33} />;
