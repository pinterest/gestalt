// @flow strict
import { type Context, createContext, type Node as ReactNode, useContext } from 'react';
import { type DefaultLabelContextType, fallbackLabels } from '../DefaultLabelProvider';

const MockContext: Context<?DefaultLabelContextType> =
  createContext<?DefaultLabelContextType>(fallbackLabels);

type Props = {
  children: ReactNode,
  labels?: null | DefaultLabelContextType,
};

export default function DefaultLabelProvider({ children, labels }: Props): ReactNode {
  return <MockContext.Provider value={labels}>{children}</MockContext.Provider>;
}

type ValidComponent = $Keys<DefaultLabelContextType>;

export function useDefaultLabelContext<C: ValidComponent>(
  componentName: C,
): $ElementType<DefaultLabelContextType, C> {
  const labels = useContext(MockContext);
  return labels ? labels[componentName] : fallbackLabels[componentName];
}
