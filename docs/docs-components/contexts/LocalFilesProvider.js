// @flow strict
import {
  type Context,
  createContext,
  type Element,
  type Node as ReactNode,
  useContext,
} from 'react';

type LocalFilesContextType = {
  files: ?{
    css: string,
    js: string,
  },
};

type Props = {
  ...LocalFilesContextType,
  children: ReactNode,
};

const LocalFilesContext: Context<LocalFilesContextType> = createContext<LocalFilesContextType>({
  files: null,
});

const { Provider } = LocalFilesContext;

function LocalFilesProvider({ children, files }: Props): Element<typeof Provider> {
  const context = {
    files,
  };
  return <Provider value={context}>{children}</Provider>;
}

function useLocalFiles(): LocalFilesContextType {
  const { files } = useContext(LocalFilesContext);
  return {
    files,
  };
}

export { LocalFilesProvider, useLocalFiles };
