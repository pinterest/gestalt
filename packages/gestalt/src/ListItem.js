// @flow

import * as React from 'react';
import Box from './Box.js';
import Text from './Text.js';
import Touchable from './Touchable.js';

type Props = {|
  children: React.Node,
  onClick: ({
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>,
  }) => void,
|};

type State = {|
  hovered: boolean,
|};

export default class ListItem extends React.PureComponent<Props, State> {
  state = {
    hovered: false,
  };

  handleMouseEnter = () => {
    this.setState({ hovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ hovered: false });
  };

  render() {
    const { children, onClick } = this.props;
    const { hovered } = this.state;
    return (
      <Box role="listitem" padding={1} color={hovered ? 'lightGray' : 'white'}>
        <Touchable
          onTouch={onClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <Box column={12} paddingX={3} paddingY={1}>
            <Text bold>{children}</Text>
          </Box>
        </Touchable>
      </Box>
    );
  }
}
