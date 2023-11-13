// @flow strict
import Layer from './Layer';

const Valid = <Layer>content</Layer>;

// $FlowExpectedError[prop-missing]
const MissingProp = <Layer />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Layer nonexisting={33} />;
