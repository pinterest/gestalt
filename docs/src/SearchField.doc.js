// @flow strict

import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(<PageHeader name="SearchField" />);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityLabel',
        type: 'string',
        required: true,
        description:
          'String that clients such as VoiceOver will read to describe the element. Always localize the label.',
      },
      {
        name: 'autoComplete',
        type: `"on" | "off" | "username" | "name"`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
      },
      {
        name: 'onBlur',
        type: '({ event: SyntheticEvent<HTMLInputElement> }) => void',
      },
      {
        name: 'onChange',
        type: `({
        value: string,
        syntheticEvent: SyntheticEvent<HTMLInputElement>
      }) => void`,
        required: true,
      },
      {
        name: 'onFocus',
        type: `({
        value: string,
        syntheticEvent: SyntheticEvent<HTMLInputElement>
      }) => void`,
      },
      {
        name: 'onKeyDown',
        type: '({ event: SyntheticKeyboardEvent<HTMLInputElement>, value: string }) => void',
      },
      {
        name: 'placeholder',
        type: 'string',
      },
      {
        name: 'ref',
        type: "React.Ref<'input'>",
        description: 'Forward the ref to the underlying input element',
      },
      {
        name: 'size',
        type: '"md" | "lg"',
        required: false,
        description: 'md: 40px, lg: 48px',
        defaultValue: 'md',
      },
      {
        name: 'value',
        type: 'string',
      },
      {
        name: 'errorMessage',
        type: 'string',
      },
    ]}
  />,
);

card(
  <Example
    description={`
    We want to make sure every button on the page is unique when being read by screenreader.
    \`accessibilityExpanded\` allows us to specify that the associated content (i.e. Popover) is open.
    \`accessibilityHaspopup\` allows us to specify that the button has associated content (i.e. Popover).
    \`accessibilityLabel\` allows us to update the spoken text.

    Be sure to internationalize your \`accessibilityLabel\`.
  `}
    name="Example: Accessibility"
    defaultCode={`
  function SearchFieldExample() {
    const [value, setValue] = React.useState('');

    return (
      <Box color="white" rounding={2} padding={3} display="flex" alignItems="center">
        <Box padding={3}>
          <Icon
            icon="pinterest"
            color="red"
            size={20}
            accessibilityLabel="Pinterest"
          />
        </Box>
        <Box flex="grow" paddingX={2}>
          <SearchField
            accessibilityLabel="Demo Search Field"
            id="searchField"
            onChange={({value}) => setValue(value)}
            placeholder="Search and explore"
            value={value}
          />
        </Box>
        <Box paddingX={2}>
          <IconButton
            accessibilityLabel="Notifications"
            icon="speech-ellipsis"
            size="md"
          />
        </Box>
        <Box paddingX={2}>
          <IconButton accessibilityLabel="Profile" icon="person" size="md" />
        </Box>
      </Box>
    );
  }
`}
  />,
);

export default cards;
