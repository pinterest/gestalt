// @flow
import * as React from 'react';
import { List } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="List"
    description="List is a media agnostic presentation component to help manage sequential related items."
  />
);

card(
  <PropTable
    Component={List}
    props={[
      {
        name: 'items',
        type: `Array<{| children: React.Node, onClick: ({ event: SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement> }) => void |}>`,
        required: true,
      },
    ]}
  />
);

card(
  <Example
    name="Example"
    description="List is helpful when rendering a group of related items each with their own actions.
    Consider the following example where we render different actions a user can take."
    defaultCode={`
class ListExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleClick = this._handleClick.bind(this);
    this.handleDismiss = this._handleDismiss.bind(this);
    this.anchorRef = React.createRef();
  }
  _handleClick() {
    this.setState((prevState) => ({ open: !prevState.open }));
  }
  _handleDismiss() {
    this.setState(() => ({ open: false }));
  }
  render() {
    return (
      <Box>
        <Box ref={this.buttonRef}>
          <IconButton
            accessibilityLabel="More options"
            icon="ellipsis"
            onClick={this.handleClick}
          />
        </Box>
        {this.state.open && (
          <Flyout
            anchor={this.anchorRef.current}
            idealDirection="down"
            onDismiss={this.handleDismiss}
            size="md"
          >
            <List
              items={[
                {
                  children: 'Delete',
                  onClick: () => {},
                },
                {
                  children: 'Duplicate',
                  onClick: () => {},
                },
                {
                  children: 'Rename',
                  onClick: () => {},
                },
              ]}
            />
          </Flyout>
        )}
      </Box>
    );
  }
}
`}
  />
);

card(
  <Example
    name="Advanced use"
    description="List items can also reach beyond plain text. For special cases, consider passing your
    own special renderable items to the List item prop."
    defaultCode={`
class ListExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleClick = this._handleClick.bind(this);
    this.handleDismiss = this._handleDismiss.bind(this);
    this.anchorRef = React.createRef();
  }
  _handleClick() {
    this.setState((prevState) => ({ open: !prevState.open }));
  }
  _handleDismiss() {
    this.setState(() => ({ open: false }));
  }
  render() {
    return (
      <Box>
        <Box ref={this.buttonRef}>
          <IconButton
            accessibilityLabel="Invite user"
            icon="add"
            onClick={this.handleClick}
          />
        </Box>
        {this.state.open && (
          <Flyout
            anchor={this.anchorRef.current}
            idealDirection="down"
            onDismiss={this.handleDismiss}
            size="md"
          >
            <List
              items={[
                {
                  children: (
                    <Box alignItems="center" display="flex" marginStart={-1} marginEnd={-1}>
                      <Box paddingX={1}>
                        <Avatar name="chrislloyd" size="md" />
                      </Box>
                      <Box paddingX={1}>
                        <Text bold>Chris Lloyd</Text>
                        <Text>joined 3 years ago</Text>
                      </Box>
                    </Box>
                  ),
                  onClick: () => {},
                },
                {
                  children: (
                    <Box alignItems="center" display="flex" marginStart={-1} marginEnd={-1}>
                      <Box paddingX={1}>
                        <Avatar name="peterfarejowicz" size="md" />
                      </Box>
                      <Box paddingX={1}>
                        <Text bold>Peter Farejowicz</Text>
                        <Text>joined 2 years ago</Text>
                      </Box>
                    </Box>
                  ),
                  onClick: () => {},
                },
                {
                  children: (
                    <Box alignItems="center" display="flex" marginStart={-1} marginEnd={-1}>
                      <Box paddingX={1}>
                        <Avatar name="bensilbermann" size="md" />
                      </Box>
                      <Box paddingX={1}>
                        <Text bold>Ben Silbermann</Text>
                        <Text>joined a long time ago</Text>
                      </Box>
                    </Box>
                  ),
                  onClick: () => {},
                },
              ]}
            />
          </Flyout>
        )}
      </Box>
    );
  }
}
`}
  />
);

export default cards;
