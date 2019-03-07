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
class SelectListExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this._handleChange.bind(this);
    this.state = {
      city: 'la'
    }
  }

  _handleChange({ value }) {
    this.setState({
      city: value,
    })
  }

  render() {
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
      <Box>
        <Box paddingY={2}>
          <Label htmlFor="city">
            <Text>City</Text>
          </Label>
        </Box>
        <SelectList
          id="city"
          name="city"
          onChange={this.handleChange}
          options={cityOptions}
          placeholder="Select city"
          value={this.state.city}
        />
      </Box>
    );
  }
}
    `}
  />
);

card(
  <Example
    id="exampleWithError"
    name="Example: With Error Message"
    description={`SelectList can display error messages if you'd like.
    To use our errors, simply pass in an \`errorMessage\` when there is an error present and we will
    handle the rest.`}
    defaultCode={`
class SelectListExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this._handleChange.bind(this);
    this.state = {
      city: 'la'
    }
  }

  _handleChange({ value }) {
    this.setState({
      city: value,
    })
  }

  render() {
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
      <Box>
        <Box paddingY={2}>
          <Label htmlFor="city">
            <Text>City</Text>
          </Label>
        </Box>
        <SelectList
          id="city"
          name="city"
          errorMessage="This selection has an error"
          onChange={this.handleChange}
          options={cityOptions}
          placeholder="Select city"
          value={this.state.city}
        />
      </Box>
    );
  }
}
    `}
  />
);

export default cards;
