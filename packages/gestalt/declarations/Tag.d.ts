import type { Node } from "react";
import "react";
declare type Props = {
    /**
     * If your app uses DefaultLabelProvider, a default value for this label will be used. Using this prop will override the default label value with a more specific label if desired. This populates the `aria-label` on the remove icon.
     */
    accessibilityRemoveIconLabel?: string;
    /**
     * Disabled tags appear inactive and cannot be interacted with.
     */
    disabled?: boolean;
    /**
     * Callback fired when the user dismisses the tag. This handler should take care of state updates to no longer render the Tag.
     */
    onRemove: (arg0: {
        event: React.MouseEvent<HTMLButtonElement>;
    }) => void;
    /**
     * Short text to render inside the Tag.
     */
    text: string;
    /**
     * Communicate a "warning" or "error" state to the user, with an accompanying icon and specific background color.
     */
    type?: "default" | "error" | "warning";
};
/**
 * [Tags](https://gestalt.pinterest.systems/web/tag) are objects that hold text and have a delete icon to remove them. They can appear within [TextFields](https://gestalt.pinterest.systems/web/textfield#tagsExample), [TextAreas](https://gestalt.pinterest.systems/web/textarea#tagsExample), [ComboBox](https://gestalt.pinterest.systems/web/combobox#Tags) or as standalone components.
 *
 * ![Tag light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tag.spec.mjs-snapshots/Tag-chromium-darwin.png)
 * ![Tag dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tag-dark.spec.mjs-snapshots/Tag-dark-chromium-darwin.png)
 */
export default function Tag({ accessibilityRemoveIconLabel, disabled, onRemove, text, type, }: Props): Node;
export {};
