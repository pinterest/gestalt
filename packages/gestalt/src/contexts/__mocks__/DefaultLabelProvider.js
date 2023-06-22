// @flow strict
import { type Context, createContext, type Node, useContext } from 'react';
import { type DefaultLabelContextType, fallbackLabels } from '../DefaultLabelProvider.js';

const MockContext: Context<?DefaultLabelContextType> =
  createContext<?DefaultLabelContextType>(fallbackLabels);

type Props = {|
  children: Node,
  labels?: null | DefaultLabelContextType,
|};

export default function DefaultLabelProvider({ children, labels }: Props): Node {
  return <MockContext.Provider value={labels}>{children}</MockContext.Provider>;
}

type ValidComponent = $Keys<DefaultLabelContextType>;

export function useDefaultLabelContext<C: ValidComponent>(
  componentName: C,
): $ElementType<DefaultLabelContextType, C> {
  const labels = useContext(MockContext);
  return labels ? labels[componentName] : fallbackLabels[componentName];
}
