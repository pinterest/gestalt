// @flow
/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Image, Link, Mask, Text, Touchable } from 'gestalt';
import PropTable from './components/PropTable';
import Example from './components/Example';
import PageHeader from './components/PageHeader';
import CardPage from './components/CardPage';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Touchable"
    description="Touchable allows for elements to be clickable / touched in an accessible way. We add cursor & focus styles, trigger the `onTouch` when hitting Space / Enter and correct aria roles."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'children',
        type: 'React.Node',
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
    heading={false}
  />
);

card(
  <Example
    description={`
    For a generic container to be clickable, use the Touchable component.

    If you have a \`Link\` or \`Button\` inside of Touchable, you can apply \`e.stopPropagation()\` so the \`onTouch\` doesn't get triggered.
  `}
    name="Example"
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
  />
);

card(
  <Example
    description={`
    \`fullWidth\` and \`fullHeight\` are flags on \`Touchable\` controlling how it is sized relative to the parent container.
    If one is set to \`true\`, the \`Touchable\` component will expand to the full size of its parent in that direction.
  `}
    name="Full width and full height"
    defaultCode={`
<Box color="white" display="flex" width={500} height={250}>
<Box column={6}>
  <Touchable fullHeight>
    <Box height="100%" color="lightGray">
      <Text align="center">
        Full parent height
      </Text>
    </Box>
  </Touchable>
</Box>
<Box column={6}>
  <Touchable>
    <Box height="100%" color="lightGray">
      <Text align="center">
        Child height only
      </Text>
    </Box>
  </Touchable>
</Box>
</Box>
`}
    scope={{ Box, Text, Touchable }}
  />
);

export default () => <CardPage cards={cards} />;
