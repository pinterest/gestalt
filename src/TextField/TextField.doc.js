// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box/Box';
import Label from '../Label/Label';
import TextField from './TextField';
import { ns, card, md, PropTable, StateRecorder } from '../../.corkboard/cards';

ns('TextField', 'TextField allows for text input.');

card(
  <PropTable
    props={[
      {
        name: 'autoComplete',
        type: `"current-password" | "on" | "off" | "username"`,
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
      },
      {
        name: 'errorMessage',
        type: 'string',
      },
      {
        name: 'id',
        type: 'string',
        required: true,
      },
      {
        name: 'idealErrorDirection',
        type: `'up' | 'right' | 'down' | 'left'`,
        description: 'Preferred direction for the ErrorFlyout to open',
        defaultValue: 'right',
      },
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'onBlur',
        type: '({ event: SyntheticFocusEvent<>, value: string }) => void',
      },
      {
        name: 'onChange',
        type: '({ event: SyntheticInputEvent<>, value: string }) => void',
        required: true,
      },
      {
        name: 'onFocus',
        type: '({ event: SyntheticFocusEvent<>, value: string }) => void',
      },
      {
        name: 'placeholder',
        type: 'string',
      },
      {
        name: 'type',
        type: `"date" | "email" | "number" | "password" | "text" | "url"`,
        defaultValue: 'text',
      },
      {
        name: 'value',
        type: 'string',
      },
    ]}
  />,
  { heading: false }
);

const TextFieldExample = (props: {
  disabled?: boolean,
  id: string,
  type: *,
  placeholder?: string,
  label: string,
  state?: Object,
  type?: *,
  value?: string,
}) => (
  <Box paddingY={2}>
    <Box marginBottom={2}>
      <Label htmlFor={props.id}>{props.label}</Label>
    </Box>
    <TextField
      disabled={props.disabled}
      id={props.id}
      onChange={() => {}}
      placeholder={props.placeholder || ''}
      value={props.state ? props.state[props.id] : props.value}
      type={props.type}
    />
  </Box>
);

TextFieldExample.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  state: PropTypes.shape({}),
  type: PropTypes.string,
};

card(
  'Options',
  md`
    Shown to the right are some of the various options that \`TextField\` supports.
    They will expand to fill the width of their parent container and the text within
    is responsive.

    ~~~jsx
    <Box marginBottom={2}>
      <Label htmlFor="email">Email Address</Label>
    </Box>
    <TextField id="email" placeholder="Email Address" type="email" />
    ~~~

    ~~~jsx
    <TextField id="password" type="password" value="" />
    ~~~

    ~~~jsx
    <TextField id="date" type="date" value="" />
    ~~~

    ~~~jsx
    <TextField id="number" type="number" value="" />
    ~~~
  `,
  <StateRecorder
    fn={atom => {
      const state = atom.deref();
      return (
        <Box paddingX={2}>
          <TextFieldExample
            label="With a placeholder"
            state={state}
            id="email"
            type="email"
            placeholder="Email Address"
          />
          <TextFieldExample
            label="With a password"
            state={state}
            id="password"
            type="password"
          />
          <TextFieldExample label="Date" state={state} id="date" type="date" />
          <TextFieldExample
            label="Number"
            state={state}
            id="number"
            type="number"
          />
          <TextFieldExample
            disabled
            label="Disabled"
            id="disabled"
            value="Disabled TextField"
          />
        </Box>
      );
    }}
  />
);

card(
  'Errors',
  md`
    TextField's can display their own error messages if you'd like them to.
    To use our errors, simply pass in an \`errorMessage\` when there is an error present and we will
    handle the rest.

    ~~~jsx
    <TextField errorMessage="This field can't be blank!" id="firstName" />
    ~~~
  `,
  <StateRecorder
    fn={atom => (
      <Box display="flex" direction="row" paddingX={2}>
        <Box paddingY={2}>
          <Box marginBottom={2}>
            <Label htmlFor="firstName">With error message</Label>
          </Box>
          <TextField
            errorMessage="This field can't be blank!"
            id="firstName"
            onChange={({ value }) => atom.reset({ firstName: value })}
            value={atom.deref().firstName}
          />
        </Box>
      </Box>
    )}
  />
);
