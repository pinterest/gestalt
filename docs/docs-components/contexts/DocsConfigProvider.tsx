import {Context, createContext, ReactElement, ReactNode, useContext, useState} from 'react';

type DocsConfigContextType = {
  isMobile: boolean
};

type Props = {
  children: ReactNode,
  isMobile: boolean
};

const DocsConfigContext: Context<DocsConfigContextType> = createContext<DocsConfigContextType>({
  isMobile: false,
});

const { Provider } = DocsConfigContext;

function DocsConfigProvider(
  {
    children,
    isMobile,
  }: Props,
): Element<typeof Provider> {
  const [isMobileDevice] = useState(isMobile);

  const docsConfigTypeContext = {
    isMobile: isMobileDevice,
  } as const;

  return <Provider value={docsConfigTypeContext}>{children}</Provider>;
}

function useDocsConfig(): DocsConfigContextType {
  const { isMobile } = useContext(DocsConfigContext);
  return {
    isMobile,
  };
}

export { DocsConfigProvider, useDocsConfig };
