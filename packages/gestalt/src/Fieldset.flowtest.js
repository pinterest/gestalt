// @flow strict
import Fieldset from './Fieldset';

const Valid = (
  <Fieldset legend="Favorite Animal">
    <div>test</div>
  </Fieldset>
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <Fieldset nonexisting={33} />;
