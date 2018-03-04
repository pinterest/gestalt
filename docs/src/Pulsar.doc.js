// @flow
import React from 'react';
import { Pulsar, Button } from 'gestalt';
import { ns, card, md, PropTable, Example } from './cards';

ns(
  'Pulsar',
  `Pulsars bring focus to a specific element on the screen and act like training wheels
to guide People towards the normal way to perform that action. They are used in isolation
or combination with other education components for more instructions.`
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
        defaultValue: 96,
      },
    ]}
  />,
  { heading: false }
);

card(
  'Example',
  md`
    Pulsars can be shown and hidden using the \`paused\` prop.
  `,
  <Example
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
    scope={{ Button, Pulsar }}
  />,
  { stacked: true }
);
