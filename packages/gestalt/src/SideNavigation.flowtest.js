// @flow strict
import SideNavigation from './SideNavigation.js';

const Valid = <SideNavigation />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <SideNavigation nonexisting={33} />;
