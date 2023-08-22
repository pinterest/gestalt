// @flow strict-local
import Chart from './Chart.js';

// $FlowFixMe[prop-missing]
const Valid = <Chart />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <Chart nonexisting={33} />;
