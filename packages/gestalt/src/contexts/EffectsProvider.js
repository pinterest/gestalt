// @flow strict
import { createContext, type Context, type Element, type Node, useContext } from 'react';

export type ComponentEffectsType = () => void;

type EffectsContextType = {| sheetMobile: ComponentEffectsType |} | void;

type Props = {|
  /**
   * Context lets a parent component provide data to the entire tree below it. Only components within the EffectsProvider tree will be able to subscribe to it.
   */
  children: Node,
  /**
   * [Custom hook](https://react.dev/learn/reusing-logic-with-custom-hooks) wrapping your effects for [SheetMobile](https://gestalt.pinterest.systems/web/sheetmobile). Call [useEffect](https://react.dev/reference/react/useEffect#useeffect) to declare an effect.
   */
  sheetMobile?: ComponentEffectsType,
|};

const EffectsContext: Context<EffectsContextType> = createContext<EffectsContextType>();

const { Provider } = EffectsContext;

/**
 * [EffectsProvider](https://gestalt.pinterest.systems/web/utilities/effectsprovider) is a [React context provider](https://react.dev/learn/passing-data-deeply-with-context) that allows your Gestalt components to synchronize with shared external systems.
 */
export default function EffectsProvider({
  children,
  sheetMobile,
}: Props): Element<typeof Provider> {
  return <Provider value={{ sheetMobile: sheetMobile ?? (() => {}) }}>{children}</Provider>;
}

export function useEffectsContext(): EffectsContextType {
  return useContext(EffectsContext);
}
