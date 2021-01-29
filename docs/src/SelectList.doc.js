// @flow strict
import React, { type Node } from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="SelectList"
    description={`Use a \`SelectList\` when you have four or more items you want a user to choose from.`}
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
      },
      {
        name: 'errorMessage',
        type: 'string',
        href: 'exampleWithError',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'More information about how to complete the form field',
        href: 'helperText',
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
        name: 'name',
        type: 'string',
        href: 'basicExample',
      },
      {
        name: 'onChange',
        type: '({ event: SyntheticInputEvent<>, value: string }) => void',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'options',
        type: 'Array<{ label: string, value: string, disabled?: boolean }>',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'placeholder',
        type: 'string',
        href: 'basicExample',
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
        description: 'Value that is selected.',
        href: 'basicExample',
      },
    ]}
  />,
);

card(
  <Example
    id="basicExample"
    name="Example"
    description={`Make sure to attach a \`Label\` to every SelectList.`}
    defaultCode={`
function Example(props) {
  const [city, setCity] = React.useState('la')
  const cityOptions = [
    {
      value: "bos",
      label: "Boston"
    },
    {
      value: "la",
      label: "Los Angeles"
    },
    {
      value: "sf",
      label: "San Francisco"
    }
  ];
  return (
    <SelectList
      id="city"
      name="city"
      onChange={({ value }) => setCity(value)}
      options={cityOptions}
      placeholder="Select city"
      label="City"
      value={city}
    />
  );
}
    `}
  />,
);

card(
  <Example
    id="helperText"
    name="Example: Helper Text"
    description={`Whenever you want to provide more information about a form field, you should use \`helperText\`.`}
    defaultCode={`
function Example(props) {
  const [country, setCountry] = React.useState('belgium')
  const countries = [
    {
      value: "belgium",
      label: "Belgium"
    },
    {
      value: "france",
      label: "France"
    },
    {
      value: "usa",
      label: "USA"
    }
  ];
  return (
    <Box padding={2} color="white">
      <SelectList
        id="country"
        name="country"
        onChange={({ value }) => setCountry(value)}
        options={countries}
        placeholder="Select country"
        label="Country"
        helperText="Pick your favourite country (the one with the best fries)"
        value={country}
      />
    </Box>
  );
}
`}
  />,
);

card(
  <Example
    id="exampleWithError"
    name="Example: With Error Message"
    description={`SelectList can display error messages if you'd like.
    To use our errors, simply pass in an \`errorMessage\` when there is an error present.`}
    defaultCode={`
function Example(props) {
  const [hobby, setHobby] = React.useState('sailing')
  const hobbies = [
    {
      value: "sailing",
      label: "Sailing"
    },
    {
      value: "skiing",
      label: "Skiing"
    },
    {
      value: "cycling",
      label: "Cycling"
    }
  ];
  return (
    <SelectList
      id="hobby"
      name="hobby"
      errorMessage={ hobby === 'sailing' ? 'Sailing is not a hobby, it is a passion' : null}
      onChange={({ value }) => setHobby(value)}
      options={hobbies}
      placeholder="Select hobby"
      label="Hobby"
      value={hobby}
    />
  );
}
    `}
  />,
);

export default cards;
