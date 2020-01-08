// @flow

import * as React from 'react';
import Controller from './Controller.js';
import Text from './Text.js';
import Box from './Box.js';
import Link from './Link.js';
import Icon from './Icon.js';
import icons from './icons/index.js';
import Touchable from './Touchable.js';

const noop = () => {};

type Props = {|
  accessibilityLabel: string,
  icon?: $Keys<typeof icons>,
  inline?: boolean,
  href?: string,
  hrefText?: string,
  tooltipText: string,
|};

type State = {|
  hoveredIcon: boolean,
  hoveredText: boolean,
  open: boolean,
|};

export default class IconWithTooltip extends React.Component<Props, State> {
  state = {
    hoveredIcon: false,
    hoveredText: false,
    open: false,
  };

  childRef: {| current: null | React.ElementRef<'div'> |} = React.createRef();

  handleIconMouseEnter = () => {
    this.setState({
      hoveredIcon: true,
      open: true,
    });
  };

  handleIconMouseLeave = () => {
    setTimeout(() => {
      this.setState(state => {
        return {
          ...(!state.hoveredText ? { open: false } : {}),
          hoveredIcon: false,
        };
      });
    }, 75);
  };

  handleTextMouseEnter = () => {
    this.setState({
      hoveredText: true,
    });
  };

  handleTextMouseLeave = () => {
    setTimeout(() => {
      this.setState(state => {
        return {
          ...(!state.hoveredIcon ? { open: false } : {}),
          hoveredText: false,
        };
      });
    }, 75);
  };

  render() {
    const {
      accessibilityLabel,
      icon,
      inline,
      tooltipText,
      href,
      hrefText,
    } = this.props;
    const { open } = this.state;
    const { current: anchor } = this.childRef;

    return (
      <Box
        display={inline ? 'inlineBlock' : 'block'}
        ref={this.childRef}
        onMouseEnter={this.handleIconMouseEnter}
        onMouseLeave={this.handleIconMouseLeave}
        onFocus={this.handleIconMouseEnter}
        onBlur={this.handleIconMouseLeave}
      >
        <Touchable onTouch={this.handleIconMouseEnter} shape="rounded">
          <Icon
            color={open ? 'darkGray' : 'gray'}
            icon={icon}
            accessibilityLabel={accessibilityLabel}
          />
        </Touchable>

        {open && !!anchor && (
          <Controller
            anchor={anchor}
            bgColor="darkGray"
            caret={false}
            idealDirection="down"
            onDismiss={noop}
            positionRelativeToAnchor
            size={null}
          >
            <Box
              maxWidth={180}
              paddingY={1}
              paddingX={2}
              role="tooltip"
              onMouseEnter={this.handleTextMouseEnter}
              onMouseLeave={this.handleTextMouseLeave}
              onFocus={this.handleTextMouseEnter}
              onBlur={this.handleTextMouseLeave}
            >
              <Text color="white" size="xs">
                {tooltipText}
              </Text>
              {href && hrefText && (
                <Box paddingY={1} role="link">
                  <Link href={href}>
                    <Text color="white" size="xs" weight="bold">
                      {hrefText}
                    </Text>
                  </Link>
                </Box>
              )}
            </Box>
          </Controller>
        )}
      </Box>
    );
  }
}
