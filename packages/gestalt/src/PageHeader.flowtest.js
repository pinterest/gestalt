// @flow strict
import PageHeader from './PageHeader';

const Valid = <PageHeader title="Settings" />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <PageHeader nonexisting={33} />;
