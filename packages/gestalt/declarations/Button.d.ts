import { $Keys } from 'utility-types';
import type { AbstractComponent } from 'react';
import icons from './icons/index';
declare type Target = null | 'self' | 'blank';
declare type BaseButton = {
  accessibilityLabel?: string;
  color?:
    | 'gray'
    | 'red'
    | 'blue'
    | 'transparent'
    | 'semiTransparentWhite'
    | 'transparentWhiteText'
    | 'white';
  dataTestId?: string;
  disabled?: boolean;
  iconEnd?: $Keys<typeof icons>;
  fullWidth?: boolean;
  name?: string;
  onClick?: (arg0: {
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  tabIndex?: -1 | 0;
  size?: 'sm' | 'md' | 'lg';
  text: string;
};
declare type ButtonType = BaseButton & {
  accessibilityControls?: string;
  accessibilityExpanded?: boolean;
  accessibilityHaspopup?: boolean;
  selected?: boolean;
  type?: 'button';
  role?: 'button';
};
declare type SubmitButtonType = BaseButton & {
  type: 'submit';
  role?: 'button';
};
declare type LinkButtonType = BaseButton & {
  href: string;
  rel?: 'none' | 'nofollow';
  role: 'link';
  target?: Target;
};
declare type unionProps = ButtonType | SubmitButtonType | LinkButtonType;
declare type unionRefs = HTMLButtonElement | HTMLAnchorElement;
/**
 * [Buttons](https://gestalt.pinterest.systems/web/button) allow users to perform actions within a surface. They can be used alone for immediate action, or as a trigger for another component, like [Dropdown](https://gestalt.pinterest.systems/web/dropdown) or [Popover](https://gestalt.pinterest.systems/web/popover).
 *
 * ![Button light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Button.spec.mjs-snapshots/Button-chromium-darwin.png)
 * ![Button dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Button-dark.spec.mjs-snapshots/Button-dark-chromium-darwin.png)
 *
 */
declare const ButtonWithForwardRef: AbstractComponent<unionProps, unionRefs>;
export default ButtonWithForwardRef;
