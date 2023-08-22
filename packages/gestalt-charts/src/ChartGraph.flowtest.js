// @flow strict-local
import ChartGraph from './ChartGraph.js';

// $FlowFixMe[prop-missing]
const Valid = <ChartGraph />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <ChartGraph nonexisting={33} />;
