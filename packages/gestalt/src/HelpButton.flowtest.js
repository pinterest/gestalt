// @flow strict
import HelpButton from './HelpButton.js';

const ValidDefaultHelpButton = (
  <HelpButton accessibilityPopoverLabel="Pinterest" text="Good test" />
);

const ValidLinkHelpButton = (
  <HelpButton
    accessibilityPopoverLabel="Pinterest"
    text="Good test"
    link={{ href: 'http://www.pinterest.com' }}
  />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <HelpButton />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <HelpButton nonexisting={33} />;
