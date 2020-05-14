// @flow strict

import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import colors from './Colors.css';
import styles from './Text.css';
import typography from './Typography.css';

const SIZE_SCALE: { [size: ?string]: number } = {
  sm: 1,
  md: 2,
  lg: 3,
};

type Props = {|
  align?: 'left' | 'right' | 'center' | 'justify',
  children?: React.Node,
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
  overflow?: 'normal' | 'breakWord',
  size?: 'sm' | 'md' | 'lg',
  truncate?: boolean,
  weight?: 'bold' | 'normal',
|};

export default function Text({
  align = 'left',
  children,
  color = 'darkGray',
  inline = false,
  italic = false,
  overflow = 'breakWord',
  size = 'lg',
  truncate = false,
  weight = 'normal',
}: Props) {
  const scale = SIZE_SCALE[size];

  const cs = cx(
    styles.Text,
    styles[`fontSize${scale}`],
    color === 'blue' && colors.blue,
    color === 'darkGray' && colors.darkGray,
    color === 'eggplant' && colors.eggplant,
    color === 'gray' && colors.gray,
    color === 'green' && colors.green,
    color === 'lightGray' && colors.lightGray,
    color === 'maroon' && colors.maroon,
    color === 'midnight' && colors.midnight,
    color === 'navy' && colors.navy,
    color === 'olive' && colors.olive,
    color === 'orange' && colors.orange,
    color === 'orchid' && colors.orchid,
    color === 'pine' && colors.pine,
    color === 'purple' && colors.purple,
    color === 'red' && colors.red,
    color === 'watermelon' && colors.watermelon,
    color === 'white' && colors.white,
    align === 'center' && typography.alignCenter,
    align === 'justify' && typography.alignJustify,
    align === 'left' && typography.alignLeft,
    align === 'right' && typography.alignRight,
    overflow === 'breakWord' && typography.breakWord,
    italic && typography.fontStyleItalic,
    weight === 'bold' && typography.fontWeightBold,
    weight === 'normal' && typography.fontWeightNormal,
    truncate && typography.truncate
  );
  const Tag = inline ? 'span' : 'div';

  return (
    <Tag
      className={cs}
      {...(truncate && typeof children === 'string'
        ? { title: children }
        : null)}
    >
      {children}
    </Tag>
  );
}

Text.propTypes = {
  align: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  children: PropTypes.node,
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
  overflow: PropTypes.oneOf(['normal', 'breakWord']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  truncate: PropTypes.bool,
  weight: PropTypes.oneOf(['bold', 'normal']),
};
