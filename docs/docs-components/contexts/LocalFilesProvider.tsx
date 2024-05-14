import { Context, createContext, ReactNode, useContext } from 'react';

type LocalFilesContextType = {
  files:
    | {
        css: string;
        js: string;
      }
    | null
    | undefined;
};

type Props = LocalFilesContextType & {
  children: ReactNode;
};

const LocalFilesContext: Context<LocalFilesContextType> = createContext<LocalFilesContextType>({
  files: null,
});

const { Provider } = LocalFilesContext;

// @ts-expect-error - TS2315 - Type 'Element' is not generic.
function LocalFilesProvider({ children, files }: Props): Element<typeof Provider> {
  const context = {
    files,
  } as const;
  return <Provider value={context}>{children}</Provider>;
}

function useLocalFiles(): LocalFilesContextType {
  const { files } = useContext(LocalFilesContext);
  return {
    files,
  };
}

export { LocalFilesProvider, useLocalFiles };
