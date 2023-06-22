// @flow strict
import {
  type Context,
  createContext,
  type Element,
  type Node,
  useCallback,
  useContext,
  useState,
} from 'react';

type ScrollBoundaryContainerContextType = {|
  scrollBoundaryContainerRef: ?HTMLElement,
  addRef: (ref: HTMLElement) => void,
|};

type Props = {|
  children: Node,
|};

const ScrollBoundaryContainerContext: Context<ScrollBoundaryContainerContextType> =
  createContext<ScrollBoundaryContainerContextType>({
    scrollBoundaryContainerRef: null,
    addRef: () => {},
  });

const { Provider } = ScrollBoundaryContainerContext;

function ScrollBoundaryContainerProvider({ children }: Props): Element<typeof Provider> {
  const [scrollBoundaryContainerRef, setScrollBoundaryContainerRef] = useState<null | HTMLElement>(
    null,
  );

  const scrollBoundaryContainerContext = {
    scrollBoundaryContainerRef,
    addRef: useCallback((ref: HTMLElement) => {
      setScrollBoundaryContainerRef(ref);
    }, []),
  };

  return <Provider value={scrollBoundaryContainerContext}>{children}</Provider>;
}

function useScrollBoundaryContainer(): ScrollBoundaryContainerContextType {
  const scrollBoundaryContainerContext = useContext(ScrollBoundaryContainerContext);
  return scrollBoundaryContainerContext;
}

export { ScrollBoundaryContainerProvider, useScrollBoundaryContainer };
