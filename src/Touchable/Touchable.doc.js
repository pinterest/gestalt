// @flow
/* eslint-disable react/prop-types */
import React from 'react';
import Box from '../Box/Box';
import Image from '../Image/Image';
import Link from '../Link/Link';
import Mask from '../Mask/Mask';
import Text from '../Text/Text';
import Touchable from './Touchable';
import { ns, card, md, PropTable, Example } from '../../docs/src/cards';

ns(
  'Touchable',
  'Touchable allows for elements to be clickable / touched in an accessible way. We add cursor & focus styles, trigger the `onTouch` when hitting Space / Enter and correct aria roles.'
);

card(
  <PropTable
    props={[
      {
        name: 'children',
        type: 'any',
      },
      {
        name: 'fullHeight',
        type: 'boolean',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        defaultValue: true,
      },
      {
        name: 'mouseCursor',
        type: `"copy" | "grab" | "grabbing" | "move" | "noDrop" | "pointer" | "zoomIn" | "zoomOut"`,
        defaultValue: 'pointer',
      },
      {
        name: 'onMouseEnter',
        type: '({ event: SyntheticMouseEvent<> }) => void',
      },
      {
        name: 'onMouseLeave',
        type: '({ event: SyntheticMouseEvent<> }) => void',
      },
      {
        name: 'onTouch',
        type: '({ event: SyntheticMouseEvent<> }) => void',
        required: true,
      },
      {
        name: 'shape',
        type: `"square" | "rounded" | "pill" | "circle" | "roundedTop" | "roundedBottom" | "roundedLeft" | "roundedRight"`,
        defaultValue: 'square',
      },
    ]}
  />,
  { heading: false }
);

card(
  'Example',
  md`
    For a generic container to be clickable, use the Touchable component.

    If you have a \`Link\` or \`Button\` inside of Touchable, you can apply \`e.stopPropagation()\` so the \`onTouch\` doesn't get triggered.
  `,
  <Example
    defaultCode={`
class TouchableExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicks: 0 };
    this.handleTouch = this._handleTouch.bind(this);
    this.handleLinkClick = this._handleLinkClick.bind(this);
  }
  _handleTouch() {
    this.setState({
      clicks: this.state.clicks + 1,
    });
  };
  _handleLinkClick({ event }) {
    event.stopPropagation();
  };
  render() {
    return (
      <Box padding={2} width={150}>
      <Touchable
        mouseCursor="zoomIn"
        onTouch={this.handleTouch}
        shape="rounded"
      >
        <Mask shape="rounded">
          <Image
            alt="Antelope Canyon"
            naturalHeight={1}
            naturalWidth={1}
            src="https://68.media.tumblr.com/1121817a32bf070389aee567542f3dc7/tumblr_ocog9xxwdu1r9ublwo1_1280.jpg"
          />
        </Mask>
        <Box paddingY={2}>
          <Link
            href="https://en.wikipedia.org/wiki/Antelope_Canyon"
            onClick={this.handleLinkClick}
          >
            <Text align="center">Wiki Link</Text>
          </Link>
        </Box>
      </Touchable>
      <Box paddingY={2}>
        <Text color="gray" align="center">
          Clicked{' '}
          {this.state.clicks}{' '}
          {this.state.clicks === 1 ? 'time' : 'times'}
        </Text>
      </Box>
    </Box>
    );
  }
}
`}
    scope={{ Box, Image, Mask, Link, Text, Touchable }}
  />,
  { stacked: true }
);

card(
  'Full width and full height',
  md`
    \`fullWidth\` and \`fullHeight\` are flags on \`Touchable\` controlling how it is sized relative to the parent container.
    If one is set to \`true\`, the \`Touchable\` component will expand to the full size of its parent in that direction.
  `,
  <Example
    defaultCode={`
<Box color="white" display="flex" width={500} height={250}>
  <Box column={6} height="100%" color="lightGray">
    <Touchable fullHeight>
      <Text align="center">
        Full parent height
      </Text>
    </Touchable>
  </Box>
  <Box column={6} height="100%">
    <Touchable>
      <Text align="center">
        Child height only
      </Text>
    </Touchable>
  </Box>
</Box>
`}
    scope={{ Box, Text, Touchable }}
  />,
  { stacked: true }
);
