// @flow strict
import {
  useState,
  useEffect,
  type Context,
  type Element,
  type Node,
  useContext,
  createContext,
} from 'react';

type DocsConfigContextType = {|
  isMobile: boolean,
  showDevelopmentEditor?: boolean,
|};

type Props = {|
  children: Node,
  isMobile: boolean,
|};

const DocsConfigContext: Context<DocsConfigContextType> = createContext<DocsConfigContextType>({
  isMobile: false,
  showDevelopmentEditor: false,
});

const { Provider } = DocsConfigContext;

function DocsConfigProvider({ children, isMobile }: Props): Element<typeof Provider> {
  const [isMobileDevice] = useState(isMobile);
  const [isDeployPreview, setIsDeployPreview] = useState(false);

  useEffect(() => {
    setIsDeployPreview(window?.location?.href?.startsWith('https://deploy-preview-') ?? false);
  }, []);

  const docsConfigTypeContext = {
    isMobile: isMobileDevice,
    showDevelopmentEditor: process.env.NODE_ENV === 'development' || isDeployPreview,
  };

  return <Provider value={docsConfigTypeContext}>{children}</Provider>;
}

function useDocsConfig(): DocsConfigContextType {
  const { isMobile, showDevelopmentEditor } = useContext(DocsConfigContext);
  return {
    isMobile,
    showDevelopmentEditor,
  };
}

export { DocsConfigProvider, useDocsConfig };
