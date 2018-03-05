// @flow
import React from 'react';
import { Pulsar, Button } from 'gestalt';
import PropTable from './components/PropTable';
import Example from './components/Example';
import PageHeader from './components/PageHeader';
import CardPage from './components/CardPage';

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
        defaultValue: 96,
      },
    ]}
    heading={false}
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
    scope={{ Button, Pulsar }}
  />
);

export default () => <CardPage cards={cards} />;
