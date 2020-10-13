// @flow strict
import React, { useContext } from 'react';

// $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
const SidebarContext = React.createContext(true);

// $FlowIssue[signature-verification-failure]
const useSidebarContext = () => useContext(SidebarContext);
const SidebarContextProvider = SidebarContext.Provider;

export { SidebarContextProvider, useSidebarContext };
