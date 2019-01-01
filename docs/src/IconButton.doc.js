// @flow
import React from 'react';
import { IconButton } from 'gestalt';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="IconButton"
    description="The IconButton component allows you to define an action with a specific Icon."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityExpanded',
        type: 'boolean',
        description:
          'Use this property on elements that can expand to reveal additional information',
      },
      {
        name: 'accessibilityHaspopup',
        type: 'boolean',
        description:
          'Indicates that the element has a popup context menu or sub-level menu.',
      },
      {
        name: 'accessibilityLabel',
        type: 'string',
        required: true,
        description:
          'String that clients such as VoiceOver will read to describe the element. Always localize the label.',
      },
      {
        name: 'bgColor',
        type: '"transparent" | "gray" | "lightGray" | "white"',
        defaultValue: 'transparent',
      },
      {
        name: 'iconColor',
        type: `"blue" | "darkGray" | "gray" | "red" | "white"`,
        defaultValue: 'gray',
      },
      {
        name: 'icon',
        type: '$Keys<typeof icons>',
        required: true,
        description: `This allows us to type check for a valid icon name based on the keys from the list of icons in
        gestalt-icon/icons/index.js.`,
      },
      {
        name: 'size',
        type: `"xs" | "sm" | "md" | "lg" | "xl"`,
        description: `xs: 24px, sm: 32px, md: 40px, lg: 48px, xl: 56px`,
        defaultValue: 'md',
      },
      {
        name: 'onClick',
        type: '({ event: SyntheticMouseEvent<> }) => void',
      },
    ]}
  />
);

card(
  <Example
    name="Example"
    defaultCode={`
<IconButton
  accessibilityLabel="Love"
  bgColor="white"
  icon="heart"
  iconColor="red"
  onClick={() => { console.log('❤️')}}
/>
`}
  />
);

card(
  <Example
    description={`
    We want to make sure every button on the page is unique when being read by screenreader.
    \`accessibilityExpanded\` allows us to specify that the associated content (i.e. Flyout) is open
    \`accessibilityHaspopup\` allows us to specify that the button has associated content (i.e. Flyout)
    \`accessibilityLabel\` allows us to update the spoken text.

    Be sure to internationalize your \`accessibilityLabel\`.
  `}
    name="Example: Accessibility"
    defaultCode={`
  class A11yEx extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isOpen: false };
      this.anchorRef = React.createRef();
    }

    render() {
      return (
        <Box>
          <Box display="inlineBlock" ref={this.anchorRef}>
            <IconButton
              accessibilityLabel="see more"
              accessibilityHaspopup
              accessibilityExpanded={this.state.isOpen}
              icon="ellipsis"
              onClick={() => this.setState({ isOpen: !this.state.isOpen })}
            />
          </Box>
          {this.state.isOpen && (
            <Flyout anchor={this.anchorRef.current} onDismiss={() => undefined} idealDirection="right">
              <Box padding={2}>
                <Text>I am a popup.</Text>
              </Box>
            </Flyout>
          )}
        </Box>
      );
    }
  }
`}
  />
);

card(
  <Combination name="Size Combinations" size={['xs', 'sm', 'md', 'lg', 'xl']}>
    {props => <IconButton icon="heart" accessibilityLabel="" {...props} />}
  </Combination>
);

card(
  <Combination
    name="Icon Color Combinations"
    iconColor={['blue', 'darkGray', 'gray', 'red', 'white']}
  >
    {props => <IconButton icon="heart" accessibilityLabel="" {...props} />}
  </Combination>
);

card(
  <Combination
    name="Background Color Combinations"
    bgColor={['transparent', 'white', 'lightGray', 'gray']}
  >
    {props => <IconButton icon="heart" accessibilityLabel="" {...props} />}
  </Combination>
);

export default cards;
