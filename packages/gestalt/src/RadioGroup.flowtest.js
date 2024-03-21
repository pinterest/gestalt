// @flow strict
import RadioGroup from './RadioGroup';

const Valid = (
  <RadioGroup id="testing-valid" legend="testing">
    <div>hello</div>
  </RadioGroup>
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <RadioGroup nonexisting={33} />;
