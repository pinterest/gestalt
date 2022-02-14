// @flow strict
import OnLinkNavigationProvider from './OnLinkNavigationProvider.js';

const Valid = <OnLinkNavigationProvider onNavigation={() => {}}>Test</OnLinkNavigationProvider>;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <OnLinkNavigationProvider nonexisting={33} />;
