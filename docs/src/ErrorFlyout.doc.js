// @flow
import React from 'react';
import { Button, ErrorFlyout } from 'gestalt';
import PropTable from './components/PropTable';
import Example from './components/Example';
import PageHeader from './components/PageHeader';
import Card from './components/Card';
import CardPage from './components/CardPage';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="ErrorFlyout"
    description="[TextField](#TextField) and [TextArea](#TextArea) already have errors built into them. This component
is only for use with errors on other types of form fields."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'anchor',
        type: '?any',
        required: true,
        description: 'Ref for the element that the ErrorFlyout will attach to',
      },
      {
        name: 'id',
        type: 'string',
      },
      {
        name: 'idealDirection',
        type: `"up" | "right" | "down" | "left"`,
        description: 'Preferred direction for the ErrorFlyout to open',
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: 'Error message to be displayed',
      },
      {
        name: 'onDismiss',
        type: '() => void',
        required: true,
      },
      {
        name: 'positionRelativeToAnchor',
        type: 'boolean',
        defaultValue: true,
        description:
          'Depicts if the ErrorFlyout shares a relative root with the anchor element',
      },
      {
        name: 'size',
        type: `"xs" | "sm" | "md"`,
        description: `xs: 185px, sm: 230px, md: 284px`,
        defaultValue: 'sm',
      },
    ]}
    heading={false}
  />
);

card(
  <Example
    description="

  "
    name="Example"
    defaultCode={`
class ErrorFlyoutExample extends React.Component {
constructor(props) {
  super(props);
  this.state = { open: false };
  this.handleClick = this._handleClick.bind(this);
  this.handleDismiss = this._handleDismiss.bind(this);
}

_handleClick() {
  this.setState(() => ({ open: !this.state.open }));
}
_handleDismiss() {
  this.setState(() => ({ open: false }));
}

render() {
  return (
    <Box>
      <div
        style={{ display: "inline-block" }}
        ref={c => {
          this.anchor = c;
        }}
      >
        <Button onClick={this.handleClick} text="Remove" />
      </div>
      {this.state.open && (
        <ErrorFlyout
          anchor={this.anchor}
          idealDirection="down"
          message="Oops! This item is out of stock."
          onDismiss={this.handleDismiss}
          size="sm"
        />
      )}
    </Box>
  );
}
}
`}
    scope={{ Button, ErrorFlyout }}
  />
);

card(
  <Card
    description={`
    The \`anchor\` ref you pass in should not include anything other than the trigger element itself. The Flyout
    calculates its' position based on the bounding box of the \`anchor\`. To achieve this, we recommend setting a
    ref directly on the component itself or adding \`display: inline-block\` to the parent container with the ref.

    If you put the \`ErrorFlyout\` in a portal or provider or it no longer shares
    a relative root with the \`anchor\`, you must set \`positionRelativeToAnchor=false\` in order for it to be
    positioned correctly relative to the body.
  `}
    name="anchor"
  />
);

card(
  <Card
    description={`
    The \`ErrorFlyout\` component gives you the ability to _influence_ the preferred direction that it
    opens. This may be a useful property to specify if you have a page with many potential Errors
    and you want the behavior to look uniform.

    If an \`idealDirection\` is provided, the ErrorFlyout will attempt to open in the direction specified.
    It is important to note that the direction you specifiy can be over-ruled if there is not enough space
    within the viewport in that specific direction and there is enough space in another direction. If no
    \`idealDirection\` is provided, the ErrorFlyout will open in the direction where there is the
    most space available within the viewport.
  `}
    name="Ideal Direction Preference"
  />
);

export default () => <CardPage cards={cards} />;
