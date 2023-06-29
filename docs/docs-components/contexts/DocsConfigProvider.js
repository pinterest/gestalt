// @flow strict
import { type Context, createContext, type Element, type Node, useContext, useState } from 'react';

type DocsConfigContextType = {|
  isMobile: boolean,
|};

type Props = {|
  children: Node,
  isMobile: boolean,
|};

const DocsConfigContext: Context<DocsConfigContextType> = createContext<DocsConfigContextType>({
  isMobile: false,
});

const { Provider } = DocsConfigContext;

function DocsConfigProvider({ children, isMobile }: Props): Element<typeof Provider> {
  const [isMobileDevice] = useState(isMobile);

  const docsConfigTypeContext = {
    isMobile: isMobileDevice,
  };

  return <Provider value={docsConfigTypeContext}>{children}</Provider>;
}

function useDocsConfig(): DocsConfigContextType {
  const { isMobile } = useContext(DocsConfigContext);
  return {
    isMobile,
  };
}

export { DocsConfigProvider, useDocsConfig };
