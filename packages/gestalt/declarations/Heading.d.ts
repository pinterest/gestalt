import type { Node } from "react";
declare type AccessibilityLevel = 1 | 2 | 3 | 4 | 5 | 6 | "none";
declare type Overflow = "normal" | "breakWord";
declare type Size = "100" | "200" | "300" | "400" | "500" | "600";
declare type Props = {
    /**
     * Allows you to override the default heading level for the given `size`.
     */
    accessibilityLevel?: AccessibilityLevel;
    /**
     * `"start"` and `"end"` should be used for regular alignment since they flip with locale direction. `"forceLeft"` and `"forceRight"` should only be used in special cases where locale direction should be ignored, such as tabular or numeric text. See [Alignment example](https://gestalt.pinterest.systems/web/heading#Alignment) for more details.
     */
    align?: "start" | "end" | "center" | "forceLeft" | "forceRight";
    /**
     *
     */
    children?: Node;
    /**
     * The color of the text. See [Text colors example](https://gestalt.pinterest.systems/foundations/design_tokens#Text-color) for more details.
     */
    color?: "default" | "subtle" | "success" | "error" | "warning" | "shopping" | "inverse" | "light" | "dark";
    /**
     * A unique identifier for the element.
     */
    id?: string;
    /**
     * Visually truncate the text to the specified number of lines. This also adds the `title` attribute if `children` is a string, which displays the full text on hover in most browsers. See [Truncation example](https://gestalt.pinterest.systems/web/heading#Overflow-and-truncation) for more details.
     */
    lineClamp?: number;
    /**
     * How truncation is handled when text overflows the line. See [Truncation example](https://gestalt.pinterest.systems/web/heading#Overflow-and-truncation) for more details.
     */
    overflow?: Overflow;
    /**
     * The font size of the text. See [Sizes example](https://gestalt.pinterest.systems/web/heading#Size) for more details.
     * The sizes are based on our [font-size design tokens](https://gestalt.pinterest.systems/foundations/design_tokens#Font-size).
     */
    size?: Size;
};
/**
 * [Heading](https://gestalt.pinterest.systems/web/heading) allows you to add H1–H6 level text on a page. They are generally placed underneath a PageHeader, and provide you with a way to create a logical text hierarchy.
 *
 * ![Heading light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Heading.spec.mjs-snapshots/Heading-chromium-darwin.png)
 * ![Heading dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Heading-dark.spec.mjs-snapshots/Heading-dark-chromium-darwin.png)
 *
 */
export default function Heading({ accessibilityLevel, align, children, color, lineClamp, id, overflow, size, }: Props): Node;
export {};
