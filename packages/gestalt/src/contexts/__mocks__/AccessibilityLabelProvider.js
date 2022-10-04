// @flow strict
import { createContext, type Context, useContext } from 'react';
import {
  fallbackLabels,
  type DefaultLabelContextType,
  // eslint-disable-next-line import/no-relative-parent-imports
} from '../DefaultLabelProvider.js';

const MockContext: Context<?DefaultLabelContextType> =
  createContext<?DefaultLabelContextType>(fallbackLabels);
const DefaultLabelProvider = MockContext.Provider;
export default DefaultLabelProvider;

type ValidComponent = $Keys<DefaultLabelContextType>;

export function useDefaultLabelContext<C: ValidComponent>(
  componentName: C,
): $ElementType<DefaultLabelContextType, C> {
  const labels = useContext(MockContext);
  return labels ? labels[componentName] : fallbackLabels[componentName];
}
