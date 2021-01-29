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
  >,
|};

export type DismissButtonType = {|
  accessibilityLabel: string,
  onDismiss: () => void,
|};

// $FlowFixMe[incompatible-exact]
export const ActionDataPropType: React$PropType$Primitive<ActionDataType> = PropTypes.exact({
  href: PropTypes.string,
  label: PropTypes.string.isRequired,
  // $FlowFixMe[incompatible-type]
  onClick: PropTypes.func,
  accessibilityLabel: PropTypes.string,
});
// $FlowFixMe[incompatible-exact]
// $FlowFixMe[incompatible-type]
export const DismissButtonPropType: React$PropType$Primitive<DismissButtonType> = PropTypes.exact({
  accessibilityLabel: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
});
