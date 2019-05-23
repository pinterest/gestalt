// @flow

import * as React from 'react';
import Controller from './Controller.js';
import Text from './Text.js';
import Box from './Box.js';

const noop = () => {};

type Props = {|
  children: React.Node,
  inline?: boolean,
  text: string,
|};

type State = {|
  hovered: boolean,
|};

export default class Tooltip extends React.Component<Props, State> {
  state = {
    hovered: false,
  };

  childRef: {| current: null | React.ElementRef<'div'> |} = React.createRef();

  handleMouseEnter = () => this.setState({ hovered: true });

  handleMouseLeave = () => this.setState({ hovered: false });

  render() {
    const { children, inline, text } = this.props;
    const { hovered } = this.state;
    const { current: anchor } = this.childRef;

    return (
      <Box display={inline ? 'inlineBlock' : 'block'}>
        <Box
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          ref={this.childRef}
        >
          {children}
        </Box>
        {hovered &&
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
