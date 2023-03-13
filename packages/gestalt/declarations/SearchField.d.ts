import type { AbstractComponent } from 'react';
declare type UnionRefs = HTMLDivElement | HTMLAnchorElement;
declare type Props = {
  /**
   * String that clients such as VoiceOver will read to describe the element. Always localize the label. See the [Accessibility section](https://gestalt.pinterest.systems/web/searchfield#Accessibility) for more info.
   */
  accessibilityLabel: string;
  /**
   * String that clients such as VoiceOver will read to describe the clear button element. Always localize the label. See the [Accessibility section](https://gestalt.pinterest.systems/web/searchfield#Accessibility) for more info.
   */
  accessibilityClearButtonLabel?: string;
  /**
   * The type of autocomplete used, if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for more info.
   */
  autoComplete?: 'on' | 'off' | 'username' | 'name';
  /**
   * Error text displayed below the input field.
   */
  errorMessage?: string;
  /**
   * Must be unique!
   */
  id: string;
  /**
   * Text used to label the input. Be sure to localize the text. See the [Visible label variant](https://gestalt.pinterest.systems/web/searchfield#Visible-label) for more info.
   */
  label?: string;
  /**
   *
   */
  onBlur?: (arg0: { event: React.KeyboardEvent<HTMLInputElement>; value: string }) => void;
  /**
   * Primary callback to handle keyboard input.
   */
  onChange: (arg0: {
    value: string;
    syntheticEvent: React.SyntheticEvent<HTMLInputElement>;
  }) => void;
  /**
   *
   */
  onFocus?: (arg0: {
    value: string;
    syntheticEvent: React.SyntheticEvent<HTMLInputElement>;
  }) => void;
  /**
   * Secondary callback for keyboard events. Possible uses include validation, form submission, etc.
   */
  onKeyDown?: (arg0: { event: React.KeyboardEvent<HTMLInputElement>; value: string }) => void;
  /**
   * Text displayed before the user has entered anything.
   */
  placeholder?: string;
  /**
   * Ref that is forwarded to the underlying input element.
   */
  ref?: UnionRefs;
  /**
   * md: 40px, lg: 48px
   */
  size?: 'md' | 'lg';
  /**
   * The current value of the input.
   */
  value?: string;
};
/**
 * [SearchField](https://gestalt.pinterest.systems/web/searchfield) allows users to search for free-form content.
 *
 * ![SearchField light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SearchField.spec.mjs-snapshots/SearchField-chromium-darwin.png)
 * ![SearchField dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SearchField-dark.spec.mjs-snapshots/SearchField-dark-chromium-darwin.png)
 *
 */
declare const SearchFieldWithForwardRef: AbstractComponent<Props, HTMLInputElement>;
export default SearchFieldWithForwardRef;
