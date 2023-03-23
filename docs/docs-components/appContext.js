// @flow strict
import { type Node, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import createHydra, { type Hydra } from './createHydra.js';

const colorSchemeKey = 'gestalt-color-scheme';
const propTableVariantKey = 'gestalt-propTable-variant';
const textDirectionKey = 'gestalt-text-direction';
const experimentsKey = 'gestalt-experiments';
const sandpacksKey = 'gestalt-sandpack';

type PropTableVariant = 'collapsed' | 'expanded';
type ColorScheme = 'light' | 'dark';
type DirectionScheme = 'ltr' | 'rtl';
type Experiments = string;
type Sandpack = 'enabled' | 'disabled';

export type AppContextType = {|
  propTableVariant: PropTableVariant,
  setPropTableVariant: (val: PropTableVariant) => void,
  colorScheme: ColorScheme,
  setColorScheme: (val: ColorScheme) => void,
  textDirection: DirectionScheme,
  setTextDirection: (val: DirectionScheme) => void,
  experiments: Experiments,
  setExperiments: (val: Experiments) => void,
  sandpack: Sandpack,
  setSandpack: (val: Sandpack) => void,
|};

const {
  Provider,
  Consumer: AppContextConsumer,
  useHook: useAppContext,
}: Hydra<AppContextType> = createHydra<AppContextType>('AppContext');

function AppContextProvider({ children }: {| children?: Node |}): Node {
  const [cookies, setCookies] = useCookies([
    colorSchemeKey,
    propTableVariantKey,
    textDirectionKey,
    experimentsKey,
    sandpacksKey,
  ]);

  const colorScheme: ColorScheme = cookies[colorSchemeKey] === 'dark' ? 'dark' : 'light';
  const propTableVariant: PropTableVariant =
    cookies[propTableVariantKey] === 'collapsed' ? 'collapsed' : 'expanded';
  const textDirection: DirectionScheme = cookies[textDirectionKey] === 'rtl' ? 'rtl' : 'ltr';

  const experiments: Experiments = cookies[experimentsKey] ?? [];
  const sandpack: Sandpack = cookies[sandpacksKey] === 'enabled' ? 'enabled' : 'disabled';

  const setColorScheme = (newColorScheme) => setCookies(colorSchemeKey, newColorScheme);
  const setPropTableVariant = (variant) => setCookies(propTableVariantKey, variant);
  const setTextDirection = (direction) => setCookies(textDirectionKey, direction);
  const setExperiments = (component) => {
    setCookies(experimentsKey, component);
  };
  const setSandpack = (state) => setCookies(sandpacksKey, state);

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
        colorScheme,
        setColorScheme,
        textDirection,
        setTextDirection,
        experiments,
        setExperiments,
        sandpack,
        setSandpack,
      }}
    >
      {children}
    </Provider>
  );
}

export { AppContextProvider, AppContextConsumer, useAppContext };
