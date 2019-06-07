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
        href: 'accessibility',
      },
      {
        name: 'accessibilityHaspopup',
        type: 'boolean',
        description:
          'Indicates that the element has a popup context menu or sub-level menu.',
        href: 'accessibility',
      },
      {
        name: 'accessibilityLabel',
        type: 'string',
        required: true,
        description:
          'String that clients such as VoiceOver will read to describe the element. Always localize the label.',
        href: 'accessibility',
      },
      {
        name: 'bgColor',
        type:
          '"transparent" | "transparentDarkGray" | "gray" | "lightGray" | "white"',
        defaultValue: 'transparent',
        href: 'backgroundColorCombinations',
      },
      {
        name: 'disabled',
        type: 'boolean',
        href: 'disabledCombinations',
      },
      {
        name: 'iconColor',
        type: `"blue" | "darkGray" | "gray" | "red" | "white"`,
        defaultValue: 'gray',
        href: 'iconColorCombinations',
      },
      {
        name: 'icon',
        type: '$Keys<typeof icons>',
        description: `This allows type checking for a valid icon name based on the keys from the list of icons in
        Icon.`,
      },
      {
        name: 'dangerouslySetSvgPath',
        type: `{ __path: string }`,
        description: `When using this prop, make sure that the viewbox around the SVG path is 24x24`,
      },
      {
        name: 'size',
        type: `"xs" | "sm" | "md" | "lg" | "xl"`,
        description: `xs: 24px, sm: 32px, md: 40px, lg: 48px, xl: 56px`,
        defaultValue: 'md',
        href: 'sizeCombinations',
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
    id="accessibility"
    description={`
      We want to make sure every button on the page is unique when being read by screenreader.
      \`accessibilityExpanded\` allows us to specify that the associated content (i.e. Flyout) is open.
      \`accessibilityHaspopup\` allows us to specify that the button has associated content (i.e. Flyout).
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
  <Combination
    id="sizeCombinations"
    name="Size Combinations"
    size={['xs', 'sm', 'md', 'lg', 'xl']}
  >
    {props => <IconButton icon="heart" accessibilityLabel="" {...props} />}
  </Combination>
);

card(
  <Combination
    id="iconColorCombinations"
    name="Icon Color Combinations"
    iconColor={['blue', 'darkGray', 'gray', 'red', 'white']}
  >
    {props => <IconButton icon="heart" accessibilityLabel="" {...props} />}
  </Combination>
);

card(
  <Combination
    id="backgroundColorCombinations"
    name="Background Color Combinations"
    bgColor={[
      'transparent',
      'transparentDarkGray',
      'white',
      'lightGray',
      'gray',
    ]}
  >
    {props => <IconButton icon="heart" accessibilityLabel="" {...props} />}
  </Combination>
);

card(
  <Combination
    id="disabledCombinations"
    name="Disabled Combinations"
    description="Icon buttons can be disabled as well. Adding the disabled flag to any color combination will add a 50% opacity and remove interactivity"
    iconColor={['blue', 'darkGray', 'gray', 'red', 'white']}
  >
    {props => (
      <IconButton icon="heart" accessibilityLabel="" disabled {...props} />
    )}
  </Combination>
);

export default cards;
