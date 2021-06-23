// @flow strict
import PropTypes from 'prop-types';

export type AriaCurrent = 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
export const AriaCurrentPropType = (PropTypes.oneOf([
  'page',
  'step',
  'location',
  'date',
  'time',
  'true',
  'false',
]): React$PropType$Primitive<AriaCurrent>);
