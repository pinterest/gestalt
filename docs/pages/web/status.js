// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

export default function SearchFieldPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Status">
      <PageHeader
        name="Status"
        description={generatedDocGen?.description}
        defaultCode={`
<Flex>
  <Status type='ok' title="OK" subtext="Updated 2 days ago" />
</Flex>
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
          - To describe the status of an individual element, such an an item in a list or a row in a table.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - To describe surface-level errors. Use [Callout](/web/callout) instead.
          - To describe whether a numeric value is going up or down. Use [Datapoint](/web/datapoint) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use Status to communicate a step in a workflow or the state of an item."
            defaultCode={`
<Status type="ok" accessibilityLabel="This item is ok" />
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use SVGs or images that resemble the Status’ symbols to denote status."
            defaultCode={`
<Icon icon="workflow-status-problem" size="24" accessibilityLabel="This item has an error" />
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Place Status close to its subject to provide context and reference. It can be placed as an inline element or paired side by side as needed."
            defaultCode={`
<Flex gap={{ row: 1, column: 0 }} alignItems="center">
  <Status accessibilityLabel="This item is complete" type="ok" />
  <Text weight="bold" size="300">Campaign complete</Text>
</Flex>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Place Status far away from its subject. "
            defaultCode={`
<Flex gap={{ column: 12, row: 0 }} direction="column" alignItems="center">
  <Status accessibilityLabel="This item is paused" type="halted" />
  <Text weight="bold" size="300">Campaign paused</Text>
</Flex>

`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use `title` when the status it represents is unique, specific and critical for the user to know."
            defaultCode={`
<Status type="inProgress" title="Pending review" />
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Status' `subText` to display extraneous messaging."
            defaultCode={`
<Status type="problem" title="Error" subtext="Please try again" />
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description="Icons are a great way to help users who have difficulties with reading, focus attention, and low vision impairments. For such use cases, Status can be used without accompanying `title` text."
      >
        <MainSection.Subsection
          title="ARIA attributes"
          columns={2}
          description={`
If Status appears without \`title\` text, \`accessibilityLabel\` should be used to provide a text description for screen readers to announce and communicate the represented icon, as shown in the first example.

Avoid using the generic words like "image" or "icon"; instead, use verbs that describe the meaning of the icon, for example: "Upload in progress".

If using \`title\` to describe what the icon represents, \`accessibilityLabel\` does not need to be provided, as shown in the second example.
`}
        >
          <MainSection.Card
            cardSize="md"
            defaultCode={`
<Flex gap={{ column: 0, row: 1 }}>
  <Status accessibilityLabel="This item has a problem" type="problem" />
  <Text weight="bold" size="300">Dynamic re-targeting</Text>
</Flex>`}
          />
          <MainSection.Card
            cardSize="md"
            defaultCode={`
<Flex alignItems="end" direction="column" gap={{ column: 1, row: 0 }}>
  <Status title="This item has a problem" type="problem" />
  <Text align="center" weight="bold">
    Dynamic re-targeting
  </Text>
</Flex>`}
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`Be sure to localize the \`title\`, \`subtext\` and \`accessibilityLabel\` props. Note that localization can lengthen text by 20 to 30 percent.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection title="Text additions">
          <MainSection.Card
            cardSize="md"
            title="Status name"
            defaultCode={`
<Flex direction="column" gap={{ column: 4, row: 0 }}>
  <Status type='unstarted' title='Unstarted' />
  <Status type='queued' title='Queued' />
  <Status type='inProgress' title='In progress' />
  <Status type='halted' title='Halted' />
  <Status type='ok' title='OK' />
  <Status type='canceled' title='Canceled' />
  <Status type='warning' title='Warning' />
  <Status type='problem' title='Problem' />
</Flex>
`}
          />
          <MainSection.Card
            cardSize="md"
            title="Status subtext"
            defaultCode={`
<Status type='warning' title='Warning' subtext='Updated 2 days ago' />
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Icon](/web/icon)**
Icon should be used to display a symbol that does not represent the state or status of an item.

**[Badge](/web/badge)**
Use Badge to label or mark an item with a designation or category.

**[Callout](/web/callout)**
Use Callout to communicate page-level status, such as an error, and to provide actionable next steps.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Status') },
  };
}
