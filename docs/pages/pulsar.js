// @flow strict
import type { Node } from 'react';
import PropTable from '../components/PropTable.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import CardPage from '../components/CardPage.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Pulsar"
    description="Pulsars bring focus to a specific element on the screen and act like training wheels
to guide people towards the normal way to perform that action. They are used in isolation
or combination with other education components for more instructions."
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
            size="md"
          />
        </Box>
        <Pulsar paused={!isPulsing} />
      </Box>
    );
  }
`}
  />,
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
        defaultValue: 136,
      },
    ]}
  />,
);

card(
  <MainSection name="Usage guidelines">
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        title="When to Use"
        description={`
          - Calling attention to a specific element within a surface. Note: a Pulsar should be used in conjunction with a [Popover](/popover).
        `}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        title="When Not to Use"
        description={`
          - In the case of a user error or warning that needs attention. Use [Callout](/callout) or form errors states instead.
          - When the focus of the attention is at the surface level. Use [Callout](/callout) instead.
        `}
      />
    </MainSection.Subsection>
  </MainSection>,
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
            size="md"
          />
        </Box>
        <Pulsar paused={!isPulsing} />
      </Box>
    );
  }
`}
  />,
);

card(
  <Example
    description="

  "
    name="Example: Popover"
    defaultCode={`
class PopoverExample extends React.Component {
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
              <Pulsar paused={this.state.open} />
          </div>
          <Button
            accessibilityExpanded={!!this.state.open}
            accessibilityHaspopup
            onClick={this.handleClick}
            text={this.state.open ? 'Hide Popover' : 'Show Popover'}
          />
        </Box>
        {this.state.open && (
          <Popover
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
          </Popover>
        )}
      </Box>
    );
  }
}
`}
  />,
);

export default function PulsarPage(): Node {
  return <CardPage cards={cards} page="Pulsar" />;
}
