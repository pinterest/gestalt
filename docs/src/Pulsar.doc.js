// @flow
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
to guide People towards the normal way to perform that action. They are used in isolation
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
class PulsarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPulsing: true
    };
  }

  render() {
    const text = this.state.isPulsing ? 'Click to pause' : 'Click to show';
    return (
      <Box display="flex" direction="column">
        <Box marginBottom={4}>
          <Button
            text={text}
            onClick={() => this.setState({ isPulsing: !this.state.isPulsing })}
            inline
            size="md"
          />
        </Box>
        <Pulsar paused={!this.state.isPulsing} />
      </Box>
    );
  }
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
class TooltipExample extends React.Component {
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
            <Touchable onTouch={({ event }) => this.handleClick(event)} shape="circle" fullWidth={false}>
              <Pulsar paused={this.state.open} />
            </Touchable>
          </div>
          <Button
            accessibilityExpanded={!!this.state.open}
            accessibilityHaspopup
            onClick={this.handleClick}
            text={this.state.open ? 'Hide Tooltip' : 'Show Tooltip'}
          />
        </Box>
        {this.state.open && (
          <Tooltip
            anchor={this.anchorRef.current}
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
  />
);

export default cards;
