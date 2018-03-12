// @flow
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Tooltip } from 'gestalt';
import PropTable from './components/PropTable';
import Example from './components/Example';
import PageHeader from './components/PageHeader';
import Card from './components/Card';
import CardPage from './components/CardPage';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Tooltip"
    description="
Tooltips educate people about a concept by drawing attention to a UI element, and encourage
a specific next action. Tooltips teach people about the normal way to perform an action,
without handholding. The default tooltip has two explicit buttons, one for the suggested
action and one to dismiss. Tooltips can also simply show text.
"
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
        name: 'idealDirection',
        type: `'up' | 'right' | 'down' | 'left'`,
        description: 'Preferred direction for the Flyout to open',
      },
      {
        name: 'children',
        type: 'React.Node',
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
          'Depicts if the Tooltip shares a relative root with the anchor element',
      },
      {
        name: 'size',
        type: `"xs" | "sm" | "md" | "lg" | "xl"`,
        description: `xs: 185px, sm: 230px, md: 284px, lg: 320px, xl:375px`,
        defaultValue: 'md',
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
class TooltipExample extends React.Component {
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
          <Button
            accessibilityExpanded={!!this.state.open}
            accessibilityHaspopup
            onClick={this.handleClick}
            text={this.state.open ? 'Hide Tooltip' : 'Show Tooltip'}
          />
        </div>
        {this.state.open && (
          <Tooltip
            anchor={this.anchor}
            idealDirection="down"
            onDismiss={this.handleDismiss}
          >
            <Text bold color="white" size="md">
              Create a board to save Pins about Kitchen Design for later
            </Text>
          </Tooltip>
        )}
      </Box>
    );
  }
}
`}
    scope={{ Button, Tooltip }}
  />
);

card(
  <Card
    description={`
    We recommend passing in the following ARIA attributes to the anchor element:

    * \`aria.haspopup\` lets the screenreader know that there is a flyout linked to the tigger.
    * \`aria.expanded\` informs the screenreader whether the flyout is currently open or closed.
  `}
    name="Accessibility"
  />
);

card(
  <Card
    description={`
    The \`anchor\` ref you pass in should not include anything other than the trigger element itself. The Flyout
    calculates its' position based on the bounding box of the \`anchor\`. To achieve this, we recommend setting a
    ref directly on the component itself or adding \`display: inline-block\` to the parent container with the ref.

    If you put the \`Tooltip\` in a portal or provider or it no longer shares
    a relative root with the \`anchor\`, you must set \`positionRelativeToAnchor=false\` in order for it to be
    positioned correctly relative to the body.
  `}
    name="Anchor"
  />
);

card(
  <Card
    description={`
    The \`Tooltip\` component gives you the ability to _influence_ the preferred direction that it
    opens. This may be a useful property to specify if you have a page with many potential Tooltips
    and you want the behavior to look uniform.

    If an \`idealDirection\` is provided, the Tooltip will attempt to open in the direction specified.
    It is important to note that the direction you specifiy can be over-ruled if there is not enough space
    within the viewport in that specific direction and there is enough space in another direction. If no
    \`idealDirection\` is provided, the Tooltip will open in the direction where there is the
    most space available within the viewport.
  `}
    name="Ideal Direction Preference"
  />
);

export default () => <CardPage cards={cards} />;
