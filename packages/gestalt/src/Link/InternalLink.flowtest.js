// @flow strict
import InternalLink from './InternalLink';

const Valid = (
  <InternalLink href="https://example.com" tabIndex={0} wrappedComponent="button">
    content
  </InternalLink>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <InternalLink />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <InternalLink nonexisting={33} />;
