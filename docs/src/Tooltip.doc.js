// @flow
import React from 'react';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Tooltip"
    description="
WARNING: Tooltip will be deprecated in a future release of Gestalt. To properly migrate your use
of this component, follow the example below.
"
  />
);

card(
  <Example
    name="Migrating from Tooltip to Flyout"
    description={`
      To migrate from a Tooltip to a Flyout, simply set the background color to \`darkGray\`,
      set \`shouldFocus\` to \`false\`, and add the \`padding\` wrapper to your children. The rest
      will remain the same.`}
    direction="row"
    defaultCode={`
class TooltipMigrationExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleClick = this._handleClick.bind(this);
    this.handleDismiss = this._handleDismiss.bind(this);
    this.anchorRef = React.createRef();
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
        <Box display="inlineBlock" ref={this.anchorRef}>
          <Button
            onClick={this.handleClick}
            text={this.state.open ? 'Hide Flyout' : 'Show Flyout'}
          />
        </Box>
        {this.state.open && (
          <Flyout
            anchor={this.anchorRef.current}
            color="darkGray"
            onDismiss={this.handleDismiss}
            shouldFocus={false}
            size="md"
          >
            <Box column={12} padding={3}>
              <Text bold color="white" size="md">
                Create a board to save Pins about Kitchen Design for later
              </Text>
            </Box>
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
