// @flow
import * as React from 'react';
import Box from '../Box/Box';
import Button from './Button';
import {
  ns,
  card,
  md,
  PropTable,
  Example,
  Combination,
} from '../../docs/src/cards';
import Text from '../Text/Text';

ns(
  'Button',
  `
A form component that should be used to make something happen on the same page (i.e. open a modal).
You are able to specify the color, type, and width of buttons to change their apperance.`
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
        description:
          'String that clients such as VoiceOver will read to describe the element. Always localize the label.',
      },
      {
        name: 'color',
        type: `"blue" | "gray" | "red" | "transparent" | "white"`,
        defaultValue: 'gray',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'inline',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'onClick',
        type: '({ event: SyntheticMouseEvent<> }) => void',
      },
      {
        name: 'size',
        type: `"sm" | "md" | "lg"`,
        defaultValue: 'md',
        description: 'sm: 36px, md: 40px, lg: 48px',
      },
      {
        name: 'text',
        type: 'string',
        required: true,
      },
      {
        name: 'type',
        type: `"submit" | "button"`,
        defaultValue: 'button',
      },
    ]}
  />,
  { heading: false }
);

card(
  'Example',
  <Example
    defaultCode={`
<Button text="Medium Sized Button" />
`}
    scope={{ Box, Button, Text }}
  />,
  { stacked: true }
);

card(
  'Widths',
  md`
    There are two different width options for buttons. The inline buttons are
    are sized by the text within the button, whereas the default block buttons
    expand to the full width of their container. The default \`inline\` is false.
  `,
  <Example
    defaultCode={`
<Box margin={-2}>
  <Box padding={2}>
    <Button text="inline button" inline />
  </Box>
  <Box padding={2}>
    <Button text="default full width button" />
  </Box>
</Box>
`}
    scope={{ Box, Button, Text }}
  />,
  { stacked: true }
);

card(
  'Colors: Dark Backgrounds',
  md`
    \`transparent\` and \`white\` are our secondary colors for \`Button\`. We should only show them on a dark gray background.
  `,
  <Example
    defaultCode={`
<Box color="darkGray" maxWidth={320} shape="rounded" padding={4}>
  <Box marginBottom={4}>
    <Text color="white">
      Explore today’s trending ideas, curated finds, and personalized
      picks.
    </Text>
  </Box>
  <Box
    display="flex"
    direction="row"
    marginLeft={-2}
    marginRight={-2}
  >
    <Box display="flex" direction="row" column={6} paddingX={2}>
      <Button color="transparent" text="Later" />
    </Box>
    <Box column={6} paddingX={2}>
      <Button color="white" text="Learn more" />
    </Box>
  </Box>
</Box>
`}
    scope={{ Box, Button, Text }}
  />,
  { stacked: true }
);

card(
  'Types',
  md`
    There are 2 types of buttons: button and submit. Use the \`submit\` type when you do not
    need to specify an \`onClick\` handler. The default type is \`button\`.
  `,

  <Example
    defaultCode={`
<Box margin={-2}>
  <Box padding={2}>
    <Button onClick={() => {}} text="Clear" type="button" />
  </Box>
  <Box padding={2}>
    <Button color="red" text="Submit" type="submit" />
  </Box>
</Box>
`}
    scope={{ Box, Button, Text }}
  />,
  { stacked: true }
);

card(
  'Accessibility Label',
  md`
    We want to make sure every button on the page is unique when being read by screenreader.
    \`accessibilityLabel\` allows us to update the spoken text.

    Be sure to internationalize your \`accessibilityLabel\`!
  `,
  <Example
    defaultCode={`
<Box margin={-2}>
  <Box padding={2}>
    <Button accessibilityLabel="Add James" text="Add" />
  </Box>
  <Box padding={2}>
    <Button accessibilityLabel="Add Irene" text="Add" />
  </Box>
</Box>
`}
    scope={{ Box, Button, Text }}
  />,
  { stacked: true }
);

card(
  'Combinations',
  <Combination
    color={['gray', 'red', 'blue']}
    disabled={[false, true]}
    size={['sm', 'md', 'lg']}
  >
    {(props, i) => (
      <Button
        id={`example-${i}`}
        onChange={() => {}}
        {...props}
        text="Button"
      />
    )}
  </Combination>
);
