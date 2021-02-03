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

type ScrollableContainerContextType = {|
  scrollableContainerRef: ?HTMLDivElement,
  addRef: (ref: HTMLDivElement) => void,
|};

type Props = {|
  children: Node,
|};

const ScrollableContainerContext: Context<ScrollableContainerContextType> = createContext<ScrollableContainerContextType>(
  {
    scrollableContainerRef: null,
    addRef: () => {},
  },
);

const { Provider } = ScrollableContainerContext;

function ScrollableContainerProvider({ children }: Props): Element<typeof Provider> {
  const [scrollableContainerRef, setScrollableContainerRef] = useState(null);

  const scrollableContainerContext = {
    scrollableContainerRef,
    addRef: useCallback((ref) => {
      setScrollableContainerRef(ref);
    }, []),
  };

  return <Provider value={scrollableContainerContext}>{children}</Provider>;
}

function useScrollableContainer(): ScrollableContainerContextType {
  const scrollableContainerContext = useContext(ScrollableContainerContext);
  return scrollableContainerContext;
}

export { ScrollableContainerProvider, useScrollableContainer };

ScrollableContainerProvider.propTypes = {
  children: PropTypes.node,
};
