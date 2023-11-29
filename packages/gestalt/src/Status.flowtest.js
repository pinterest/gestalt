// @flow strict
import Status from './Status';

const Valid = <Status type="unstarted" title="Unstarted" />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <Status nonexisting={33} />;
