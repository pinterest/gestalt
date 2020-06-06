// @flow strict
import * as React from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="AutoComplete"
    description={`Use a \`AutoComplete\` when you want to let the user filter a list when selecting.`}
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
        type: 'Array<{ label: string, value: string }>',
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
  />
);

card(
  <Example
    id="basicExample"
    name="Example"
    description={`Make sure to attach a \`Label\` to every SelectList.`}
    defaultCode={`
      function Example(props) {
        const [item, setItem] = React.useState('')

        const options = Array.from(Array(1000).keys()).map(item => ({value: "value-" + item, label: "label-" + item}))

        const handleOnChange = ({value}) => {
          setItem(value);

          console.log("onchange", value)

        }

        const handleSelect = item => {
          console.log("Selected Item:", item)
        }

        return (
          <AutoComplete
            id="city"
            name="city"
            onChange={handleOnChange}
            onSelect={handleSelect}
            onFocus={()=> console.log("FOCUSED")}
            onBlur={()=> console.log("BLUR")}
            data={options}
            placeholder="Select a Label"
            label="AutoComplete Example"
            value={item}
          />
        );
      }
    `}
  />
);

export default cards;
