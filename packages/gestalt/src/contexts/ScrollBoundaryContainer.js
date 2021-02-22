// @flow strict
import React, {
  useContext,
  useState,
  useCallback,
  createContext,
  type Context,
  type Element,
  type Node,
} from 'react';
import PropTypes from 'prop-types';

type ScrollBoundaryContainerContextType = {|
  scrollBoundaryContainerRef: ?HTMLDivElement,
  addRef: (ref: HTMLDivElement) => void,
|};

type Props = {|
  children: Node,
|};

const ScrollBoundaryContainerContext: Context<ScrollBoundaryContainerContextType> = createContext<ScrollBoundaryContainerContextType>(
  {
    scrollBoundaryContainerRef: null,
    addRef: () => {},
  },
);

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

ScrollBoundaryContainerProvider.propTypes = {
  children: PropTypes.node,
};
