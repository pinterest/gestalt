// @flow strict
import React, { useContext } from 'react';

const SidebarContext = React.createContext(true);

const useSidebarContext = () => useContext(SidebarContext);
const SidebarContextProvider = SidebarContext.Provider;

export { SidebarContextProvider, useSidebarContext };
