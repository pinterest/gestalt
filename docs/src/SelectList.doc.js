// @flow
import * as React from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="SelectList"
    description={`Use a \`SelectList\` when you have four or more items you want a user to choose from.`}
  />
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
        type: '?string',
        href: 'exampleWithError',
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'name',
        type: '?string',
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
        type: 'Array<{ label: string, value: string }>',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'placeholder',
        type: '?string',
        href: 'basicExample',
      },
      {
        name: 'value',
        type: '?string',
        description: 'Value that is selected.',
        href: 'basicExample',
      },
    ]}
  />
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
    <>
      <Label htmlFor="city">
        <Box padding={2}>
          <Text size="sm">City</Text>
        </Box>
      </Label>
      <SelectList
        id="city"
        name="city"
        onChange={({ value }) => setCity(value)}
        options={cityOptions}
        placeholder="Select city"
        value={city}
      />
    </>
  );
}
    `}
  />
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
    <>
      <Label htmlFor="hobby">
        <Box padding={2}>
          <Text size="sm">Hobby</Text>
        </Box>
      </Label>
      <SelectList
        id="hobby"
        name="hobby"
        errorMessage={ hobby === 'sailing' ? 'Sailing is not a hobby, it is a passion' : null}
        onChange={({ value }) => setHobby(value)}
        options={hobbies}
        placeholder="Select hobby"
        value={hobby}
      />
    </>
  );
}
    `}
  />
);

export default cards;
