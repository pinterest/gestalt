import type { Element, Node } from "react";
import Text from "./Text";
import type { Indexable } from "./zIndex";
import "./zIndex";
declare type Size = "sm" | "flexible";
declare type IdealDirection = "up" | "right" | "down" | "left";
declare type Role = "dialog" | "tooltip";
declare type PrimaryActionType = {
    accessibilityLabel?: string;
    href?: string;
    text: string;
    onClick?: (arg0: {
        event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLButtonElement>;
        dangerouslyDisableOnNavigation: () => void;
    }) => void;
    rel?: "none" | "nofollow";
    target?: null | "self" | "blank";
};
declare type Props = {
    /**
     * Unique label to describe each PopoverEducational. See the [accessibility section](https://gestalt.pinterest.systems/web/popovereducational#ARIA-attributes) for more guidance.
     */
    accessibilityLabel: string;
    /**
     * The reference element that PopoverEducational uses to set its position.
     */
    anchor: HTMLElement | null | undefined;
    /**
     * The optional content shown in PopoverEducational. See the [custom content section](https://gestalt.pinterest.systems/web/popovereducational#Custom-content) for more guidance.
     */
    children?: Node;
    /**
     * Unique id to identify each PopoverEducational. Used for [accessibility](https://gestalt.pinterest.systems/web/popovereducational#ARIA-attributes) purposes.
     */
    id?: string;
    /**
     * Specifies the preferred position of PopoverEducational relative to its anchor element.
     */
    idealDirection?: IdealDirection;
    /**
     * Callback fired when PopoverEducational is closed. Must be used to control Popover’s on/off display state. See the [visibility on page load variant](https://gestalt.pinterest.systems/web/popovereducational#Visibility-on-page-load) to learn more.
     */
    onDismiss: () => void;
    /**
     * Main action for users to take on PopoverEducational. If `href` is supplied, the action will serve as a link. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) to learn more about link navigation.
     * If no `href` is supplied, the action will be a button.
     * The `accessibilityLabel` should follow the [accessibility guidelines for Button](https://gestalt.pinterest.systems/web/button#ARIA-attributes).
     * See the [primary action variant](https://gestalt.pinterest.systems/web/popovereducational#Primary-action) to learn more.
     */
    primaryAction?: PrimaryActionType;
    /**
     * Main text content of PopoverEducational. Content should be [localized](https://gestalt.pinterest.systems/web/popovereducational#Localization). See the [message variant](https://gestalt.pinterest.systems/web/popovereducational#Message) to learn more.
     *
     */
    message?: string | Element<typeof Text>;
    /**
     * The underlying ARIA role for PopoverEducational. See the [role section in Accessibility](https://gestalt.pinterest.systems/web/popovereducational#Role) for more info.
     */
    role?: Role;
    /**
     * Puts the focus on PopoverEducational when it’s triggered. See the [keyboard navigation section in Accessibility](https://gestalt.pinterest.systems/web/popovereducational#Keyboard-navigation) to learn more.
     */
    shouldFocus?: boolean;
    /**
     * The maximum width of PopoverEducational. See the [size variant](https://gestalt.pinterest.systems/web/popovereducational#Size) to learn more.
     */
    size?: Size;
    /**
     * An object representing the zIndex value of PopoverEducational. Learn more about [zIndex classes](https://gestalt.pinterest.systems/web/zindex_classes)
     */
    zIndex?: Indexable;
};
/**
 * [PopoverEducational](https://gestalt.pinterest.systems/web/popovereducationaleducational) is a floating container that introduces users to elements on the screen. Used for education or onboarding experiences.
 * ![PopoverEducational light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/PopoverEducational.spec.mjs-snapshots/PopoverEducational-chromium-darwin.png)
 * ![PopoverEducational dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/PopoverEducational-dark.spec.mjs-snapshots/PopoverEducational-dark-chromium-darwin.png)
 */
export default function PopoverEducational({ accessibilityLabel, anchor, children, id, idealDirection, message, onDismiss, primaryAction, role, shouldFocus, size, zIndex, }: Props): Node;
export {};
