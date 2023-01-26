// @flow strict
import InfoButton from './InfoButton.js';

const ValidDefaultInfoButton = <InfoButton accessibilityLabel="Pinterest" text="Good test" />;

const ValidLinkInfoButton = (
  <InfoButton accessibilityLabel="Pinterest" text="Good test" linkHref="http://www.pinterest.com" />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <InfoButton />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <InfoButton nonexisting={33} />;
