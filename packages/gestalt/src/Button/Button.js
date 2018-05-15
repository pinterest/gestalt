// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Button.css';
import Text from '../Text/Text';

type Props = {|
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  accessibilityLabel?: string,
  color?: 'gray' | 'red' | 'blue' | 'transparent' | 'white',
  disabled?: boolean,
  inline?: boolean,
  name?: string,
  onClick?: ({ event: SyntheticMouseEvent<> }) => void,
  size?: 'sm' | 'md' | 'lg',
  text: string,
  type?: 'submit' | 'button',
|};

export default function Button(props: Props) {
  const {
    accessibilityExpanded,
    accessibilityHaspopup,
    accessibilityLabel,
    color = 'gray',
    disabled = false,
    inline = false,
    name,
    onClick,
    size = 'md',
    text,
    type = 'button',
  } = props;

  const textColor = {
    blue: 'white',
    gray: 'darkGray',
    red: 'white',
    transparent: 'white',
    white: 'darkGray',
  };

  const classes = classnames(styles.button, {
    [styles.sm]: size === 'sm',
    [styles.md]: size === 'md',
    [styles.lg]: size === 'lg',
    [styles.solid]: color !== 'transparent',
    [styles[color]]: !disabled,
    [styles.disabled]: disabled,
    [styles.enabled]: !disabled,
    [styles.inline]: inline,
    [styles.block]: !inline,
  });

  return (
    <button
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={classes}
      disabled={disabled}
      name={name}
      onClick={event => onClick && onClick({ event })}
      type={type}
    >
      <Text
        align="center"
        bold
        color={disabled ? 'gray' : textColor[color]}
        overflow="normal"
        size={size}
      >
        {text}
      </Text>
    </button>
  );
}

Button.propTypes = {
  accessibilityExpanded: PropTypes.bool,
  accessibilityHaspopup: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  color: PropTypes.oneOf(['blue', 'gray', 'red', 'transparent', 'white']),
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
};
