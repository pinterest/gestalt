// @flow
import React from 'react';
import PropTable from './components/PropTable';
import Example from './components/Example';
import PageHeader from './components/PageHeader';
import Card from './components/Card';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Flyout"
    description="Flyouts are similar to modals, but they’re an alternative when we have less content to display
or to make the interaction feel faster."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'anchor',
        type: '?any',
        required: true,
        description: 'Ref for the element that the Flyout will attach to',
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
          'Depicts if the Flyout shares a relative root with the anchor element',
      },
      {
        name: 'color',
        type: `"blue" | "orange" | "white"`,
        defaultValue: 'white',
        description:
          'The background color of the Flyout: orange matches other baked-in error flyouts',
      },
      {
        name: 'size',
        type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | number`,
        description: `xs: 185px, sm: 230px, md: 284px, lg: 320px, xl:375px`,
        defaultValue: 'sm',
      },
    ]}
  />
);

card(
  <Example
    name="Example"
    defaultCode={`
class FlyoutExample extends React.Component {
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
            text="Help"
          />
        </div>
        {this.state.open &&
          <Flyout
            anchor={this.anchor}
            idealDirection="up"
            onDismiss={this.handleDismiss}
            size="md"
          >
            <Box padding={3}>
              <Text bold align="center">
                Need help with something? Check out our Help Center.
              </Text>
              <Box paddingX={2} marginTop={3}>
                <Button color="red" text="Visit the help center" />
              </Box>
            </Box>
          </Flyout>}
      </Box>
    );
  }
}
`}
  />
);

card(
  <Example
    name="Example: ErrorFlyout"
    description={`Flyout can also take on additional roles. Like [TextField](#TextField) and [TextArea](#TextArea), this component
can be used to highlight errors on other types of form fields by setting the \`color\` to \`orange.\``}
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
        {this.state.open &&
          <Flyout
            anchor={this.anchor}
            idealDirection="up"
            onDismiss={this.handleDismiss}
            color="orange"
            size="md"
          >
            <Box padding={3}>
              <Text bold color="white">
                Oops! This item is out of stock.
              </Text>
            </Box>
          </Flyout>
        }
      </Box>
    );
  }
}
`}
  />
);

card(
  <Card
    description={`
    The \`anchor\` ref you pass in should not include anything other than the trigger element itself. The Flyout
    calculates its position based on the bounding box of the \`anchor\`. To achieve this, we recommend setting a
    ref directly on the component itself or adding \`display: inline-block\` to the parent container with the ref.

    If you put the \`Flyout\` in a portal or provider or it no longer shares
    a relative root with the \`anchor\`, you must set \`positionRelativeToAnchor=false\` in order for it to be
    positioned correctly relative to the body.
  `}
    name="anchor"
  />
);

card(
  <Card
    description={`
    The \`Flyout\` component gives you the ability to _influence_ the preferred direction that it
    opens. This may be a useful property to specify if you have a page with many potential flyouts
    and you want the behavior to look uniform.

    If an \`idealDirection\` is provided, the flyout will attempt to open in the direction specified.
    It is important to note that the direction you specifiy can be over-ruled if there is not enough space
    within the viewport in that specific direction and there is enough space in another direction.

    If no \`idealDirection\` is provided, the flyout will open in the direction where there is the
    most space available within the viewport. If there is not enough space in any direction, the flyout
    will no longer be context-specific (with a caret to your anchor) and will appear at the bottom of
    the screen. This is to ensure that users are always able to view the contents of the flyout,
    regardless of their screen size.
  `}
    name="Ideal Direction Preference"
  />
);

card(
  <Card
    description={`
    We recommend passing in the following ARIA attributes to the anchor element:

    * \`aria-haspopup\` lets the screenreader know that there is a flyout linked to the tigger.
    * \`aria-expanded\` informs the screenreader whether the flyout is currently open or closed.
  `}
    name="Accessibility"
  />
);

export default cards;
