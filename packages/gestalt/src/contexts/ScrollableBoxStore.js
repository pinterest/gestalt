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

type ScrollableBoxStoreContextType = {|
  refs: $ReadOnlyArray<?HTMLDivElement>,
  addRef: (ref: HTMLDivElement) => void,
  removeRef: (ref: HTMLDivElement) => void,
|};

type Props = {|
  children: Node,
|};

const ScrollableBoxStoreContext: Context<ScrollableBoxStoreContextType> = createContext<ScrollableBoxStoreContextType>(
  {
    refs: [],
    addRef: () => {},
    removeRef: () => {},
  }
);

const {
  Provider,
  Consumer: ScrollableBoxStoreConsumer,
} = ScrollableBoxStoreContext;

function ScrollableBoxStoreProvider({
  children,
}: Props): Element<typeof Provider> {
  const [refs, setRefs] = useState([]);

  const scrollableBoxStoreContext = {
    refs,
    addRef: useCallback((ref) => {
      setRefs((oldRefs) => {
        return [...oldRefs, ref];
      });
    }, []),
    removeRef: useCallback((ref) => {
      setRefs((oldRefs) => oldRefs.filter((r) => r !== ref));
    }, []),
  };

  return <Provider value={scrollableBoxStoreContext}>{children}</Provider>;
}

function useScrollableBoxStore(): ScrollableBoxStoreContextType {
  const scrollableBoxStoreContext = useContext(ScrollableBoxStoreContext);
  return scrollableBoxStoreContext;
}

export {
  ScrollableBoxStoreProvider,
  ScrollableBoxStoreConsumer,
  useScrollableBoxStore,
};

ScrollableBoxStoreProvider.propTypes = {
  children: PropTypes.node,
};
