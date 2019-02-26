// @flow
import React from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';
import stock14 from './images/stock14.jpg';

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
        href: 'fullHeightWidthExample',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        defaultValue: true,
        href: 'fullHeightWidthExample',
      },
      {
        name: 'mouseCursor',
        type: `"copy" | "grab" | "grabbing" | "move" | "noDrop" | "pointer" | "zoomIn" | "zoomOut"`,
        defaultValue: 'pointer',
        href: 'basicExample',
      },
      {
        name: 'onMouseEnter',
        type: '({ event: SyntheticMouseEvent<HTMLDivElement> }) => void',
      },
      {
        name: 'onMouseLeave',
        type: '({ event: SyntheticMouseEvent<HTMLDivElement> }) => void',
      },
      {
        name: 'onTouch',
        type:
          '({ event: SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement> }) => void',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'shape',
        type: `"square" | "rounded" | "pill" | "circle" | "roundedTop" | "roundedBottom" | "roundedLeft" | "roundedRight"`,
        defaultValue: 'square',
        href: 'basicExample',
      },
    ]}
  />
);

card(
  <Example
    id="basicExample"
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
              src="${stock14}"
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
  />
);

card(
  <Example
    id="fullHeightWidthExample"
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
  />
);

export default cards;
