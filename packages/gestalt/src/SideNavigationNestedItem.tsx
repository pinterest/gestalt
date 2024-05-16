import { forwardRef, ReactNode } from 'react';
import SideNavigationTopItem from './SideNavigationTopItem';

type Props = {
  /**
   * When set to 'page' or 'section', it displays the item in "active" state. See the [Accessibility](https://gestalt.pinterest.systems/web/sidenavigation#Accessibility) guidelines to learn more.
   */
  active?: 'page' | 'section';
  /**
   * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more.
   */
  counter?: {
    number: string;
    accessibilityLabel: string;
  };
  /**
   * Directs users to the url when item is selected.
   */
  href: string;
  /**
   * Label for the item.
   */
  label: string;
  /**
   * Callback when the user selects an item using the mouse or keyboard.
   */
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  /**
   * Ref that is forwarded to the underlying `li` element.
   */
  ref?: HTMLLIElement; // eslint-disable-line react/no-unused-prop-types
};

/**
 * Use [SideNavigation.NestedItem](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.NestedItem) to redirect the user to a different page or section. SideNavigation.NestedItem must be used in second and third nested levels.
 */
const SideNavigationNestedItemWithForwardRef = forwardRef<HTMLLIElement, Props>(
  // @ts-expect-error - TS2345 - Argument of type '({ active, counter, href, label, onClick }: Props, ref: ForwardedRef<HTMLLIElement>) => ReactNode' is not assignable to parameter of type 'ForwardRefRenderFunction<HTMLLIElement, Props>'.
  function SideNavigationNestedItem(
    { active, counter, href, label, onClick }: Props,
    ref,
  ): ReactNode {
    return (
      <SideNavigationTopItem
        ref={ref}
        active={active}
        counter={counter}
        href={href}
        label={label}
        onClick={onClick}
      />
    );
  },
);

SideNavigationNestedItemWithForwardRef.displayName = 'SideNavigation.NestedItem';

export default SideNavigationNestedItemWithForwardRef;
