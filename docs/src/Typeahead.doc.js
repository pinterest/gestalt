// @flow strict
import * as React from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Typeahead"
    description={`Use a \`Typeahead\` when you want to let the user filter a list when selecting.`}
  />
);

card(
  <PropTable
    props={[
      {
        name: 'data',
        type: 'Array<{ label: string, value: string }>',
        description:
          'The data much be an array with objects containing only label and value properties',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'defaultItem',
        type: '{ label: string, value: string }',
        description: 'The default item set in the Typeahead',
        required: false,
        href: 'defaultItemExample',
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'label',
        type: 'string',
      },
      {
        name: 'noResultText',
        type: 'string',
        href: 'basicExample',
        required: true,
        description: 'The text shown when the input value returns no matches',
      },
      {
        name: 'onBlur',
        type:
          '({ event: SyntheticFocusEvent<HTMLInputElement> | SyntheticEvent<HTMLInputElement> , value: string }) => void',
        required: false,
        description: 'Callback when you focus outside the component ',
        href: 'basicExample',
      },

      {
        name: 'onChange',
        type: '({ event: SyntheticInputEvent<>, value: string }) => void',
        required: false,
        description: 'Callback when user types into the control input field',
        href: 'basicExample',
      },

      {
        name: 'onFocus',
        type: '({ event: SyntheticFocusEvent<>, value: string }) => void',
        required: false,
        description: 'Callback when you focus on the component',
        href: 'basicExample',
      },
      {
        name: 'onSelect',
        type: '({ event: SyntheticInputEvent<>, item: Object }) => void',
        required: false,
        description: 'Callback when you select an item ',
        href: 'basicExample',
      },
      {
        name: 'placeholder',
        type: 'string',
        href: 'basicExample',
      },
      {
        name: 'searchField',
        type: 'string',
        description:
          'The property name on which you want to be able to search on',
        href: 'basicExample',
        defaultValue: 'label',
      },

      {
        name: 'size',
        type: '"md" | "lg"',
        required: false,
        description: 'md: 40px, lg: 48px',
        defaultValue: 'md',
      },
      {
        name: 'ref',
        type: "React.Ref<'div'>",
        description:
          'Forward the ref to the underlying component container element',
        href: 'refExample',
      },
    ]}
  />
);

card(
  <Example
    id="basicExample"
    name="Example"
    defaultCode={`
function Example(props) {
  const [item, setItem] = React.useState("");
  const [selected, setSelected] = React.useState(null);

  const options = Array.from(Array(20).keys()).map((item) => ({
    value: "value-" + (item + 1),
    label: "Label-" + (item + 1),
  }));

  const handleOnChange = ({ value }) => {
    setItem(value);
  };

  const handleSelect = ({item}) => {
    setSelected(item);
  };

  const label = "Selected Item: " + (selected && selected.label || '');

  return (
    <>
      <Box marginBottom={4}>
       <Text>Selected Item: {(selected && selected.label) || ""}</Text>
      </Box>

      <Typeahead
        label="Typeahead Example 1"
        id="Typeahead-example"
        noResultText="No Results"
        data={options}
        placeholder="Select a Label"
        onChange={handleOnChange}
        value={item}
        onSelect={handleSelect}
      />
    </>
  );
}`}
  />
);

card(
  <Example
    id="defaultItemExample"
    name="Default Item Example"
    defaultCode={`
function Example(props) {
  const options = Array.from(Array(20).keys()).map((item) => ({
    value: "value-" + (item + 1),
    label: "Label-" + (item + 1),
  }));

  const defaultOption = options[3];
  const [item, setItem] = React.useState(defaultOption.label);
  const [selected, setSelected] = React.useState(defaultOption);

  const handleOnChange = ({ value }) => {
    setItem(value);
  };

  const handleSelect = ({item}) => {
    setSelected(item);
  };

  return (
    <>
      <Box marginBottom={4}>
       <Text>Selected Item: {(selected && selected.label) || ""}</Text>
      </Box>

      <Typeahead
        label="Typeahead Example 2"
        id="Typeahead-example-defaultItem"
        noResultText="No Results"
        data={options}
        defaultItem={defaultOption}
        placeholder="Select a Label"
        onChange={handleOnChange}
        value={item}
        onSelect={handleSelect}
      />
    </>
  );
}`}
  />
);

export default cards;
