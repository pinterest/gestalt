// @flow strict
import { Box } from 'gestalt';
import OnInteractionProvider from './OnInteractionProvider.js';

const Valid = (
  <OnInteractionProvider onInteraction={() => {}}>
    <Box />
  </OnInteractionProvider>
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <OnInteractionProvider nonexisting={33} />;
