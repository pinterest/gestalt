import { $Keys } from 'utility-types';
import type { AbstractComponent } from 'react';
import icons from './icons/index';
interface Indexable {
  index(): number;
}
type TooltipProps = {
  accessibilityLabel?: string;
  inline?: boolean;
  idealDirection?: 'up' | 'right' | 'down' | 'left';
  text: string;
  zIndex?: Indexable;
};
type BaseIconButton = {
  accessibilityLabel: string;
  bgColor?:
    | 'transparent'
    | 'darkGray'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'white'
    | 'red';
  dangerouslySetSvgPath?: {
    __path: string;
  };
  disabled?: boolean;
  icon?: $Keys<typeof icons>;
  onClick?: (arg0: {
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary';
  padding?: 1 | 2 | 3 | 4 | 5;
  tabIndex?: -1 | 0;
  tooltip?: TooltipProps;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};
type IconButtonType = BaseIconButton & {
  accessibilityControls?: string;
  accessibilityExpanded?: boolean;
  accessibilityHaspopup?: boolean;
  accessibilityPopupRole?: 'menu' | 'dialog';
  role?: 'button';
  selected?: boolean;
  type?: 'submit' | 'button';
};
type LinkIconButtonType = BaseIconButton & {
  href: string;
  rel?: 'none' | 'nofollow';
  role: 'link';
  target?: null | 'self' | 'blank';
};
type unionProps = IconButtonType | LinkIconButtonType;
type unionRefs = HTMLButtonElement | HTMLAnchorElement;
/**
 * [IconButton](https://gestalt.pinterest.systems/web/iconbutton) allows users to take actions and make choices with a single click or tap. IconButtons use icons instead of text to convey available actions on a screen. IconButton is typically found in forms, dialogs and toolbars.
 Some buttons are specialized for particular tasks, such as navigation or presenting menus.
 *
 * ![IconButton light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/IconButton.spec.mjs-snapshots/IconButton-chromium-darwin.png)
 * ![IconButton dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/IconButton-dark.spec.mjs-snapshots/IconButton-dark-chromium-darwin.png)
 *
 */
declare const IconButtonWithForwardRef: AbstractComponent<unionProps, unionRefs>;
export default IconButtonWithForwardRef;
