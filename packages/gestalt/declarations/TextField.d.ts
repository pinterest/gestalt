import type { Element, Node, AbstractComponent } from "react";
import Tag from "./Tag";
declare type Type = "date" | "email" | "password" | "tel" | "text" | "url";
export declare type MaxLength = {
    characterCount: number;
    errorAccessibilityLabel: string;
};
declare type Props = {
    /**
     * Indicate if autocomplete should be available on the input, and the type of autocomplete. Autocomplete values are implemented upon request. [Reach out to the Gestalt team](https://gestalt.pinterest.systems/get_started/how_to_work_with_us#Slack-channels) if you need [additional autocomplete values](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values) to be supported.
     */
    autoComplete?: "bday" | "current-password" | "email" | "new-password" | "on" | "off" | "username";
    /**
     * Indicate if the input is disabled. See the [disabled example](https://gestalt.pinterest.systems/web/textfield#Disabled) for more details.
     */
    disabled?: boolean;
    /**
     *  Optionally specify the action label to present for the enter key on virtual keyboards. See the [enterKeyHint variant](https://gestalt.pinterest.systems/web/textfield#EnterKeyHint) for more info.
     */
    enterKeyHint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send";
    /**
     * For most use cases, pass a string with a helpful error message (be sure to localize!). In certain instances it can be useful to make some text clickable; to support this, you may instead pass a React.Node to wrap text in [Link](https://gestalt.pinterest.systems/web/link) or [TapArea](https://gestalt.pinterest.systems/web/taparea).
     */
    errorMessage?: Node;
    /**
     * This field is deprecated and will be removed soon. Please do not use.
     */
    hasError?: boolean;
    /**
     * More information about how to complete the form field.
     */
    helperText?: string;
    /**
     * A unique identifier for the input.
     */
    id: string;
    /**
     * The label for the input. Be sure to localize the text.
     */
    label?: string;
    /**
     * Whether the label should be visible or not. If `hidden`, the label is still available for screen reader users, but does not appear visually. See the [label visibility variant](https://gestalt.pinterest.systems#Label-visibility) for more info.
     */
    labelDisplay?: "visible" | "hidden";
    /**
     * The maximum number of characters allowed in Textfield. `maxLength` must be an integer value 0 or higher. See the [maximum length variant](https://gestalt.pinterest.systems/web/textfield#Maximum-length) for more details.
     */
    maxLength?: MaxLength;
    /**
     * A unique name for the input.
     */
    name?: string;
    /**
     * Callback triggered when the user blurs the input.
     */
    onBlur?: (arg0: {
        event: React.FocusEvent<HTMLInputElement>;
        value: string;
    }) => void;
    /**
     * Callback triggered when the value of the input changes.
     */
    onChange: (arg0: {
        event: React.SyntheticEvent<HTMLInputElement>;
        value: string;
    }) => void;
    /**
     * Callback triggered when the user focuses the input.
     */
    onFocus?: (arg0: {
        event: React.FocusEvent<HTMLInputElement>;
        value: string;
    }) => void;
    /**
     * Callback triggered when the user presses any key while the input is focused.
     */
    onKeyDown?: (arg0: {
        event: React.KeyboardEvent<HTMLInputElement>;
        value: string;
    }) => void;
    /**
     * Placeholder text shown the the user has not yet input a value.
     */
    placeholder?: string;
    /**
     * Indicate if the input is readOnly. See the [readOnly example](https://gestalt.pinterest.systems/web/textfield#Read-only) for more details.
     */
    readOnly?: boolean;
    /**
     * Ref that is forwarded to the underlying input element.
     */
    ref?: Element<"input">;
    /**
     * List of tags to display in the component.
     */
    tags?: ReadonlyArray<Element<typeof Tag>>;
    /**
     * The type of input. For non-telephone numerical input, please use [NumberField](https://gestalt.pinterest.systems/web/numberfield).
     */
    type?: Type;
    /**
     * md: 40px, lg: 48px
     */
    size?: "md" | "lg";
    /**
     * The current value of the input.
     */
    value?: string;
};
/**
 * [TextField](https://gestalt.pinterest.systems/web/textfield) allows for multiple types of text input.
 *
 * ![TextField light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TextField.spec.mjs-snapshots/TextField-chromium-darwin.png)
 * ![TextField dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TextField-dark.spec.mjs-snapshots/TextField-dark-chromium-darwin.png)
 *
 */
declare const TextFieldWithForwardRef: AbstractComponent<Props, HTMLInputElement>;
export default TextFieldWithForwardRef;
