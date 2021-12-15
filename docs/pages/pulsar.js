// @flow strict
import type { Node } from 'react';
import PropTable from '../components/PropTable.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Page from '../components/Page.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Pulsar">
      <PageHeader
        name="Pulsar"
        description={generatedDocGen?.description}
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
      />
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
      />
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
      </MainSection>
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
      />
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
      />
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Pulsar' }) },
  };
}
