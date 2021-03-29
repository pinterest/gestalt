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
  addRef: (ref: HTMLElement) => void,
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
      // Cannot call `setScrollBoundaryContainerRef` with `ref` bound to the first parameter because a call signature declaring the expected parameter / return type is missing in  `HTMLElement` [1] but exists in  function type [2].
      // $FlowFixMe[incompatible-call]
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
