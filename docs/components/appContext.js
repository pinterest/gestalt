// @flow strict
import type { Node } from 'react';
import { useCookies } from 'react-cookie';

import { useEffect } from 'react';
import createHydra, { type Hydra } from './createHydra.js';
import useLocalStorage from './useLocalStorage.js';

const propTableVariantKey = 'gestalt-propTable-variant';
const localStorageTextDirectionKey = 'gestalt-text-direction';
const cookieColorSchemeKey = 'gestalt-color-scheme';

type PropTableVariant = 'collapsed' | 'expanded';
export type ColorScheme = 'light' | 'dark' | 'userPreference';
type DirectionScheme = 'ltr' | 'rtl';

export type AppContextType = {|
  propTableVariant: PropTableVariant,
  setPropTableVariant: (val: PropTableVariant) => void,
  colorScheme: ColorScheme,
  setColorScheme: (val: ColorScheme) => void,
  textDirection: DirectionScheme,
  setTextDirection: (val: DirectionScheme) => void,
|};

const {
  Provider,
  Consumer: AppContextConsumer,
  useHook: useAppContext,
}: Hydra<AppContextType> = createHydra<AppContextType>('AppContext');

function AppContextProvider({ children }: {| children?: Node |}): Node {
  const [cookies, setCookie] = useCookies([cookieColorSchemeKey]);

  const [propTableVariant, setPropTableVariant] = useLocalStorage<PropTableVariant>(
    propTableVariantKey,
    'expanded',
  );

  const [textDirection, setTextDirection] = useLocalStorage<DirectionScheme>(
    localStorageTextDirectionKey,
    'ltr',
  );

  useEffect(() => {
    if (document && document.documentElement) {
      document.documentElement.dir = textDirection;
    }
  }, [textDirection]);

  return (
    <Provider
      value={{
        propTableVariant,
        setPropTableVariant,
        colorScheme: cookies[cookieColorSchemeKey] || 'light',
        setColorScheme: (newColorScheme) => {
          setCookie(cookieColorSchemeKey, newColorScheme);
        },
        textDirection,
        setTextDirection,
      }}
    >
      {children}
    </Provider>
  );
}

export { AppContextProvider, AppContextConsumer, useAppContext };
