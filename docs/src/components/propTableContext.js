// @flow strict
import React, { type Node } from 'react';
import createHydra, { type Hydra } from './createHydra.js';
import useLocalStorage from './useLocalStorage.js';

const propTableVariantKey = 'gestalt-propTable-variant';

type PropTableVariant = 'collapsed' | 'expanded';
export type PropTableContextType = {|
  propTableVariant: PropTableVariant,
  setPropTableVariant: (val: PropTableVariant) => void,
|};

const hydra: Hydra<PropTableContextType> = createHydra<PropTableContextType>(
  'PropTable'
);

const {
  Provider: ContextProvider,
  Consumer: PropTableContextConsumer,
  useHook: usePropTableContext,
} = hydra;

function PropTableContextProvider({ children }: {| children?: Node |}): Node {
  const [propTableVariant, setPropTableVariant] = useLocalStorage<
    'expanded' | 'collapsed'
  >(propTableVariantKey, 'expanded');

  return (
    <ContextProvider value={{ propTableVariant, setPropTableVariant }}>
      {children}
    </ContextProvider>
  );
}

export {
  PropTableContextProvider,
  PropTableContextConsumer,
  usePropTableContext,
};
