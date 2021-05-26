// @flow strict

import type { Node } from 'react';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="SearchField"
    defaultCode={`
function SearchFieldExample() {
  const [value, setValue] = React.useState('');

  return (
    <Box padding={3} display="flex" alignItems="center" flex="grow">
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
          accessibilityLabel="Search all of Pinterest"
          accessibilityClearButtonLabel="Clear search field"
          id="searchField1"
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

card(
  <PropTable
    props={[
      {
        name: 'accessibilityLabel',
        type: 'string',
        required: true,
        description:
          'String that clients such as VoiceOver will read to describe the element. Always localize the label. See the [Accessibility section](#Accessibility) for more info.',
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
        name: 'label',
        type: 'string',
        description:
          'Text used to label this search field. Should be localized. See the [Visible label variant](#Visible-label) for more info.',
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
        description: 'Callback for key stroke events.',
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
  <MainSection name="Accessibility">
    <MainSection.Subsection
      title="Labels"
      description={`
      SearchField should ideally have a visible label above the input using the \`label\` prop. However, if need be, \`accessibilityLabel\` can be used to provide screen readers with context about this SearchField.

      Be sure to also specify (and localize) a string for the \`accessibilityClearButtonLabel\`.
      `}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
  function SearchFieldExample() {
    const [value, setValue] = React.useState('');

    return (
      <Box padding={3} display="flex" alignItems="center" flex="grow">
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
            accessibilityLabel="Search all of Pinterest"
            accessibilityClearButtonLabel="Clear search field"
            id="searchFieldA11yExample"
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
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      title="Visible label"
      description={`When specified, \`label\` adds a label above the SearchField. If \`label\` is specified, \`accessibilityLabel\` can be an empty string.`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function SearchFieldExample() {
  const [value, setValue] = React.useState('');

  return (
    <Box padding={3} display="flex" alignItems="center">
      <Box flex="grow" paddingX={2}>
        <SearchField
          accessibilityLabel=""
          accessibilityClearButtonLabel="Clear search field"
          label="Search Messages"
          id="searchMessagesLabelExample"
          onChange={({value}) => setValue(value)}
          placeholder="Search by name"
          value={value}
        />
      </Box>
    </Box>
  );
}
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Sizes"
      description={`There are 2 sizes available: \`md\` (default) and \`lg\`.`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function SearchFieldExample() {
  const [value, setValue] = React.useState('');

  return (
    <Flex gap={8} alignItems="center">
      <Flex gap={4} direction="column">
        <Text>Medium (md)</Text>
        <SearchField
          accessibilityLabel=""
          accessibilityClearButtonLabel="Clear search field"
          label="Search Messages"
          id="searchMessagesMedium"
          onChange={({value}) => setValue(value)}
          placeholder="Search by name"
          value={value}
        />
      </Flex>
      <Flex gap={4} direction="column">
        <Text>Large (lg)</Text>
        <SearchField
          accessibilityLabel=""
          accessibilityClearButtonLabel="Clear search field"
          label="Search Messages"
          id="searchMessagesLarge"
          onChange={({value}) => setValue(value)}
          placeholder="Search by name"
          value={value}
          size="lg"
        />
      </Flex>
    </Flex>
  );
}
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Error"
      description={`An \`errorMessage\` can be specified if needed.`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function SearchFieldExample() {
  const [value, setValue] = React.useState('pepper#$%');

  return (
    <Box padding={3} display="flex" alignItems="center">
      <Box flex="grow" paddingX={2}>
        <SearchField
          accessibilityLabel=""
          accessibilityClearButtonLabel="Clear search field"
          label="Search Messages"
          id="searchMessagesError"
          onChange={({value}) => setValue(value)}
          placeholder="Search by name"
          value={value}
          errorMessage="Invalid search term, please avoid special characters."
        />
      </Box>
    </Box>
  );
}
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

export default cards;
