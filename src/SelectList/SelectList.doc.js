// @flow
import * as React from 'react';
import Box from '../Box/Box';
import Label from '../Label/Label';
import SelectList from './SelectList';
import Text from '../Text/Text';
import { ns, card, md, PropTable, StateRecorder } from '../../.corkboard/cards';

ns(
  'SelectList',
  `Use a \`SelectList\` when you have four or more items you want a user to choose from.`
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
  />,
  { heading: false }
);

card(
  'FlowTypes',
  md`
    ~~~jsx
    type Props = {
      errorMessage?: string,
      id: string,
      idealErrorDirection?:
        | 'up'
        | 'right'
        | 'down'
        | 'left' /* default: right */,
      name?: string,
      onChange: (value: string) => void,
      options: Array<{
        label: string,
        value: string,
      }>,
      placeholder?: string,
      value?: string,
    };
    ~~~
  `
);

const countryOptions = [
  {
    value: 'aus',
    label: 'Australia',
  },
  {
    value: 'bel',
    label: 'Belgium',
  },
  {
    value: 'can',
    label: 'Canada',
  },
  {
    value: 'usa',
    label: 'United States of America',
  },
];

const cityOptions = [
  {
    value: 'bos',
    label: 'Boston',
  },
  {
    value: 'la',
    label: 'Los Angeles',
  },
  {
    value: 'sf',
    label: 'San Francisco',
  },
];

card(
  'Example',
  md`
    Make sure to attach a \`Label\` to every SelectList.

    ~~~jsx
    <Box>
      <Box paddingY={2}>
        <Label htmlFor="country">
          <Text>Country</Text>
        </Label>
      </Box>
      <SelectList
        id="country"
        name="country"
        onChange={({ value }) => this.setState({ value })}
        options={countryOptions}
        placeholder="Select country"
        value={this.state.value}
      />
    </Box>
    ~~~
  `,
  <StateRecorder
    fn={atom => (
      <Box>
        <Box paddingY={2}>
          <Label htmlFor="country">
            <Text>Country</Text>
          </Label>
        </Box>
        <SelectList
          id="country"
          name="country"
          onChange={({ value }) => atom.reset({ value })}
          options={countryOptions}
          placeholder="Select country"
          value={atom.deref().value}
        />
      </Box>
    )}
  />
);

card(
  'Errors',
  md`
    SelectList's can display their own error messages if you'd like them to.
    To use our errors, simply pass in an \`errorMessage\` when there is an error present and we will
    handle the rest.

    ~~~jsx
    <Box>
      <Box paddingY={2}>
        <Label htmlFor="city">
          <Text>City</Text>
        </Label>
      </Box>
      <SelectList
        id="city"
        errorMessage="This field can't be blank!"
        name="city"
        onChange={({ value }) => this.setState({ value })}
        options={cityOptions}
        placeholder="Select city"
        value={this.state.value}
      />
    </Box>
    ~~~
  `,
  <StateRecorder
    fn={atom => (
      <Box>
        <Box paddingY={2}>
          <Label htmlFor="city">
            <Text>City</Text>
          </Label>
        </Box>
        <SelectList
          id="city"
          errorMessage="This field can't be blank!"
          name="city"
          onChange={({ value }) => atom.reset({ value })}
          options={cityOptions}
          placeholder="Select city"
          value={atom.deref().value}
        />
      </Box>
    )}
  />
);

card(
  'Disabled',
  md`
    You can disabled a SelectList by setting the \`disabled\` attribute.

    ~~~jsx
    <Box>
      <Box paddingY={2}>
        <Label htmlFor="disabled">
          <Text>Disabled</Text>
        </Label>
      </Box>
      <SelectList
        disabled
        id="disabled"
        name="disabled"
        onChange={() => {}}
        options={cityOptions}
        placeholder="Select city"
        value="Select city"
      />
    </Box>
    ~~~
  `,
  <Box>
    <Box paddingY={2}>
      <Label htmlFor="disabled">
        <Text>Disabled</Text>
      </Label>
    </Box>
    <SelectList
      disabled
      id="disabled"
      name="disabled"
      onChange={() => {}}
      options={cityOptions}
      placeholder="Select city"
      value="Select city"
    />
  </Box>
);
