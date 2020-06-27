// @flow strict
import React from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Pulsar"
    description="Pulsars bring focus to a specific element on the screen and act like training wheels
to guide people towards the normal way to perform that action. They are used in isolation
or combination with other education components for more instructions."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'paused',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'size',
        type: `number`,
        description: `Use numbers for pixel sizes`,
        defaultValue: 120,
      },
    ]}
  />
);

card(
  <Example
    description={`
    Pulsars can be shown and hidden using the \`paused\` prop.
  `}
    name="Example"
    defaultCode={`
  function PulsarExample() {
    const [isPulsing, setIsPulsing] = React.useState(true);

    const text = isPulsing ? 'Click to pause' : 'Click to show';

    return (
      <Box display="flex" direction="column">
        <Box marginBottom={4}>
          <Button
            text={text}
            onClick={() => setIsPulsing(!isPulsing)}
            inline
            size="md"
          />
        </Box>
        <Pulsar paused={!isPulsing} />
      </Box>
    );
  }
`}
  />
);

card(
  <Example
    description="

  "
    name="Example"
    defaultCode={`
class FlyoutExample extends React.Component {
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
      <Box marginTop={10}>
        <Box display="inlineBlock" ref={this.anchorRef}>
          <div style={{
            position: "absolute",
            top: 10,
            left: 10,
            pointerEvents: "none", }}>
            <TapArea onTap={({ event }) => this.handleClick(event)} rounding="circle" fullWidth={false}>
              <Pulsar paused={this.state.open} />
            </TapArea>
          </div>
          <Button
            accessibilityExpanded={!!this.state.open}
            accessibilityHaspopup
            onClick={this.handleClick}
            text={this.state.open ? 'Hide Flyout' : 'Show Flyout'}
          />
        </Box>
        {this.state.open && (
          <Flyout
            anchor={this.anchorRef.current}
            color="darkGray"
            idealDirection="right"
            onDismiss={this.handleDismiss}
            shouldFocus={false}
          >
            <Box column={12} padding={3}>
              <Text color="white" weight="bold">
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
