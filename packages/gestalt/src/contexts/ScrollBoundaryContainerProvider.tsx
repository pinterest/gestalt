import { Context, createContext, ReactNode, useCallback, useContext, useState } from 'react';

type ScrollBoundaryContainerContextType = {
  scrollBoundaryContainerRef: HTMLElement | null | undefined;
  addRef: (ref: HTMLElement) => void;
};

type Props = {
  children: ReactNode;
};

const ScrollBoundaryContainerContext: Context<ScrollBoundaryContainerContextType> =
  createContext<ScrollBoundaryContainerContextType>({
    scrollBoundaryContainerRef: null,
    addRef: () => {},
  });

const { Provider } = ScrollBoundaryContainerContext;

function ScrollBoundaryContainerProvider({ children }: Props) {
  const [scrollBoundaryContainerRef, setScrollBoundaryContainerRef] = useState<null | HTMLElement>(
    null,
  );

  const scrollBoundaryContainerContext = {
    scrollBoundaryContainerRef,
    addRef: useCallback((ref: HTMLElement) => {
      setScrollBoundaryContainerRef(ref);
    }, []),
  } as const;

  return <Provider value={scrollBoundaryContainerContext}>{children}</Provider>;
}

function useScrollBoundaryContainer(): ScrollBoundaryContainerContextType {
  const scrollBoundaryContainerContext = useContext(ScrollBoundaryContainerContext);
  return scrollBoundaryContainerContext;
}

export { ScrollBoundaryContainerProvider, useScrollBoundaryContainer };
