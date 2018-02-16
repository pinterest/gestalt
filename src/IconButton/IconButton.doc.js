// @flow
import React, { Component } from 'react';
import { ns, card, md, PropTable } from '../../.corkboard/cards';
import Box from '../Box/Box';
import Heading from '../Heading/Heading';
import IconButton from './IconButton';
import Flyout from '../Flyout/Flyout';
import Text from '../Text/Text';

ns(
  'IconButton',
  'The IconButton component allows you to define an action with a specific Icon.'
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
        type: '"transparent" | "lightGray" | "white"',
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
  />,
  { heading: false }
);

const icons = ['add', 'cancel', 'heart', 'ellipsis', 'pinterest', 'person'];

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
const colors = ['transparent', 'white', 'lightGray'];

function IconButtonEx(props: *) {
  const { icon, size, color } = props;
  return (
    <IconButton
      accessibilityLabel={icon.replace(/-/g, ' ')}
      bgColor={color}
      icon={icon}
      size={size}
    />
  );
}

card(
  'Sizes',
  md`
    There are 5 \`size\` options. The default \`size\` is \`md\`.

    ~~~html
    <IconButton
      accessibilityLabel="cancel"
      bgColor="lightGray"
      icon="heart"
      size="sm"
    />
    ~~~

    ~~~html
    xs: 24px
    sm: 32px
    md: 40px
    lg: 48px
    xl: 56px
    ~~~
  `,
  <Box display="flex" direction="row" marginLeft={-2} marginRight={-2} wrap>
    {sizes.map((size, key) => (
      <Box display="flex" alignItems="center" paddingX={3} key={key}>
        <Heading size="xs">{size}</Heading>
        <Box display="flex" direction="row" justifyContent="center">
          <IconButtonEx icon="heart" size={size} color="lightGray" />
        </Box>
      </Box>
    ))}
  </Box>
);

card(
  'Color Combinations',
  md`
    Here are examples of the default icon color combinations for an \`IconButton\`.
    The default \`bgColor\` is \`transparent\` and \`iconColor\` is \`gray\`.

    ~~~html
    <IconButton
      accessibilityLabel="add"
      icon="add"
    />
    ~~~

    ~~~html
    <IconButton
      accessibilityLabel="cancel"
      bgColor="lightGray"
      icon="cancel"
    />
    ~~~
  `,
  <Box marginLeft={-2} marginRight={-2} wrap display="flex" direction="row">
    {icons.map((icon, i) => (
      <Box key={i} marginBottom={1} paddingX={2} display="flex" column={12}>
        {colors.map((color, idx) => (
          <Box
            padding={1}
            key={idx}
            color={color === 'white' ? 'lightGray' : 'white'}
          >
            <IconButtonEx color={color} icon={icon} size="md" />
          </Box>
        ))}
      </Box>
    ))}
  </Box>
);

card(
  'Other Color Options',
  md`
    If your design calls for modifications from the default color combinations shown above,
    you can explicitly set the \`iconColor\`. This may be used in order to highlight it or
    depict the \`IconButton\` as selected.

    ~~~html
    <IconButton
      accessibilityLabel="Like pin"
      iconColor="red"
      icon="heart"
    />
    ~~~

    ~~~html
    <IconButton
      accessibilityLabel="Add pin"
      bgColor="lightGray"
      iconColor="red"
      icon="add"
    />
    ~~~

    ~~~html
    <IconButton
      accessibilityLabel="Save buyable pin"
      iconColor="blue"
      icon="pin"
    />
    ~~~
  `,
  <Box wrap display="flex">
    <Box paddingX={2}>
      <IconButton accessibilityLabel="Like pin" iconColor="red" icon="heart" />
    </Box>
    <Box paddingX={2}>
      <IconButton
        accessibilityLabel="Add pin"
        bgColor="lightGray"
        iconColor="red"
        icon="add"
      />
    </Box>
    <Box paddingX={2}>
      <IconButton
        accessibilityLabel="Save buyable pin"
        iconColor="blue"
        icon="pin"
      />
    </Box>
  </Box>
);

type State = {|
  isOpen: boolean,
|};

class A11yEx extends Component<{}, State> {
  state: State = {
    isOpen: false,
  };

  anchor: ?HTMLElement;

  render() {
    return (
      <Box>
        <div
          style={{ display: 'inline-block' }}
          ref={c => {
            this.anchor = c;
          }}
        >
          <IconButton
            accessibilityLabel="see more"
            accessibilityHaspopup
            accessibilityExpanded={this.state.isOpen}
            icon="ellipsis"
            onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          />
        </div>
        {this.state.isOpen && (
          <Flyout anchor={this.anchor} onDismiss={() => undefined}>
            <Box padding={2}>
              <Text>I am a popup.</Text>
            </Box>
          </Flyout>
        )}
      </Box>
    );
  }
}

card(
  'Accessibility Props',
  md`
    We want to make sure every button on the page is unique when being read by screenreader.
    \`accessibilityExpanded\` allows us to specify that the associated content (i.e. Flyout) is open
    \`accessibilityHaspopup\` allows us to specify that the button has associated content (i.e. Flyout)
    \`accessibilityLabel\` allows us to update the spoken text.

    Be sure to internationalize your \`accessibilityLabel\`!

    ~~~html
    <div ref={c => { this.anchor = c; }}>
      <IconButton
        accessibilityLabel="see more options"
        accessibilityHaspopup
        accessibilityExpanded={this.state.isOpen}
        anchor={this.anchor}
        icon="ellipsis"
        onClick={() => this.setState({ isOpen: !this.state.isOpen })}
      />
    </div>
    {this.state.isOpen && (
      <Flyout
        anchor={this.anchor}
        accessibilityCloseLabel="close"
        onDismiss={() => undefined}
      >
        <Box padding={2}>
          <Text>I am a popup.</Text>
        </Box>
      </Flyout>
    )}
    ~~~
  `,
  <Box>
    <A11yEx />
  </Box>
);
