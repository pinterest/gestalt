// @flow strict
import InfoButton from './InfoButton.js';

const ValidDefaultInfoButton = (
  <InfoButton accessibilityPopoverLabel="Pinterest" text="Good test" />
);

const ValidLinkInfoButton = (
  <InfoButton
    accessibilityPopoverLabel="Pinterest"
    text="Good test"
    link={{ href: 'http://www.pinterest.com' }}
  />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <InfoButton />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <InfoButton nonexisting={33} />;
