// @flow strict
import PropTypes from 'prop-types';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import {
  type onNavigationOptionsType,
  onNavigationOptionsPropType,
} from './contexts/OnNavigation.js';

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
  onNavigationOptions?: onNavigationOptionsType,
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
  onNavigationOptions: onNavigationOptionsPropType,
});
// $FlowFixMe[incompatible-exact]
// $FlowFixMe[incompatible-type]
export const DismissButtonPropType: React$PropType$Primitive<DismissButtonType> = PropTypes.exact({
  accessibilityLabel: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
});
