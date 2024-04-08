// @flow strict
import Status from './Status';

const Valid = <Status title="Unstarted" type="unstarted" />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <Status nonexisting={33} />;
