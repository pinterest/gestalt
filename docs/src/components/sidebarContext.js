// @flow strict
import React, { useContext } from 'react';

// $FlowIssue
const SidebarContext = React.createContext(true);

// $FlowIssue[signature-verification-failure]
const useSidebarContext = () => useContext(SidebarContext);
const SidebarContextProvider = SidebarContext.Provider;

export { SidebarContextProvider, useSidebarContext };
