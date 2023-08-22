// @flow strict-local
import Chart from './Chart.js';

const Valid = <Chart />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <Chart nonexisting={33} />;
