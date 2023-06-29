// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import Example from '../../docs-components/Example.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

export default function ActivationCardPage({
  generatedDocGen,
}: {|
  generatedDocGen: DocGen,
|}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        defaultCode={`
<ActivationCard
  dismissButton={{
    accessibilityLabel: 'Dismiss card',
    onDismiss: ()=>{},
  }}
  link={{
    href: "https://pinterest.com",
    label:"Learn more",
    accessibilityLabel: "Learn more: website claim status"
  }}
  message="We will notify you via email as soon as your site has been successfully claimed."
  status="pending"
  statusMessage="Pending"
  title="Claim your website"
/>
  `}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Use in groups to describe the user's stage in a sequential path toward an overall action.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - As a single element communicating updates to the state or status of the surface. Use [Callout](/web/callout) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <Example
        name="Not started and Pending Cards"
        defaultCode={`
<Flex gap={{ column: 0, row: 2 }}>
  <ActivationCard
    dismissButton={{
      accessibilityLabel: 'Dismiss card',
      onDismiss: () => {},
    }}
    link={{
      href: "https://pinterest.com",
      label:"Claim your website now",
      accessibilityLabel: ""
    }}
    message="Grow distribution and track Pins linked to your website"
    status="notStarted"
    statusMessage="Not started"
    title="Claim your website"
  />
  <ActivationCard
    dismissButton={{
      accessibilityLabel: 'Dismiss card',
      onDismiss: ()=>{},
    }}
    link={{
      href: "https://pinterest.com",
      label:"Learn more",
      accessibilityLabel: "Learn more: website claim status"
    }}
    message="We will notify you via email as soon as your site has been successfully claimed."
    status="pending"
    statusMessage="Pending"
    title="Claim your website"
  />
</Flex>
  `}
      />
      <Example
        name="Needs attention and Complete Cards"
        defaultCode={`
<Flex gap={{ column: 0, row: 2 }}>
  <ActivationCard
    dismissButton={{
      accessibilityLabel: 'Dismiss card',
      onDismiss: () => {},
    }}
    link={{
      accessibilityLabel: "Learn more about tag health",
      href: "https://pinterest.com",
      label: "Learn more"
    }}
    message="Oops! Your tag must be healthy to continue."
    status="needsAttention"
    statusMessage="Needs attention"
    title="Tag is unhealthy"
  />
  <ActivationCard
    message="Tag is installed and healthy"
    status="complete"
    statusMessage="Completed"
    title="Nice work"
  />
</Flex>
  `}
      />

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers)**
GlobalEventsHandlerProvider allows external link navigation control across all children components with link behavior.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('ActivationCard') },
  };
}
