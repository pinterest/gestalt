// @flow strict
import HelpButton from './HelpButton.js';

const ValidDefaultHelpButton = (
  <HelpButton
    accessibilityLabel="Click to learn more about Pinterest"
    accessibilityPopoverLabel="Expanded information about Pinterest"
    text="Good test"
  />
);

const ValidLinkHelpButton = (
  <HelpButton
    accessibilityLabel="Click to learn more about Pinterest"
    accessibilityPopoverLabel="Expanded information about Pinterest"
    text="Good test"
    link={{ href: 'http://www.pinterest.com', text: 'Good test' }}
  />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <HelpButton />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <HelpButton nonexisting={33} />;
