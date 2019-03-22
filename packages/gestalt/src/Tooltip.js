// @flow

import * as React from 'react';
import Controller from './Controller.js';
import Text from './Text.js';
import Box from './Box.js';

const noop = () => {};

type Props = {|
  children: React.Node,
  text: string,
|};

type State = {|
  focused: boolean,
  hovered: boolean,
|};

export default class Tooltip extends React.Component<Props, State> {
  state = {
    focused: false,
    hovered: false,
  };

  childRef = React.createRef();

  handleBlur = () => this.setState({ focused: false });

  handleFocus = () => this.setState({ focused: true });

  handleMouseEnter = () => this.setState({ hovered: true });

  handleMouseLeave = () => this.setState({ hovered: false });

  render() {
    const { children, text } = this.props;
    const { focused, hovered } = this.state;
    const { current: anchor } = this.childRef;

    return (
      <Box display="inlineBlock">
        <Box
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          ref={this.childRef}
        >
          {children}
        </Box>
        {(hovered || focused) &&
          !!anchor && (
            <Controller
              anchor={anchor}
              bgColor="darkGray"
              caret={false}
              idealDirection="down"
              onDismiss={noop}
              positionRelativeToAnchor
              size={null}
            >
              <Box maxWidth={180} paddingY={1} paddingX={2} role="tooltip">
                <Text color="white" size="xs">
                  {text}
                </Text>
              </Box>
            </Controller>
          )}
      </Box>
    );
  }
}
