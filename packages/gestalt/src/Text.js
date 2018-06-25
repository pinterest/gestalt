// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import colors from './Colors.css';
import styles from './Text.css';
import typography from './Typography.css';

const SIZE_SCALE: { [size: ?string]: number } = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
};

type Props = {|
  align?: 'left' | 'right' | 'center' | 'justify',
  bold?: boolean,
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
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  smSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  mdSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  lgSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  leading?: 'tall' | 'short',
  truncate?: boolean,
  __dangerouslyIncreaseLineHeight?: boolean,
|};

export default function Text({
  align = 'left',
  bold = false,
  children,
  color = 'darkGray',
  inline = false,
  italic = false,
  overflow = 'breakWord',
  size = 'md',
  smSize,
  mdSize,
  lgSize,
  leading = 'short',
  truncate = false,
  __dangerouslyIncreaseLineHeight = false,
}: Props) {
  const scale = SIZE_SCALE[size];
  const smScale = SIZE_SCALE[smSize];
  const mdScale = SIZE_SCALE[mdSize];
  const lgScale = SIZE_SCALE[lgSize];

  const cs = cx(
    styles.Text,
    styles[`fontSize${scale}`],
    lgSize && styles[`lgFontSize${lgScale}`],
    mdSize && styles[`mdFontSize${mdScale}`],
    smSize && styles[`smFontSize${smScale}`],
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
    leading === 'short' && typography.leadingShort,
    (leading === 'tall' || __dangerouslyIncreaseLineHeight) &&
      typography.leadingTall,
    align === 'center' && typography.alignCenter,
    align === 'justify' && typography.alignJustify,
    align === 'left' && typography.alignLeft,
    align === 'right' && typography.alignRight,
    overflow === 'breakWord' && typography.breakWord,
    italic && typography.fontStyleItalic,
    !italic && typography.fontStyleNormal,
    bold && typography.fontWeightBold,
    !bold && typography.fontWeightNormal,
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
  __dangerouslyIncreaseLineHeight: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  bold: PropTypes.bool,
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
  leading: PropTypes.oneOf(['tall', 'short']),
  lgSize: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  mdSize: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  overflow: PropTypes.oneOf(['normal', 'breakWord']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  smSize: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  truncate: PropTypes.bool,
};
