// @flow
import * as React from 'react';
import Example from './components/Example';
import PropTable from './components/PropTable';
import PageHeader from './components/PageHeader';
import CardPage from './components/CardPage';

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
      },
      {
        name: 'id',
        type: 'string',
        required: true,
      },
      {
        name: 'idealErrorDirection',
        type: `?'up' | 'right' | 'down' | 'left'`,
        description: 'Preferred direction for the ErrorFlyout to open',
        defaultValue: 'right',
      },
      {
        name: 'name',
        type: '?string',
      },
      {
        name: 'onChange',
        type: '({ event: SyntheticInputEvent<>, value: string }) => void',
        required: true,
      },
      {
        name: 'options',
        type: 'Array<{ label: string, value: string }>',
        required: true,
      },
      {
        name: 'placeholder',
        type: '?string',
      },
      {
        name: 'value',
        type: '?string',
        description: 'Value that is selected.',
      },
    ]}
    heading={false}
  />
);

card(
  <Example
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
    name="Example: With Error Message"
    description={`SelectList's can display their own error messages if you'd like them to.
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
          errorMessage="This field can not be blank"
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

export default () => <CardPage cards={cards} />;
