// @flow strict
import PropTypes from 'prop-types';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

export type ActionDataType = {|
  accessibilityLabel?: string,
  href?: string,
  label: string,
  onClick?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>,
    {| disableOnNavigation: () => void |},
  >,
  rel?: 'none' | 'nofollow',
  target?: null | 'self' | 'blank',
|};

export type DismissButtonType = {|
  accessibilityLabel: string,
  onDismiss: () => void,
|};

// $FlowFixMe[incompatible-exact]
export const ActionDataPropType: React$PropType$Primitive<ActionDataType> = PropTypes.exact({
  accessibilityLabel: PropTypes.string,
  href: PropTypes.string,
  label: PropTypes.string.isRequired,
  // $FlowFixMe[incompatible-type]
  onClick: PropTypes.func,
  rel: PropTypes.oneOf(['none', 'nofollow']),
  target: PropTypes.oneOf([null, 'self', 'blank']),
});
// $FlowFixMe[incompatible-exact]
// $FlowFixMe[incompatible-type]
export const DismissButtonPropType: React$PropType$Primitive<DismissButtonType> = PropTypes.exact({
  accessibilityLabel: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
});
