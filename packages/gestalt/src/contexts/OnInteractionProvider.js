// @flow strict
import { createContext, type Context, type Element, type Node, useContext } from 'react';

// flowlint unclear-type:off
export type OnInteractionType = ({|
  componentName: string,
  onInteractionData?: {| [string]: any |},
|}) => ?({|
  +event: SyntheticEvent<>,
|}) => void;
// flowlint unclear-type:error

type OnInteractionContextType = {| onInteraction: OnInteractionType |};

type Props = {|
  /**
   *
   */
  children: Node,
  /**
   * If passed, interactive components will execute the function on the onClick or onChange event.
   */
  onInteraction?: OnInteractionType,
|};

const OnInteractionContext: Context<OnInteractionContextType | void> = createContext<OnInteractionContextType | void>();

const { Provider } = OnInteractionContext;

/**
 * ALPHA - DO NOT USE YET - MAY HAVE BREAKING CHANGES / BE DEPRECATED IN THE NEAR FUTURE*
 * [OnInteractionProvider](https://gestalt.pinterest.systems/onlinknavigationprovider) is a [React context provider](https://reactjs.org/docs/context.html#contextprovider) that provides external logic to interactive components executed on the onClick and onChange events.
 */
function OnInteractionProvider({ children, onInteraction }: Props): Element<typeof Provider> {
  return <Provider value={onInteraction ? { onInteraction } : undefined}>{children}</Provider>;
}

export function useOnInteraction({
  componentName,
  onInteractionData,
}: {|
  componentName: string,
  // $FlowFixMe[unclear-type]
  onInteractionData?: {| [string]: any |},
|}): ?({|
  +event: SyntheticEvent<>,
|}) => void {
  const onInteractionContext = useContext(OnInteractionContext);
  const onInteractionHandler = onInteractionContext?.onInteraction({
    componentName,
    onInteractionData,
  });
  return onInteractionHandler;
}

OnInteractionProvider.displayName = 'ExperimentalOnInteractionProvider';

export default OnInteractionProvider;
