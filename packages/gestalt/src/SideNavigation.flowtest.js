// @flow strict
import SideNavigation from './SideNavigation.js';

const Valid = (
  <SideNavigation accessibilityLabel="label">
    <SideNavigation.Item onSelect={() => {}} href="#" item={{ label: 'test', value: 'test' }} />
  </SideNavigation>
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <SideNavigation nonexisting={33} />;
