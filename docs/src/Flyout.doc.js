// @flow
import React, { Component } from 'react';
import { Box, Button, Flyout, IconButton, Link, Text } from 'gestalt';
import { ns, card, md, PropTable, Example } from './cards';

type Props = {
  anchor?: any,
  children?: any,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  isOpen: boolean,
  onDismiss: () => void,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
};

class FlyoutEx extends Component<Props> {
  anchor: ?HTMLElement;

  render() {
    const {
      anchor,
      children,
      idealDirection,
      isOpen,
      onDismiss,
      size,
    } = this.props;

    return (
      <div>
        <div
          style={{ display: 'inline-block' }}
          ref={c => {
            this.anchor = c;
          }}
        >
          {anchor}
        </div>
        {isOpen && (
          <Flyout
            anchor={this.anchor}
            idealDirection={idealDirection}
            onDismiss={onDismiss}
            size={size}
          >
            {children}
          </Flyout>
        )}
      </div>
    );
  }
}

ns(
  'Flyout',
  `Flyouts are similar to modals, but they’re an alternative when we have less content to display
or to make the interaction feel faster.`
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
        type: 'any',
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
        type: `"xs" | "sm" | "md" | "lg" | "xl"`,
        description: `xs: 185px, sm: 230px, md: 284px, lg: 320px, xl:375px`,
        defaultValue: 'sm',
      },
    ]}
  />,
  { heading: false }
);

card(
  'Example',
  md`

  `,
  <Example
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
            message="Oops! This item is out of stock."
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
    scope={{ Button, Flyout }}
  />,
  { stacked: true }
);

card(
  'anchor',
  md`
    The \`anchor\` ref you pass in should not include anything other than the trigger element itself. The Flyout
    calculates its position based on the bounding box of the \`anchor\`. To achieve this, we recommend setting a
    ref directly on the component itself or adding \`display: inline-block\` to the parent container with the ref.

    If you put the \`Flyout\` in a portal or provider or it no longer shares
    a relative root with the \`anchor\`, you must set \`positionRelativeToAnchor=false\` in order for it to be
    positioned correctly relative to the body.
  `
);

card(
  'Ideal Direction Preference',
  md`
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
  `
);

card(
  'Accessibility',
  md`
    We recommend passing in the following ARIA attributes to the anchor element:

    * \`aria-haspopup\` lets the screenreader know that there is a flyout linked to the tigger.
    * \`aria-expanded\` informs the screenreader whether the flyout is currently open or closed.
  `
);

const moreFlyout = (
  <Box role="list">
    <Box role="listitem" padding={2}>
      <Text bold>
        <Link href="http://pinterest.com">Access business tools</Link>
      </Text>
    </Box>
    <Box role="listitem" padding={2}>
      <Text bold>
        <Link href="http://pinterest.com">See order history</Link>
      </Text>
    </Box>
    <Box role="listitem" padding={2}>
      <Text bold>
        <Link href="http://pinterest.com">Find friends</Link>
      </Text>
    </Box>
    <Box role="listitem" padding={2}>
      <Text bold>
        <Link href="http://pinterest.com">Make a widget</Link>
      </Text>
    </Box>
    <Box role="listitem" padding={2}>
      <Text bold>
        <Link href="http://pinterest.com">Get help</Link>
      </Text>
    </Box>
    <Box role="listitem" padding={2}>
      <Text bold>
        <Link href="http://pinterest.com">Logout</Link>
      </Text>
    </Box>
  </Box>
);

const profileFlyout = (
  <Box role="list">
    <Box role="listitem" padding={2}>
      <Text bold>
        <Link href="http://pinterest.com">View profile</Link>
      </Text>
    </Box>
    <Box role="listitem" padding={2}>
      <Text bold>
        <Link href="http://pinterest.com">Get help</Link>
      </Text>
    </Box>
    <Box role="listitem" padding={2}>
      <Text bold>
        <Link href="http://pinterest.com">Logout</Link>
      </Text>
    </Box>
  </Box>
);

const plusFlyout = (
  <Box role="list">
    <Box role="listitem" padding={2}>
      <Text color="gray" bold>
        <Link href="http://pinterest.com">
          Get our browser button to save ideas even faster
        </Link>
      </Text>
    </Box>
    <Box role="listitem" padding={2}>
      <Text color="gray" bold>
        <Link href="http://pinterest.com">Upload a pin</Link>
      </Text>
    </Box>
    <Box role="listitem" padding={2}>
      <Text color="gray" bold>
        <Link href="http://pinterest.com">Save from a website</Link>
      </Text>
    </Box>
    <Box role="listitem" padding={2}>
      <Text color="gray" bold>
        <Link href="http://pinterest.com">Report a bug</Link>
      </Text>
    </Box>
  </Box>
);

const helpFlyout = (
  <Box padding={2}>
    <Text bold align="center" size="sm">
      Need help with something? Check out our Help Center.
    </Text>
    <Box padding={2}>
      <Button color="red" text="Visit the help center" />
    </Box>
  </Box>
);

card(
  'Examples',
  md`
    Below are several sample code snippets with corresponding live Flyout examples on the right.

    <b>#1</b>

    ~~~jsx
    { this.state.isOpen ?
      <Flyout
        anchor={this.moreOptionsButton}
        idealDirection="down"
        onDismiss={() => this.setState({ isOpen: false })}
        }
        size="xs"
      >
        {children}
      </Flyout>
    : null }
    ~~~

    <b>#2</b>

    ~~~jsx
    { this.state.isOpen ?
      <Flyout
        anchor={this.profileOptionsButton}
        idealDirection="right"
        onDismiss={() => this.setState({ isOpen: false })}
        }
      >
        {children}
      </Flyout>
    : null }
    ~~~

    <b>#3</b>

    ~~~jsx
    {
      this.state.isOpen ? (
        <Flyout
          anchor={this.addPinButton}
          onDismiss={() => this.setState({ isOpen: false })}
        >
          {children}
        </Flyout>
      ) : null;
    }
    ~~~

    <b>#4</b>

    ~~~jsx
    {
      this.state.isOpen ? (
        <Flyout
          anchor={this.getHelpButton}
          idealDirection="up"
          onDismiss={() => this.setState({ isOpen: false })}
        >
          {children}
        </Flyout>
      ) : null;
    }
    ~~~
  `,
  <StateRecorder
    fn={atom => (
      <Box>
        <Box alignItems="center" paddingY={2} display="flex" direction="row">
          <Box paddingX={1}>
            <Text bold inline>
              #1
            </Text>
          </Box>
          <FlyoutEx
            idealDirection="down"
            isOpen={!!atom.deref().more}
            onDismiss={() => atom.reset({ more: false })}
            anchor={
              <IconButton
                accessibilityLabel="More options"
                accessibilityExpanded={!!atom.deref().more}
                accessibilityHaspopup
                icon="ellipsis"
                onClick={() => atom.reset({ more: !atom.deref().more })}
              />
            }
            size="xs"
          >
            {moreFlyout}
          </FlyoutEx>
        </Box>
        <Box alignItems="center" paddingY={2} display="flex" direction="row">
          <Box paddingX={1}>
            <Text bold inline>
              #2
            </Text>
          </Box>
          <FlyoutEx
            idealDirection="right"
            isOpen={!!atom.deref().profile}
            onDismiss={() => atom.reset({ profile: false })}
            anchor={
              <IconButton
                accessibilityLabel="Profile options"
                accessibilityExpanded={!!atom.deref().profile}
                accessibilityHaspopup
                icon="person"
                onClick={() => atom.reset({ profile: !atom.deref().profile })}
              />
            }
          >
            {profileFlyout}
          </FlyoutEx>
        </Box>
        <Box alignItems="center" paddingY={2} display="flex" direction="row">
          <Box paddingX={1}>
            <Text bold inline>
              #3
            </Text>
          </Box>
          <FlyoutEx
            isOpen={!!atom.deref().add}
            onDismiss={() => atom.reset({ add: false })}
            anchor={
              <IconButton
                accessibilityLabel="Add pin"
                accessibilityExpanded={!!atom.deref().add}
                accessibilityHaspopup
                icon="add"
                onClick={() => atom.reset({ add: !atom.deref().add })}
              />
            }
          >
            {plusFlyout}
          </FlyoutEx>
        </Box>
        <Box alignItems="center" paddingY={2} display="flex" direction="row">
          <Box paddingX={1}>
            <Text bold inline>
              #4
            </Text>
          </Box>
          <FlyoutEx
            idealDirection="up"
            isOpen={!!atom.deref().help}
            onDismiss={() => atom.reset({ help: false })}
            anchor={
              <Button
                accessibilityExpanded={!!atom.deref().help}
                accessibilityHaspopup
                onClick={() => atom.reset({ help: !atom.deref().help })}
                text="Help"
              />
            }
          >
            {helpFlyout}
          </FlyoutEx>
        </Box>
      </Box>
    )}
  />
);
