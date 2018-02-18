// @flow
import React, { Component } from 'react';
import { ns, card, md, PropTable } from '../../.corkboard/src/cards';
import Pulsar from './Pulsar';
import Box from '../Box/Box';
import Button from '../Button/Button';

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

type State = {
  isPulsing: boolean,
};

class PulsarEx extends Component<{}, State> {
  state: State = {
    isPulsing: true,
  };

  render() {
    const text = this.state.isPulsing ? 'Click to pause' : 'Click to show';
    return (
      <Box display="flex">
        <Box>
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

card(
  'Usage',
  md`
    Pulsars can be shown and hidden using the \`paused\` prop.

    ~~~jsx
    <Pulsar paused={!this.state.isPulsing} />
    ~~~
  `,
  <PulsarEx />
);
