// @flow strict
import Provider from './Provider.js';

const Valid = <Provider>Test</Provider>;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Provider nonexisting={33} />;
