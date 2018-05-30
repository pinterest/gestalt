// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from '../Box/Box';
import styles from './Card.css';

type Props = {|
  active?: ?boolean,
  children?: React.Node,
  image?: React.Node,
  onMouseEnter?: ({ event: SyntheticMouseEvent<HTMLDivElement> }) => void,
  onMouseLeave?: ({ event: SyntheticMouseEvent<HTMLDivElement> }) => void,
|};

type State = {|
  hovered: boolean,
|};

export default class Card extends React.Component<Props, State> {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    image: PropTypes.node,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  };

  state: State = {
    hovered: false,
  };

  handleMouseEnter = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const { onMouseEnter } = this.props;
    this.setState(
      { hovered: true },
      onMouseEnter && (() => onMouseEnter({ event }))
    );
  };

  handleMouseLeave = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const { onMouseLeave } = this.props;
    this.setState(
      { hovered: false },
      onMouseLeave && (() => onMouseLeave({ event }))
    );
  };

  render() {
    const { active, children, image } = this.props;
    const { hovered } = this.state;

    const classes = classnames(styles.card, {
      // If, like @chrislloyd, you can't remember Javascript equality rules,
      // == null checks for `null` or `undefined` and leaves out `false`.
      [styles.hover]: active || (active == null && hovered),
    });

    return (
      <Box
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        position="relative"
      >
        {image && <Box marginBottom={1}>{image}</Box>}
        <Box>{children}</Box>
        <div className={classes} />
      </Box>
    );
  }
}
