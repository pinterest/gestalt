import type { Context, Node } from "react";
import { useContext, createContext } from "react";
type EventHandlerType = (arg0: {
  readonly event: React.SyntheticEvent;
}) => void;
type OnLinkNavigationArgs = {
  href: string;
  target?: null | "self" | "blank";
};
export type OnLinkNavigationType = (
  arg0: OnLinkNavigationArgs
) => EventHandlerType | null | undefined;
type OnLinkNavigationContextType = {
  onNavigation: OnLinkNavigationType;
};
type Props = {
  children: Node;
  onNavigation: OnLinkNavigationType;
};
const OnLinkNavigationContext: Context<OnLinkNavigationContextType | void> = createContext<OnLinkNavigationContextType | void>();
const { Provider } = OnLinkNavigationContext;
/**
 * https://gestalt.pinterest.systems/OnLinkNavigationProvider
 */

export default function OnLinkNavigationProvider({
  onNavigation,
  children,
}: Props): Node {
  return (
    <Provider
      value={
        onNavigation
          ? {
              onNavigation,
            }
          : undefined
      }
    >
      {children}
    </Provider>
  );
}
export function useOnLinkNavigation({
  href,
  target,
}: OnLinkNavigationArgs): EventHandlerType | null | undefined {
  const onLinkNavigationContext = useContext(OnLinkNavigationContext);
  const onLinkNavigationHandler = onLinkNavigationContext?.onNavigation({
    href,
    target,
  });
  return onLinkNavigationHandler;
}