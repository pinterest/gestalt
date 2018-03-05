// @flow
import * as React from 'react';
import { Box, Label, TextArea } from 'gestalt';
import PropTable from './components/PropTable';
import StateRecorder from './components/StateRecorder';
import PageHeader from './components/PageHeader';
import Card from './components/Card';
import CardPage from './components/CardPage';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="TextArea"
    description="TextArea allows for multiline input."
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
    heading={false}
  />
);

card(
  <StateRecorder
    description={`
    A \`TextArea\` will expand to fill the width of their parent container.

    ~~~jsx
    <Box marginBottom={2}>
      <Label htmlFor="aboutme">With a placeholder</Label>
    </Box>
    <TextArea id="aboutme" placeholder="Write something about yourself..." />
    ~~~
  `}
    name="Options"
    fn={atom => (
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
    )}
    historyLimit={100}
  />
);

card(
  <StateRecorder
    description={`
    TextArea's can display their own error messages if you'd like them to.
    To use our errors, simply pass in an \`errorMessage\` when there is an error present and we will
    handle the rest.

    ~~~jsx
    <TextArea errorMessage="This field can't be blank!" id="comment" />
    ~~~
  `}
    name="Errors"
    fn={atom => (
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
    )}
  />
);

card(
  <StateRecorder
    description={`
    TextArea's can resize their height to fit different line counts besides the default 3.
    To use non-default height, pass in \`rows\` to set the underlying value on the html element.

    ~~~jsx
    <TextArea id="rows" rows={5} />
    ~~~
  `}
    name="Rows"
    fn={atom => (
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
    )}
  />
);

card(
  <Card
    description={`
    \`TextArea\` intentionally lacks support for autofocus. Generally speaking,
    autofocus interrupts normal page flow for screen readers making it an
    anti-pattern for accessibility.
  `}
    name="Autofocus"
  />
);

card(
  <Card
    description={`
    \`TextArea\` is commonly used as an input in forms along side submit buttons.
    In these cases, users expect that pressing Enter or Return with the input
    focused will submit the form.

    Out of the box, \`TextArea\` doesn't expose an \`onSubmit\` handler or
    individual key event handlers due to the complexities of handling these
    properly. Instead, developers are encouraged to wrap the \`TextArea\`
    in a \`form\` and to attach an \`onSubmit\` handler to that \`form\`.
  `}
    name="onSubmit"
  />
);

export default () => <CardPage cards={cards} />;
