// @flow strict
import {
  type Context,
  type Element,
  type Node,
  useContext,
  useState,
  useCallback,
  createContext,
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
  const [scrollBoundaryContainerRef, setScrollBoundaryContainerRef] = useState(null);

  const scrollBoundaryContainerContext = {
    scrollBoundaryContainerRef,
    addRef: useCallback((ref) => {
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
