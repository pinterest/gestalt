// @flow strict

import type { Node } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import colors from './Colors.css';
import styles from './Text.css';
import typography from './Typography.css';

const SIZE_SCALE = {
  sm: 1,
  md: 2,
  lg: 3,
};

export type FontWeight = 'bold' | 'normal';

type Props = {|
  align?: 'start' | 'end' | 'center' | 'justify' | 'forceLeft' | 'forceRight',
  children?: Node,
  color?:
    | 'green'
    | 'pine'
    | 'olive'
    | 'blue'
    | 'navy'
    | 'midnight'
    | 'purple'
    | 'orchid'
    | 'eggplant'
    | 'maroon'
    | 'watermelon'
    | 'orange'
    | 'darkGray'
    | 'gray'
    | 'lightGray'
    | 'red'
    | 'white',
  inline?: boolean,
  italic?: boolean,
  lineClamp?: number,
  overflow?: 'normal' | 'breakWord' | 'noWrap',
  size?: 'sm' | 'md' | 'lg',
  truncate?: boolean,
  underline?: boolean,
  weight?: FontWeight,
|};

export default function Text({
  align = 'start',
  children,
  color = 'darkGray',
  inline = false,
  italic = false,
  lineClamp,
  overflow = 'breakWord',
  size = 'lg',
  truncate = false,
  underline = false,
  weight = 'normal',
}: Props): Node {
  const scale = SIZE_SCALE[size];

  const shouldUseLineClamp = Boolean(lineClamp ? lineClamp > 1 : false);

  const cs = cx(
    styles.Text,
    styles[`fontSize${scale}`],
    color && colors[color],
    align === 'center' && typography.alignCenter,
    align === 'justify' && typography.alignJustify,
    align === 'start' && typography.alignStart,
    align === 'end' && typography.alignEnd,
    align === 'forceLeft' && typography.alignForceLeft,
    align === 'forceRight' && typography.alignForceRight,
    overflow === 'breakWord' && typography.breakWord,
    overflow === 'noWrap' && typography.noWrap,
    italic && typography.fontStyleItalic,
    underline && typography.underline,
    weight === 'bold' && typography.fontWeightBold,
    weight === 'normal' && typography.fontWeightNormal,
    truncate && !lineClamp && typography.truncate,
    lineClamp === 1 && typography.truncate,
    shouldUseLineClamp && typography.lineClamp,
  );

  const additionalStyles = {
    ...((truncate || shouldUseLineClamp) && typeof children === 'string'
      ? { title: children }
      : {}),
    ...(shouldUseLineClamp ? { WebkitLineClamp: lineClamp } : {}),
  };

  const Tag = inline ? 'span' : 'div';

  return (
    <Tag
      className={cs}
      {...additionalStyles}
      // {...((truncate || shouldUseLineClamp) && typeof children === 'string'
      //   ? { title: children }
      //   : null)}
      // {...(shouldUseLineClamp ? { WebkitLineClamp: lineClamp } : {})}
    >
      {children}
    </Tag>
  );
}

Text.propTypes = {
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  align: PropTypes.oneOf(['start', 'end', 'center', 'justify', 'forceLeft', 'forceRight']),
  children: PropTypes.node,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  color: PropTypes.oneOf([
    'green',
    'pine',
    'olive',
    'blue',
    'navy',
    'midnight',
    'purple',
    'orchid',
    'eggplant',
    'maroon',
    'watermelon',
    'orange',
    'darkGray',
    'gray',
    'lightGray',
    'red',
    'white',
  ]),
  inline: PropTypes.bool,
  italic: PropTypes.bool,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  overflow: PropTypes.oneOf(['normal', 'breakWord', 'noWrap']),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  truncate: PropTypes.bool,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  weight: PropTypes.oneOf(['bold', 'normal']),
};
