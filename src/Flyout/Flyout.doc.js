// @flow
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Box from '../Box/Box';
import Button from '../Button/Button';
import Heading from '../Heading/Heading';
import Flyout from './Flyout';
import IconButton from '../IconButton/IconButton';
import Link from '../Link/Link';
import Text from '../Text/Text';
import { ns, card, md, PropTable } from '../../.corkboard/cards';

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
  'Sizes',
  md`
    There are 5 sizes currently available for \`Flyout\`.

    ~~~html
    Widths:
    xs: 185px
    sm: 230px
    md: 284px
    lg: 320px
    xl: 375px
    ~~~
  `,
  atom => (
    <Box display="flex">
      <Box display="flex" direction="column" padding={2} alignItems="center">
        <Heading size="xs">xs</Heading>
        <FlyoutEx
          idealDirection="down"
          isOpen={!!atom.deref().xs}
          onDismiss={() => atom.reset({ xs: false })}
          anchor={
            <IconButton
              accessibilityLabel="More options"
              accessibilityExpanded={!!atom.deref().xs}
              accessibilityHaspopup
              icon="ellipsis"
              onClick={() => atom.reset({ xs: !atom.deref().xs })}
            />
          }
          size="xs"
        >
          <Box display="flex" width="100%" justifyContent="center" padding={2}>
            <Heading size="xs">xs</Heading>
          </Box>
        </FlyoutEx>
      </Box>
      <Box display="flex" direction="column" padding={2} alignItems="center">
        <Heading size="xs">sm</Heading>
        <FlyoutEx
          idealDirection="down"
          isOpen={!!atom.deref().sm}
          onDismiss={() => atom.reset({ sm: false })}
          anchor={
            <IconButton
              accessibilityLabel="More options"
              accessibilityExpanded={!!atom.deref().sm}
              accessibilityHaspopup
              icon="ellipsis"
              onClick={() => atom.reset({ sm: !atom.deref().sm })}
            />
          }
          size="sm"
        >
          <Box display="flex" width="100%" justifyContent="center" padding={2}>
            <Heading size="sm">sm</Heading>
          </Box>
        </FlyoutEx>
      </Box>
      <Box display="flex" direction="column" padding={2} alignItems="center">
        <Heading size="xs">md</Heading>
        <FlyoutEx
          idealDirection="down"
          isOpen={!!atom.deref().md}
          onDismiss={() => atom.reset({ md: false })}
          anchor={
            <IconButton
              accessibilityLabel="More options"
              accessibilityExpanded={!!atom.deref().md}
              accessibilityHaspopup
              icon="ellipsis"
              onClick={() => atom.reset({ md: !atom.deref().md })}
            />
          }
          size="md"
        >
          <Box display="flex" width="100%" justifyContent="center" padding={2}>
            <Heading size="md">md</Heading>
          </Box>
        </FlyoutEx>
      </Box>
      <Box display="flex" direction="column" padding={2} alignItems="center">
        <Heading size="xs">lg</Heading>
        <FlyoutEx
          idealDirection="down"
          isOpen={!!atom.deref().lg}
          onDismiss={() => atom.reset({ lg: false })}
          anchor={
            <IconButton
              accessibilityLabel="More options"
              accessibilityExpanded={!!atom.deref().lg}
              accessibilityHaspopup
              icon="ellipsis"
              onClick={() => atom.reset({ lg: !atom.deref().lg })}
            />
          }
          size="lg"
        >
          <Box display="flex" width="100%" justifyContent="center" padding={2}>
            <Heading size="lg">lg</Heading>
          </Box>
        </FlyoutEx>
      </Box>
      <Box display="flex" direction="column" padding={2}>
        <Heading size="xs">xl</Heading>
        <FlyoutEx
          idealDirection="down"
          isOpen={!!atom.deref().xl}
          onDismiss={() => atom.reset({ xl: false })}
          anchor={
            <IconButton
              accessibilityLabel="More options"
              accessibilityExpanded={!!atom.deref().xl}
              accessibilityHaspopup
              icon="ellipsis"
              onClick={() => atom.reset({ xl: !atom.deref().xl })}
            />
          }
          size="xl"
        >
          <Box
            display="flex"
            width="100%"
            justifyContent="center"
            padding={2}
            alignItems="center"
          >
            <Heading size="xl">xl</Heading>
          </Box>
        </FlyoutEx>
      </Box>
    </Box>
  )
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
  atom => (
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
  )
);

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
