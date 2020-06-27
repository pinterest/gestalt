// @flow strict
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
        name: 'accessibilityControls',
        type: 'string',
        description:
          'Identifies the element whose contents or presence are controlled by the current element. Populates aria-controls.',
        href: 'accessibility-disclosure',
      },
      {
        name: 'accessibilityExpanded',
        type: 'boolean',
        description:
          'Use this property on elements that can expand to reveal additional information. Populates aria-expanded.',
        href: 'accessibility-disclosure',
      },
      {
        name: 'accessibilityHaspopup',
        type: 'boolean',
        description:
          'Indicates that the element has a popup context menu or sub-level menu. Populates aria-haspopup.',
        href: 'accessibility-popup',
      },
      {
        name: 'accessibilityLabel',
        type: 'string',
        description:
          'String that clients such as VoiceOver will read to describe the element. Populates aria-label.',
        href: 'accessibility-popup',
      },
      {
        name: 'bgColor',
        type:
          '"transparent" | "transparentDarkGray" | "darkGray" | "gray" | "lightGray" | "white" | "red"',
        defaultValue: 'transparent',
        required: true,
        href: 'backgroundColorCombinations',
      },
      {
        name: 'dangerouslySetSvgPath',
        type: `{ __path: string }`,
        description: `When using this prop, make sure that the viewbox around the SVG path is 24x24`,
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
        href: 'disabledCombinations',
      },
      {
        name: 'iconColor',
        type: `"darkGray" | "gray" | "red" | "white"`,
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
        name: 'onClick',
        type: '({ event: SyntheticMouseEvent<> }) => void',
      },
      {
        name: 'padding',
        type: `1 | 2 | 3 | 4 | 5`,
        description: `Padding in boints. If omitted, padding is derived from the \`size\` prop.`,
        href: 'paddingCombinations',
      },
      {
        name: 'selected',
        type: 'boolean',
        defaultValue: false,
        href: 'selectedCombinations',
      },
      {
        name: 'size',
        type: `"xs" | "sm" | "md" | "lg" | "xl"`,
        description: `xs: 24px, sm: 32px, md: 40px, lg: 48px, xl: 56px`,
        defaultValue: 'md',
        href: 'sizeCombinations',
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
    id="accessibility-popup"
    description={`
      We want to make sure every button on the page is unique when being read by screenreader.
      - \`accessibilityHaspopup\` specifies that the button has associated content (i.e. Flyout).
      - \`accessibilityLabel\` updates the spoken text.
  `}
    name="Example: Accessibility (Popup)"
    defaultCode={`
function A11yExPopup() {
  const [isOpen, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  return (
    <Box>
      <Box display="inlineBlock" ref={anchorRef}>
        <IconButton
          accessibilityLabel="see more"
          accessibilityHaspopup
          icon="ellipsis"
          iconColor="darkGray"
          onClick={() => setOpen(!isOpen)}
        />
      </Box>
      {isOpen && (
        <Flyout
          anchor={anchorRef && anchorRef.current}
          idealDirection="right"
          onDismiss={() => undefined}
        >
          <Box padding={2}>
            <Text>I am a popup.</Text>
          </Box>
        </Flyout>
      )}
    </Box>
  );
}
`}
  />
);

card(
  <Example
    id="accessibility-disclosure"
    description={`
      We want to make sure every button on the page is unique when being read by screenreader.
      - \`accessibilityControls\` specifies the \`id\` of an associated content element (i.e. Accordion panel) which is controlled by this icon button.
      - \`accessibilityExpanded\` specifies that the associated content (i.e. Accordion panel) is open.
      - \`accessibilityLabel\` updates the spoken text.

      Be sure to internationalize your \`accessibilityLabel\`.
  `}
    name="Example: Accessibility (Disclosure)"
    defaultCode={`
function A11yExDisclosure() {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <Box>
      <Box display="inlineBlock">
        <IconButton
          accessibilityControls="accordion-panel"
          accessibilityExpanded={isOpen}
          accessibilityLabel={isOpen ? 'See less': 'See more'}
          icon={isOpen ? 'arrow-up' : 'arrow-down'}
          iconColor="darkGray"
          onClick={() => setOpen(!isOpen)}
        />
      </Box>
      {isOpen && (
        <Box
          aria-label={isOpen ? 'See less': 'See more'}
          id="accordion-panel"
          padding={2}
          role="region"
        >
          <Text>I am an accordion panel.</Text>
        </Box>
      )}
    </Box>
  );
}
`}
  />
);

card(
  <Combination
    id="sizeCombinations"
    name="Combinations: Size with default padding"
    size={['xs', 'sm', 'md', 'lg', 'xl']}
  >
    {props => <IconButton icon="heart" accessibilityLabel="" {...props} />}
  </Combination>
);

card(
  <Combination
    id="paddingCombinations"
    name="Combinations: Size with custom padding"
    size={['xs', 'sm', 'md', 'lg', 'xl']}
    padding={[1, 2, 3, 4, 5]}
  >
    {props => <IconButton icon="heart" accessibilityLabel="" {...props} />}
  </Combination>
);

card(
  <Combination
    id="iconColorCombinations"
    name="Combinations: Icon Color"
    iconColor={['darkGray', 'gray', 'red', 'white']}
  >
    {props => <IconButton icon="heart" accessibilityLabel="" {...props} />}
  </Combination>
);

card(
  <Combination
    id="backgroundColorCombinations"
    name="Combinations: Background Color"
    bgColor={[
      'transparent',
      'transparentDarkGray',
      'darkGray',
      'gray',
      'lightGray',
      'white',
    ]}
  >
    {props => <IconButton icon="heart" accessibilityLabel="" {...props} />}
  </Combination>
);

card(
  <Combination
    id="selectedCombinations"
    name="Combinations: Selected"
    color={['gray']}
    selected={[false, true]}
  >
    {props => <IconButton icon="heart" accessibilityLabel="" {...props} />}
  </Combination>
);

card(
  <Combination
    id="disabledCombinations"
    name="Combinations: Disabled"
    description="Icon buttons can be disabled as well. Adding the disabled flag to any color combination will add a 50% opacity and remove interactivity"
    iconColor={['darkGray', 'gray', 'red', 'white']}
  >
    {props => (
      <IconButton icon="heart" accessibilityLabel="" disabled {...props} />
    )}
  </Combination>
);

export default cards;
