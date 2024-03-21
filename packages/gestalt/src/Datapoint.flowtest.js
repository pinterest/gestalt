// @flow strict
import Datapoint from './Datapoint';

const Valid = (
  <Datapoint
    title="Title"
    trend={{ value: 30, accessibilityLabel: 'Value change icon accessibility label' }}
    trendSentiment="good"
    value="1M"
  />
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <Datapoint nonexisting={33} />;
