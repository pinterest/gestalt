// @flow strict
import { type Node } from 'react';
import Example from '../../docs-components/Example.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';

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
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Calling attention to a specific element within a surface. Note: a Pulsar should be used in conjunction with a [Popover](/web/popover).
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - In the case of a user error or warning that needs attention. Use [Callout](/web/callout) or form errors states instead.
          - When the focus of the attention is at the surface level. Use [Callout](/web/callout) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
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
              <Text color="inverse" weight="bold">
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
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Pulsar' }) },
  };
}
