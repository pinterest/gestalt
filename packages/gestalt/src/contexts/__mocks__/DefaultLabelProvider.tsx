import { type Context, createContext, type ReactNode, useContext } from 'react';
import { type DefaultLabelContextType, fallbackLabels } from '../DefaultLabelProvider';

const MockContext: Context<DefaultLabelContextType | null | undefined> = createContext<
  DefaultLabelContextType | null | undefined
>(fallbackLabels);

type Props = {
  children: ReactNode;
  labels?: null | DefaultLabelContextType;
};

export default function DefaultLabelProvider({ children, labels }: Props) {
  return <MockContext.Provider value={labels}>{children}</MockContext.Provider>;
}

type ValidComponent = keyof DefaultLabelContextType;

export function useDefaultLabelContext<C extends ValidComponent>(
  componentName: C,
): DefaultLabelContextType[C] {
  const labels = useContext(MockContext);
  return labels ? labels[componentName] : fallbackLabels[componentName];
}
