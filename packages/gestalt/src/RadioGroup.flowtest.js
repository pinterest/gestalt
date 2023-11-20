// @flow strict
import RadioGroup from './RadioGroup';

const Valid = (
  <RadioGroup legend="testing" id="testing-valid">
    <div>hello</div>
  </RadioGroup>
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <RadioGroup nonexisting={33} />;
