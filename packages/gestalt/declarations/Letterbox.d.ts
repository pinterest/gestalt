import type { Node } from "react";
import "react";
declare type Props = {
    /**
     *
     */
    children?: Node;
    /**
     * Proportional relationship between width and height of element.
     */
    contentAspectRatio: number;
    /**
     * Desired final height of element.
     */
    height: number;
    /**
     * Desired final width of element.
     */
    width: number;
};
/**
 * [Letterboxes](https://gestalt.pinterest.systems/web/letterbox) are useful if you have some source media which is larger than the area you want to display it in. For instance, you might have a really tall image and want it to be displayed in a neatly cropped square. While the ideal solution to this problem is to update the source image, this might not always be possible for either cost or performance reasons.
 *
 * Letterbox should be used in situations where you would otherwise use the CSS property \`background-size: cover\`.
 *
 * ![Letterbox light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Letterbox.spec.mjs-snapshots/Letterbox-chromium-darwin.png)

 */
export default function Letterbox({ children, contentAspectRatio, height, width, }: Props): Node;
export {};
