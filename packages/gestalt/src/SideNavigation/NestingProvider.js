// @flow strict
import { type Context, type Element, type Node, useContext, createContext } from 'react';

type NestingContextType = {|
  nestedLevel: number,
|};

type Props = {|
  children: Node,
|};

const NestingContext: Context<NestingContextType> = createContext<NestingContextType>({
  nestedLevel: 0,
});

const { Provider } = NestingContext;

function NestingProvider({ children }: Props): Element<typeof Provider> {
  const { nestedLevel } = useContext(NestingContext);

  const nextNestedLevel = (nestedLevel ?? 0) + 1;

  if (nextNestedLevel > 2) {
    throw new Error(
      'Gestalt SideNavigation does not allow more than 2 nested levels of navigation',
    );
  }

  const nestingContext = {
    nestedLevel: nextNestedLevel,
  };

  return <Provider value={nestingContext}>{children}</Provider>;
}

function useNesting(): NestingContextType {
  const { nestedLevel } = useContext(NestingContext);
  return { nestedLevel: nestedLevel ?? 0 };
}

export { NestingProvider, useNesting };
