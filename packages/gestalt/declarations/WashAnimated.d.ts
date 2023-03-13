import type { Node } from "react";
declare type Props = {
    /**
     * Used to force the "active" hover state visually.
     */
    active?: boolean | null | undefined;
    /**
     *
     */
    children?: Node;
    /**
     * An optional [Image](https://gestalt.pinterest.systems/web/image) to be displayed at the top of the layout.
     */
    image?: Node;
    /**
     * Optional callback fired when the user hovers over from WashAnimated.
     */
    onMouseEnter?: (arg0: {
        event: React.MouseEvent<HTMLDivElement>;
    }) => void;
    /**
     * Optional callback fired when the user hovers off WashAnimated.
     */
    onMouseLeave?: (arg0: {
        event: React.MouseEvent<HTMLDivElement>;
    }) => void;
};
/**
 * [WashAnimated](https://gestalt.pinterest.systems/web/washanimated) is used to highlight content in grids. It visually shows that children elements belong together and can highlight the items on hover.
 * ![WashAnimated light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/WashAnimated.spec.mjs-snapshots/WashAnimated-chromium-darwin.png)
 * ![WashAnimated dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/WashAnimated-dark.spec.mjs-snapshots/Button-dark-chromium-darwin.png)
 */
export default function WashAnimated({ active, children, image, onMouseEnter, onMouseLeave, }: Props): Node;
export {};
