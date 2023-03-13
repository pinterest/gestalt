import type { Node } from "react";
declare type Props = {
    /**
     * String that clients such as VoiceOver will read to describe the element. Will default to `name` prop if not provided.
     */
    accessibilityLabel?: string;
    /**
     * The name of the user. This is used for the placeholder treatment if an image is not available.
     */
    name: string;
    /**
     * Adds a white border around Avatar so it's visible when displayed on other images.
     */
    outline?: boolean;
    /**
     * xs: 24px, sm: 32px, md: 48px, lg: 64px, xl: 120px. If size is `fit`, Avatar will fill 100% of the parent container width.
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "fit";
    /**
     * The URL of the user's image.
     */
    src?: string;
    /**
     * Used to indicate if the user is verified.
     */
    verified?: boolean;
};
/**
 * [Avatar](https://gestalt.pinterest.systems/web/avatar) is used to represent a user. Every Avatar image has a subtle color wash.
 *
 * ![Avatar light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Avatar.spec.mjs-snapshots/Avatar-chromium-darwin.png)
 * ![Avatar dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Avatar-dark.spec.mjs-snapshots/Avatar-dark-chromium-darwin.png)
 *
 */
declare function Avatar(props: Props): Node;
declare namespace Avatar {
    var displayName: string;
}
export default Avatar;
