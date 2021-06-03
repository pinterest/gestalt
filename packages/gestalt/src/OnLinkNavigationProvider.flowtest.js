// @flow strict
import OnLinkNavigationProvider from './contexts/OnLinkNavigation.js';

const Valid = <OnLinkNavigationProvider onNavigation={() => {}}>Test</OnLinkNavigationProvider>;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <OnLinkNavigationProvider nonexisting={33} />;
