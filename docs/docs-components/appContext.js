// @flow strict
import { type Node, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import createHydra, { type Hydra } from './createHydra.js';

const colorSchemeKey = 'gestalt-color-scheme';
const propTableVariantKey = 'gestalt-propTable-variant';
const textDirectionKey = 'gestalt-text-direction';
const experimentsKey = 'gestalt-experiments';
const devExampleModeKey = 'gestalt-devExampleMode';

type PropTableVariant = 'collapsed' | 'expanded';
type ColorScheme = 'light' | 'dark';
type DirectionScheme = 'ltr' | 'rtl';
type Experiments = string;
type DevExampleMode = 'development' | 'default';

export type AppContextType = {|
  propTableVariant: PropTableVariant,
  setPropTableVariant: (val: PropTableVariant) => void,
  colorScheme: ColorScheme,
  setColorScheme: (val: ColorScheme) => void,
  textDirection: DirectionScheme,
  setTextDirection: (val: DirectionScheme) => void,
  experiments: Experiments,
  setExperiments: (val: Experiments) => void,
  devExampleMode: DevExampleMode,
  setDevExampleMode: (val: DevExampleMode) => void,
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
    devExampleModeKey,
  ]);

  const colorScheme: ColorScheme = cookies[colorSchemeKey] === 'dark' ? 'dark' : 'light';
  const propTableVariant: PropTableVariant =
    cookies[propTableVariantKey] === 'collapsed' ? 'collapsed' : 'expanded';
  const textDirection: DirectionScheme = cookies[textDirectionKey] === 'rtl' ? 'rtl' : 'ltr';

  const experiments: Experiments = cookies[experimentsKey] ?? [];
  const devExampleMode: DevExampleMode =
    cookies[devExampleModeKey] === 'development' ? 'development' : 'default';

  const setColorScheme = (newColorScheme: ColorScheme) =>
    setCookies(colorSchemeKey, newColorScheme);
  const setPropTableVariant = (variant: PropTableVariant) =>
    setCookies(propTableVariantKey, variant);
  const setTextDirection = (direction: DirectionScheme) => setCookies(textDirectionKey, direction);
  const setExperiments = (component: Experiments) => {
    setCookies(experimentsKey, component);
  };
  const setDevExampleMode = (state: DevExampleMode) => setCookies(devExampleModeKey, state);

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
        devExampleMode,
        setDevExampleMode,
      }}
    >
      {children}
    </Provider>
  );
}

export { AppContextConsumer, AppContextProvider, useAppContext };
