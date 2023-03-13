import { $ElementType } from "utility-types";
import type { Node, Element, ElementConfig, Ref } from "react";
import Text from "./Text";
import type { AbstractEventHandler } from "./AbstractEventHandler";
import "./AbstractEventHandler";
import Icon from "./Icon";
import type { Indexable } from "./zIndex";
declare type LinkType = {
    accessibilityLabel?: string;
    externalLinkIcon?: "none" | "default" | {
        color: $ElementType<ElementConfig<typeof Icon>, "color">;
        size: $ElementType<ElementConfig<typeof Text>, "size">;
    };
    href: string;
    onClick?: (arg0: {
        event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        dangerouslyDisableOnNavigation: () => void;
    }) => void;
    ref?: Ref<"a">;
    text: string;
    target?: null | "self" | "blank";
};
declare type OnTapType = AbstractEventHandler<React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>, {
    dangerouslyDisableOnNavigation: () => void;
}>;
declare type Props = {
    /**
     * Supply a short, descriptive label screen readers. Follow the pattern `Click to learn more about [description]`. See [Accessibility](https://gestalt.pinterest.systems/web/helpbutton#Accessibility) section for guidance.
     */
    accessibilityLabel: string;
    /**
     * Supply a short, descriptive label for screen-readers to describe the popover content. Used for [accessibility](https://gestalt.pinterest.systems/web/popover#ARIA-attributes) purposes.
     */
    accessibilityPopoverLabel: string;
    /**
     * Specifies the preferred position of the tooltip and popover relative to HelpButton. See [Popover's ideal direction variant](https://gestalt.pinterest.systems/web/popover#Ideal-direction) to learn more.
     */
    idealDirection?: "up" | "right" | "down" | "left";
    /**
     * Enables correct behavior when HelpButton is used within a fixed container. To achieve this it removes the Layer component around Popover and enables positioning relative to its anchor element. Should only be used in cases where Layer breaks the HelpButton positionings such as when the anchor element is within a sticky component.
     */
    isWithinFixedContainer?: boolean;
    /**
     * If provided, displays a [link api](https://gestalt.pinterest.systems/web/link#Props) at the bottom of the popover message.
     * - `href` is the URL that the hyperlink points to.
     * - `text` is the displayed text for the link. See the [link variant](https://gestalt.pinterest.systems/web/helpbutton#With-a-link) for more details.
     * - `target` see the [target Link variant](https://gestalt.pinterest.systems/web/link#Target) to learn more. If not defined the link will open in a new window.
     * - Optionally use `accessibilityLabel` to supply a short, descriptive label for screen-readers to replace link texts that don't provide sufficient context about the link component behavior. Texts like "Click Here", or "Read More" can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the link text. It populates `aria-label`. Screen readers read the `accessibilityLabel` prop, if present, instead of the link text. See [ Link's accessibility guidelines](https://gestalt.pinterest.systems/web/link#Accessibility) for more information.
     * - Optionally provide an `onClick` callback, which is fired when the link is clicked (pressed and released) with a mouse or keyboard. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) to learn more about link navigation.
     */
    link?: LinkType;
    /**
     * Callback fired when HelpIcon is clicked (pressed and released) with a mouse or keyboard.
     */
    onClick?: OnTapType;
    /**
     * Informational content that's displayed when the user clicks on HelpButton.
     */
    text: string | Element<typeof Text>;
    /**
     * Specifies the z-index for HelpButton's tooltip and popover to resolve any layering issues with other elements. See the [zIndex variant](https://gestalt.pinterest.systems/web/helpbutton#With-Z-index) for more details.
     */
    zIndex?: Indexable;
};
/**
 * [HelpButton](https://gestalt.pinterest.systems/web/helpbutton) is an affordance that accompanies an element on the screen. It helps describe or provide assistance on how to use the accompanying element.
 */
declare function HelpButton({ accessibilityLabel, accessibilityPopoverLabel, idealDirection, isWithinFixedContainer, link, onClick, text, zIndex, }: Props): Node;
declare namespace HelpButton {
    var displayName: string;
}
export default HelpButton;
