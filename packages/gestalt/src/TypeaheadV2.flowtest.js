// @flow strict
import TypeaheadV2 from './TypeaheadV2.js';

// const Valid = <TypeaheadV2 />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <TypeaheadV2 nonexisting={33} />;
