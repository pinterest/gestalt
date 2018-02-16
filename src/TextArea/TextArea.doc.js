// @flow

import * as React from 'react';
import Box from '../Box/Box';
import Label from '../Label/Label';
import TextArea from './TextArea';
import { ns, card, md, PropTable } from '../../.corkboard/cards';

ns('TextArea', 'TextArea allows for multiline input.');

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
        name: 'rows',
        type: 'number',
        description: 'Number of rows to display',
        defaultValue: 3,
      },
      {
        name: 'value',
        type: 'string',
      },
    ]}
  />,
  { heading: false }
);

card(
  'Options',
  md`
    A \`TextArea\` will expand to fill the width of their parent container.

    ~~~jsx
    <Box marginBottom={2}>
      <Label htmlFor="aboutme">With a placeholder</Label>
    </Box>
    <TextArea id="aboutme" placeholder="Write something about yourself..." />
    ~~~
  `,
  atom => (
    <Box paddingX={2}>
      <Box paddingY={3}>
        <Box marginBottom={2}>
          <Label htmlFor="aboutme">With a placeholder</Label>
        </Box>
        <TextArea
          id="aboutme"
          onChange={({ value }) => atom.reset({ placeholderValue: value })}
          placeholder="Write something about yourself..."
          value={atom.deref().placeholderValue}
        />
      </Box>

      <Box paddingY={3}>
        <Box marginBottom={2}>
          <Label htmlFor="disabled">Disabled</Label>
        </Box>
        <TextArea
          disabled
          id="disabled"
          onChange={({ value }) => atom.reset({ disabled: value })}
          placeholder="A disabled TextArea"
          value={atom.deref().disabled}
        />
      </Box>
    </Box>
  )
);

card(
  'Errors',
  md`
    TextArea's can display their own error messages if you'd like them to.
    To use our errors, simply pass in an \`errorMessage\` when there is an error present and we will
    handle the rest.

    ~~~jsx
    <TextArea errorMessage="This field can't be blank!" id="comment" />
    ~~~
  `,
  atom => (
    <Box paddingX={2}>
      <Box paddingY={3}>
        <Box marginBottom={2}>
          <Label htmlFor="comment">With error message</Label>
        </Box>
        <TextArea
          errorMessage="This field can't be blank!"
          id="comment"
          onChange={({ value }) => atom.reset({ errorMsgValue: value })}
          value={atom.deref().errorMsgValue}
        />
      </Box>
    </Box>
  )
);

card(
  'Rows',
  md`
    TextArea's can resize their height to fit different line counts besides the default 3.
    To use non-default height, pass in \`rows\` to set the underlying value on the html element.

    ~~~jsx
    <TextArea id="rows" rows={5} />
    ~~~
  `,
  atom => (
    <Box paddingX={2}>
      <Box paddingY={3}>
        <Box marginBottom={2}>
          <Label htmlFor="rows">With non-default rows</Label>
        </Box>
        <TextArea
          id="rows"
          onChange={({ value }) => atom.reset({ placeholderValue: value })}
          rows={5}
          value={atom.deref().placeholderValue}
        />
      </Box>
    </Box>
  )
);
