// @flow strict
import ComboBox from './ComboBox.js';

const Valid = <ComboBox />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <ComboBox nonexisting={33} />;
