// @flow strict
import SideNavigation from './SideNavigation.js';

const Valid = (
  <SideNavigation accessibilityLabel="label">
    <SideNavigation.TopItem href="#" label="test" />
  </SideNavigation>
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <SideNavigation nonexisting={33} />;
