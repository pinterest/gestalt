// @flow strict
import React, {
  useContext,
  useState,
  createContext,
  type Context,
  type Element,
  type Node,
} from 'react';
import PropTypes from 'prop-types';

export type ColorScheme = 'light' | 'dark' | 'userPreference';

export const ColorSchemePropType: React$PropType$Primitive<ColorScheme> = PropTypes.oneOf(
  ['light', 'dark', 'userPreference']
);

type Scroll = {|
  refs: Array<?HTMLDivElement>,
  addRef: (ref: HTMLDivElement) => void,
  removeRef: (ref: HTMLDivElement) => void,
|};

type Props = {|
  children: Node,
|};

const ScrollContext: Context<Scroll> = createContext<Scroll>({
  refs: [],
  addRef: (ref) => {},
  removeRef: (ref) => {},
});

export function ScrollProvider({
  children,
}: Props): Element<typeof ScrollContext.Provider> {
  const [refs, setRefs] = useState([]);

  const scrollContext = {
    refs,
    addRef: (ref) => {
      setRefs((oldRefs) => [...oldRefs, ref]);
    },
    removeRef: (ref) => {
      setRefs((oldRefs) => [...oldRefs].filter((r) => r !== ref));
    }
  };

  return (
    <ScrollContext.Provider value={scrollContext}>
      {children}
    </ScrollContext.Provider>
  );
}

ScrollProvider.propTypes = {
  children: PropTypes.node,
};

export function useScroll(): Scroll {
  const scroll = useContext(ScrollContext);
  return scroll;
}
