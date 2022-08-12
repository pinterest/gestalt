// @flow strict
import { useState, type Context, type Element, type Node, useContext, createContext } from 'react';

type DocsDeviceContextType = {|
  isMobile: boolean,
|};

type Props = {|
  children: Node,
  isMobile: boolean,
|};

const DocsDeviceContext: Context<DocsDeviceContextType> = createContext<DocsDeviceContextType>({
  isMobile: false,
});

const { Provider } = DocsDeviceContext;

function DocsDeviceTypeProvider({ children, isMobile }: Props): Element<typeof Provider> {
  const [isMobileDevice] = useState(isMobile);

  const docsDeviceTypeContext = {
    isMobile: isMobileDevice,
  };

  return <Provider value={docsDeviceTypeContext}>{children}</Provider>;
}

function useDocsDeviceType(): DocsDeviceContextType {
  const { isMobile } = useContext(DocsDeviceContext);
  return {
    isMobile,
  };
}

export { DocsDeviceTypeProvider, useDocsDeviceType };
