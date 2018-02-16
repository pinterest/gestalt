// @flow
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Box from '../Box/Box';
import Button from '../Button/Button';
import ErrorFlyout from './ErrorFlyout';
import { ns, card, md, PropTable } from '../../.corkboard/cards';

ns(
  'ErrorFlyout',
  `[TextField](#TextField) and [TextArea](#TextArea) already have errors built into them. This component
is only for use with errors on other types of form fields.`
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
  />,
  { heading: false }
);

card(
  'Sizes',
  md`
    There are 3 sizes currently available for \`ErrorFlyout\`.

    ~~~html
    Widths:
    xs: 185px
    sm: 230px
    md: 284px
    ~~~
  `,
  atom => (
    <Box display="flex" direction="row">
      <Box padding={2}>
        <ErrorFlyoutEx
          anchor={
            <Button
              onClick={() => atom.reset({ open: !atom.deref().open })}
              text="size='xs'"
            />
          }
          idealDirection="down"
          isOpen={!!atom.deref().open}
          message="Oops! This item is out of stock."
          onDismiss={() => atom.reset({ open: false })}
          size="xs"
        />
      </Box>
      <Box padding={2}>
        <ErrorFlyoutEx
          anchor={
            <Button
              onClick={() => atom.reset({ opensm: !atom.deref().open })}
              text="size='sm'"
            />
          }
          idealDirection="down"
          isOpen={!!atom.deref().opensm}
          message="Oops! This item is out of stock."
          onDismiss={() => atom.reset({ opensm: false })}
          size="sm"
        />
      </Box>
      <Box padding={2}>
        <ErrorFlyoutEx
          anchor={
            <Button
              onClick={() => atom.reset({ openmd: !atom.deref().open })}
              text="size='md'"
            />
          }
          idealDirection="down"
          isOpen={!!atom.deref().openmd}
          message="Oops! This item is out of stock."
          onDismiss={() => atom.reset({ openmd: false })}
          size="md"
        />
      </Box>
    </Box>
  ),
  { initialState: { open: false, opensm: false, openmd: false } }
);

card(
  'anchor',
  md`
    The \`anchor\` ref you pass in should not include anything other than the trigger element itself. The Flyout
    calculates its' position based on the bounding box of the \`anchor\`. To achieve this, we recommend setting a
    ref directly on the component itself or adding \`display: inline-block\` to the parent container with the ref.

    If you put the \`ErrorFlyout\` in a portal or provider or it no longer shares
    a relative root with the \`anchor\`, you must set \`positionRelativeToAnchor=false\` in order for it to be
    positioned correctly relative to the body.
  `
);

card(
  'Ideal Direction Preference',
  md`
    The \`ErrorFlyout\` component gives you the ability to _influence_ the preferred direction that it
    opens. This may be a useful property to specify if you have a page with many potential Errors
    and you want the behavior to look uniform.

    If an \`idealDirection\` is provided, the ErrorFlyout will attempt to open in the direction specified.
    It is important to note that the direction you specifiy can be over-ruled if there is not enough space
    within the viewport in that specific direction and there is enough space in another direction. If no
    \`idealDirection\` is provided, the ErrorFlyout will open in the direction where there is the
    most space available within the viewport.
  `
);

card(
  'Example',
  md`
    ~~~jsx
    <div
      className="inline-block"
      ref={c => {
        this.removeButton = c;
      }}
    >
      <Button
        onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        text="Remove"
      />
    </div>;
    {
      this.state.isOpen && (
        <ErrorFlyout
          anchor={this.removeButton}
          idealDirection="down"
          message="Oops! This item is out of stock."
          onDismiss={() => this.setState({ isOpen: false })}
          size="sm"
        />
      );
    }
    ~~~
  `,
  atom => (
    <Box display="flex" direction="row">
      <Box paddingY={2}>
        <ErrorFlyoutEx
          anchor={
            <Button
              onClick={() => atom.reset({ open: !atom.deref().open })}
              text="Remove"
            />
          }
          idealDirection="down"
          isOpen={!!atom.deref().open}
          message="Oops! This item is out of stock."
          onDismiss={() => atom.reset({ open: false })}
          size="sm"
        />
      </Box>
    </Box>
  ),
  { initialState: { open: false } }
);

type Props = {
  anchor?: any,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  isOpen: boolean,
  message: string,
  onDismiss: () => void,
  positionRelativeToAnchor?: boolean,
  size?: 'xs' | 'sm' | 'md',
};

class ErrorFlyoutEx extends Component<Props> {
  anchor: ?HTMLElement;

  render() {
    const {
      anchor,
      idealDirection,
      isOpen,
      message,
      onDismiss,
      positionRelativeToAnchor,
      size,
    } = this.props;

    return (
      <Box>
        <div
          style={{ display: 'inline-block' }}
          ref={c => {
            this.anchor = c;
          }}
        >
          {anchor}
        </div>
        {isOpen && (
          <ErrorFlyout
            anchor={this.anchor}
            idealDirection={idealDirection}
            message={message}
            onDismiss={onDismiss}
            positionRelativeToAnchor={positionRelativeToAnchor}
            size={size}
          />
        )}
      </Box>
    );
  }
}
