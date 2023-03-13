import type { Node, AbstractComponent } from "react";
declare type Props = {
    /**
     * Indicate if autocomplete should be available on the input.
     */
    autoComplete?: "on" | "off";
    /**
     * Indicate if the input is disabled.
     */
    disabled?: boolean;
    /**
     *  Optionally specify the action label to present for the enter key on virtual keyboards. See the [enterKeyHint variant](https://gestalt.pinterest.systems/web/numberfield#EnterKeyHint) for more info.
     *
     */
    enterKeyHint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send";
    /**
     * For most use cases, pass a string with a helpful error message (be sure to localize!). In certain instances it can be useful to make some text clickable; to support this, you may instead pass a React.Node to wrap text in [Link](https://gestalt.pinterest.systems/web/link) or [TapArea](https://gestalt.pinterest.systems/web/taparea).
     */
    errorMessage?: Node;
    /**
     * More information for the user about how to complete the form field.
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
     * The upper bound of valid input, inclusive.
     */
    max?: number;
    /**
     * The lower bound of valid input, inclusive.
     */
    min?: number;
    /**
     * A unique name for the input.
     */
    name?: string;
    /**
     * Callback triggered when the user blurs the input.
     */
    onBlur?: (arg0: {
        event: React.FocusEvent<HTMLInputElement>;
        value: number | void;
    }) => void;
    /**
     * Callback triggered when the value of the input changes, whether by keyboard entry or the input's arrows.
     */
    onChange: (arg0: {
        event: React.SyntheticEvent<HTMLInputElement>;
        value: number | void;
    }) => void;
    /**
     * Callback triggered when the user focuses the input.
     */
    onFocus?: (arg0: {
        event: React.FocusEvent<HTMLInputElement>;
        value: number | void;
    }) => void;
    /**
     * Callback triggered when the user presses any key while the input is focused.
     */
    onKeyDown?: (arg0: {
        event: React.KeyboardEvent<HTMLInputElement>;
        value: number | void;
    }) => void;
    /**
     * Placeholder text shown the the user has not yet input a value.
     */
    placeholder?: string;
    /**
     * Ref that is forwarded to the underlying input element.
     */
    ref?: Element<"input">;
    /**
     * md: 40px, lg: 48px
     */
    size?: "md" | "lg";
    /**
     * Indicates the amount the value will increase or decrease when using the input's arrows.
     */
    step?: number;
    /**
     * The current value of the input.
     */
    value?: number | void;
};
/**
 * [NumberField](https://gestalt.pinterest.systems/web/numberfield) allows for numerical input.
 *
 * ![NumberField light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/NumberField.spec.mjs-snapshots/NumberField-chromium-darwin.png)
 * ![NumberField dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/NumberField-dark.spec.mjs-snapshots/NumberField-dark-chromium-darwin.png)
 *
 */
declare const NumberFieldWithForwardRef: AbstractComponent<Props, HTMLInputElement>;
export default NumberFieldWithForwardRef;
