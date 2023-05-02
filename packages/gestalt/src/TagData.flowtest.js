// @flow strict
import TagData from './TagData.js';

const Valid = <TagData />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <TagData nonexisting={33} />;
