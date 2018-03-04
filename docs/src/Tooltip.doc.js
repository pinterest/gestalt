// @flow
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Tooltip, Box, Heading, Text, IconButton } from 'gestalt';
import { md, card, PropTable, StateRecorder } from './cards';

import { ns } from 'corkboard';
import PageHeader from './components/PageHeader';

ns('Tooltip');

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
          'Depicts if the Tooltip shares a relative root with the anchor element',
      },
      {
        name: 'size',
        type: `"xs" | "sm" | "md" | "lg" | "xl"`,
        description: `xs: 185px, sm: 230px, md: 284px, lg: 320px, xl:375px`,
        defaultValue: 'md',
      },
    ]}
  />,
  { heading: false }
);

card(
  'Sizes',
  md`
    There are 5 sizes currently available for \`Tooltip\`. Default size is \`md\`.

    ~~~html
    Widths:
    xs: 185px
    md: 230px
    lg: 284px
    lg: 320px
    xl: 375px
    ~~~
  `,
  <StateRecorder
    fn={atom => (
      <Box display="flex">
        <Box display="flex" direction="column" padding={2} alignItems="center">
          <Heading size="xs">xs</Heading>
          <TooltipEx
            idealDirection="down"
            isOpen={!!atom.deref().xs}
            onDismiss={() => atom.reset({ xs: false })}
            anchor={
              <IconButton
                accessibilityLabel="More options"
                accessibilityExpanded={!!atom.deref().xs}
                accessibilityHaspopup
                icon="flag"
                onClick={() => atom.reset({ xs: !atom.deref().xs })}
                bgColor="lightGray"
              />
            }
            size="xs"
          >
            <Box
              display="flex"
              width="100%"
              justifyContent="center"
              padding={2}
            >
              <Heading color="white" size="xs">
                xs
              </Heading>
            </Box>
          </TooltipEx>
        </Box>
        <Box display="flex" direction="column" padding={2} alignItems="center">
          <Heading size="xs">sm</Heading>
          <TooltipEx
            idealDirection="down"
            isOpen={!!atom.deref().sm}
            onDismiss={() => atom.reset({ sm: false })}
            anchor={
              <IconButton
                accessibilityLabel="More options"
                accessibilityExpanded={!!atom.deref().sm}
                accessibilityHaspopup
                icon="flag"
                onClick={() => atom.reset({ sm: !atom.deref().sm })}
                bgColor="lightGray"
              />
            }
            size="sm"
          >
            <Box
              display="flex"
              width="100%"
              justifyContent="center"
              padding={2}
            >
              <Heading color="white" size="sm">
                sm
              </Heading>
            </Box>
          </TooltipEx>
        </Box>
        <Box display="flex" direction="column" padding={2} alignItems="center">
          <Heading size="xs">md</Heading>
          <TooltipEx
            idealDirection="down"
            isOpen={!!atom.deref().md}
            onDismiss={() => atom.reset({ md: false })}
            anchor={
              <IconButton
                accessibilityLabel="More options"
                accessibilityExpanded={!!atom.deref().md}
                accessibilityHaspopup
                icon="flag"
                onClick={() => atom.reset({ md: !atom.deref().md })}
                bgColor="lightGray"
              />
            }
            size="md"
          >
            <Box
              display="flex"
              width="100%"
              justifyContent="center"
              padding={2}
            >
              <Heading color="white" size="md">
                md
              </Heading>
            </Box>
          </TooltipEx>
        </Box>
        <Box display="flex" direction="column" padding={2} alignItems="center">
          <Heading size="xs">lg</Heading>
          <TooltipEx
            idealDirection="down"
            isOpen={!!atom.deref().lg}
            onDismiss={() => atom.reset({ lg: false })}
            anchor={
              <IconButton
                accessibilityLabel="More options"
                accessibilityExpanded={!!atom.deref().lg}
                accessibilityHaspopup
                icon="flag"
                onClick={() => atom.reset({ lg: !atom.deref().lg })}
                bgColor="lightGray"
              />
            }
            size="lg"
          >
            <Box
              display="flex"
              width="100%"
              justifyContent="center"
              padding={2}
            >
              <Heading color="white" size="lg">
                lg
              </Heading>
            </Box>
          </TooltipEx>
        </Box>
        <Box display="flex" direction="column" padding={2}>
          <Heading size="xs">xl</Heading>
          <TooltipEx
            idealDirection="down"
            isOpen={!!atom.deref().xl}
            onDismiss={() => atom.reset({ xl: false })}
            anchor={
              <IconButton
                accessibilityLabel="More options"
                accessibilityExpanded={!!atom.deref().xl}
                accessibilityHaspopup
                icon="flag"
                onClick={() => atom.reset({ xl: !atom.deref().xl })}
                bgColor="lightGray"
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
              <Heading color="white" size="xl">
                xl
              </Heading>
            </Box>
          </TooltipEx>
        </Box>
      </Box>
    )}
  />
);

card(
  'anchor',
  md`
    The \`anchor\` ref you pass in should not include anything other than the trigger element itself. The Flyout
    calculates its' position based on the bounding box of the \`anchor\`. To achieve this, we recommend setting a
    ref directly on the component itself or adding \`display: inline-block\` to the parent container with the ref.

    If you put the \`Tooltip\` in a portal or provider or it no longer shares
    a relative root with the \`anchor\`, you must set \`positionRelativeToAnchor=false\` in order for it to be
    positioned correctly relative to the body.
  `
);

card(
  'Ideal Direction Preference',
  md`
    The \`Tooltip\` component gives you the ability to _influence_ the preferred direction that it
    opens. This may be a useful property to specify if you have a page with many potential Tooltips
    and you want the behavior to look uniform.

    If an \`idealDirection\` is provided, the Tooltip will attempt to open in the direction specified.
    It is important to note that the direction you specifiy can be over-ruled if there is not enough space
    within the viewport in that specific direction and there is enough space in another direction. If no
    \`idealDirection\` is provided, the Tooltip will open in the direction where there is the
    most space available within the viewport.
  `
);

card(
  'Accessibility',
  md`
    We recommend passing in the following ARIA attributes to the anchor element:

    * \`aria.haspopup\` lets the screenreader know that there is a flyout linked to the tigger.
    * \`aria.expanded\` informs the screenreader whether the flyout is currently open or closed.
  `
);

card(
  'Example',
  md`
    Click on the IconButton to see the Tooltip display.

    ~~~jsx
    <div
      ref={c => {
        this.newBoardButton = c;
      }}
    >
      <IconButton
        accessibilityLabel="Create a new board"
        icon="add"
        onClick={() => this.setState({ isOpen: !this.state.isOpen })}
      />
    </div>;
    {
      this.state.isOpen && (
        <Tooltip
          anchor={this.newBoardButton}
          idealDirection="down"
          onDismiss={() => this.setState({ isOpen: false })}
        >
          <Text bold color="white" size="md">
            Create a board to save Pins about Kitchen Design for later
          </Text>
        </Tooltip>
      );
    }
    ~~~
  `,
  <StateRecorder
    fn={atom => (
      <Box display="flex" direction="row">
        <Box paddingY={2}>
          <TooltipEx
            anchor={
              <IconButton
                accessibilityLabel="Create a new board"
                icon="add"
                onClick={() => atom.reset({ value: !atom.deref().value })}
              />
            }
            idealDirection="down"
            isOpen={!!atom.deref().value}
            onDismiss={() => atom.reset({ value: !atom.deref().value })}
          >
            <Text bold color="white">
              Create a board to save Pins about Kitchen Design for later
            </Text>
          </TooltipEx>
        </Box>
      </Box>
    )}
  />
);

type Props = {
  anchor?: any,
  children?: any,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  isOpen: boolean,
  onDismiss: () => void,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
};

class TooltipEx extends Component<Props> {
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
      <Box>
        <div
          ref={c => {
            this.anchor = c;
          }}
        >
          {anchor}
        </div>
        {isOpen && (
          <Tooltip
            anchor={this.anchor}
            idealDirection={idealDirection}
            onDismiss={onDismiss}
            size={size}
          >
            {children}
          </Tooltip>
        )}
      </Box>
    );
  }
}
