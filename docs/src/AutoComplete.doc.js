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
        name: 'resultHeight',
        type: 'string',
        description: 'Set the height of results box',
        href: 'basicExample',
        defaultValue: '50vh',
      },
      {
        name: 'noResultText',
        type: 'string',
        href: 'basicExample',
        defaultValue: 'No Results',
      },
      {
        name: 'noResultTextColor',
        description: 'See Text component for available colors',
        type: 'string',
        href: 'basicExample',
        defaultValue: 'red',
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
        required: false,
        description: 'Callback when user types into the control input field',
        href: 'basicExample',
      },
      {
        name: 'onBlur',
        type: '({ event: SyntheticInputEvent<>, value: string }) => void',
        required: false,
        description: 'Callback when you focus outside the component ',
        href: 'basicExample',
      },
      {
        name: 'onFocus',
        type: '({ event: SyntheticInputEvent<>, value: string }) => void',
        required: false,
        description: 'Callback when you focus on the component',
        href: 'basicExample',
      },
      {
        name: 'onSelect',
        type: '({ event: SyntheticInputEvent<>, value: string }) => void',
        required: false,
        description: 'Callback when you select an item ',
        href: 'basicExample',
      },
      {
        name: 'data',
        type: 'Array<{ label: string }>',
        description:
          'The object can contain anything, the default display value will be label. Use searchField prop if you want to change the searchable field',
        required: true,
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
        name: 'caret',
        type: 'string',
        description: 'Control flyout caret',
        href: 'basicExample',
        defaultValue: true,
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
        description: 'The default text on the input',
        href: 'basicExample',
      },
      {
        name: 'defaultItem',
        type: 'object',
        description: 'The default object within data you want to be selected',
        href: 'basicExample',
      },
      {
        name: 'hoverColor',
        type: 'string',
        description:
          'The color used when you hover an item. See <Box/> component for color options.',
        href: 'basicExample',
      },
      {
        name: 'backgroundColor',
        type: 'string',
        description:
          'The background color for options in the results. See <Box/> component for color options.',
        href: 'basicExample',
      },
      {
        name: 'textColor',
        type: 'string',
        description:
          'The text color for options in the results. See <Text/> component for color options.',
        href: 'basicExample',
      },
      {
        name: 'containerColor',
        type: 'string',
        description:
          'The result box container color for options in the results. See <Box/> component for color options.',
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

card(
  <Example
    id="colorExample"
    name="Color Example"
    description="Different colors to the results container"
    defaultCode={`
      function ColorExample(props) {
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
            id="color"
            name="color"
            onChange={handleOnChange}
            onSelect={handleSelect}
            onFocus={()=> console.log("FOCUSED")}
            onBlur={()=> console.log("BLUR")}
            data={options}
            placeholder="Select a Label"
            label="AutoComplete Color Example"
            value={item}
            hoverColor="transparentDarkGray"
            textColor="white"
            backgroundColor="watermelon"
            containerColor="watermelon"
            noResultTextColor="lightGray"
          />
        );
      }
    `}
  />
);

export default cards;
