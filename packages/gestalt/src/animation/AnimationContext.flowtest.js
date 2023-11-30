// @flow strict
import AnimationProvider from './AnimationContext';

const Valid = (
  <AnimationProvider>
    <section />
  </AnimationProvider>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <AnimationProvider />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <AnimationProvider />;

// $FlowExpectedError[prop-missing]
const InvalidTypeProp = <AnimationProvider onDismissEnd={null} />;
