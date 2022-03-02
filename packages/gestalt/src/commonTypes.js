// @flow strict
import { type AbstractEventHandler } from './AbstractEventHandler.js';

export type ActionDataType = {|
  accessibilityLabel: string,
  disabled?: boolean,
  href?: string,
  label: string,
  onClick?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>,
    {| dangerouslyDisableOnNavigation: () => void |},
  >,
  rel?: 'none' | 'nofollow',
  target?: null | 'self' | 'blank',
|};

export type DismissButtonType = {|
  accessibilityLabel: string,
  onDismiss: () => void,
|};
