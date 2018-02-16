// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box/Box';
import classnames from 'classnames';
import styles from './Card.css';

type Props = {|
  children?: any,
  active?: ?boolean,
  onMouseEnter?: ({ event: SyntheticMouseEvent<> }) => void,
  onMouseLeave?: ({ event: SyntheticMouseEvent<> }) => void,
|};

type State = {|
  hovered: boolean,
|};

export default class Card extends React.Component<Props, State> {
  static propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  };

  state: State = {
    hovered: false,
  };

  handleMouseEnter = (event: SyntheticMouseEvent<>) => {
    const { onMouseEnter } = this.props;
    this.setState(
      { hovered: true },
      onMouseEnter && (() => onMouseEnter({ event }))
    );
  };

  handleMouseLeave = (event: SyntheticMouseEvent<>) => {
    const { onMouseLeave } = this.props;
    this.setState(
      { hovered: false },
      onMouseLeave && (() => onMouseLeave({ event }))
    );
  };

  render() {
    const { children, active } = this.props;
    const { hovered } = this.state;

    const classes = classnames(styles.card, {
      // If you're not a Javascript godess, == null checks for `null` or
      // `undefined` and leaves out `false`.
      [styles.hover]: active || (active == null && hovered),
    });

    return (
      <Box
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        position="relative"
      >
        {children}
        <div className={classes} />
      </Box>
    );
  }
}
