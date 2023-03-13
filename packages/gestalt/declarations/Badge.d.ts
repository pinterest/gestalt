import type { Node } from "react";
import "react";
import type { Indexable } from "./zIndex";
import "./zIndex";
declare type Position = "middle" | "top";
declare type TooltipProps = {
    accessibilityLabel?: string;
    idealDirection?: "up" | "right" | "down" | "left";
    text: string;
    zIndex?: Indexable;
};
export declare type TypeOptions = "info" | "error" | "warning" | "success" | "neutral" | "recommendation" | "darkWash" | "lightWash";
declare type Props = {
    /**
     * Badge position relative to its parent element. See the [positioning](https://gestalt.pinterest.systems/web/badge#Positioning) variant to learn more.
     */
    position?: Position;
    /**
     * Text displayed inside of the Badge. Sentence case is preferred.
     */
    text: string;
    /**
     *  Experimental prop, do not use. Adds a [Tooltip](/web/tooltip) on hover/focus of the Badge. To convey the interaction, it also displays an information Icon. See the [type](https://gestalt.pinterest.systems/web/badge#Type) variant to learn more.
     */
    tooltip?: TooltipProps;
    /**
     * Determines the style of the badge. See the [type](https://gestalt.pinterest.systems/web/badge#Type) variant to learn more.
     */
    type?: TypeOptions;
};
/**
 * [Badge](https://gestalt.pinterest.systems/web/badge) is a label that indicates status or importance. Badges should provide quick recognition.
 *
 * ![Badge light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Badge.spec.mjs-snapshots/Badge-chromium-darwin.png)
 * ![Badge dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Badge-dark.spec.mjs-snapshots/Badge-dark-chromium-darwin.png)
 *
 */
export default function Badge({ position, text, type, tooltip, }: Props): Node;
export {};
