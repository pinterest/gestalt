// @flow strict
import React, { type Node } from 'react';
import createHydra, { type Hydra } from './createHydra.js';
import useLocalStorage from './useLocalStorage.js';

const pinnedSectionKey = 'gestalt-pinned-components';

export type PinnedSectionContextType = {|
  pinnedSection: string,
  setPinnedSection: (val: string) => void,
|};

const hydra: Hydra<PinnedSectionContextType> = createHydra<PinnedSectionContextType>(
  'PinnedSection'
);

const {
  Provider: ContextProvider,
  Consumer: PinnedSectionContextConsumer,
  useHook: usePinnedSectionContext,
} = hydra;

function PinnedSectionContextProvider({
  children,
}: {|
  children?: Node,
|}): Node {
  const [pinnedSection, setPinnedSection] = useLocalStorage<string>(
    pinnedSectionKey,
    '[]'
  );

  return (
    <ContextProvider value={{ pinnedSection, setPinnedSection }}>
      {children}
    </ContextProvider>
  );
}

export {
  PinnedSectionContextProvider,
  PinnedSectionContextConsumer,
  usePinnedSectionContext,
};
