// @flow strict
import HelpButton from './HelpButton';

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
    link={{ href: 'http://www.pinterest.com', text: 'Good test' }}
    text="Good test"
  />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <HelpButton />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <HelpButton nonexisting={33} />;
