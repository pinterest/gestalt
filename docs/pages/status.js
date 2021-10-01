// @flow strict
import { type Node } from 'react';
import docgen, { type DocGen } from '../components/docgen.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';

export default function SearchFieldPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Status">
      <PageHeader
        name="Status"
        description="Status is an indicator with an icon that provides information to a user."
        defaultCode={`
<Flex>
  <Status type='ok' title="OK" subtext="Updated 2 days ago" />
</Flex>
`}
        badge="pilot"
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to Use"
            description={`
          - To describe the status of an individual element, such an an item in a list or a row in a table.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
          - To describe surface-level errors. Use [Callout](/callout) instead.
          - To describe whether a numeric value is going up or down. Use [Datapoint](/datapoint) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        name="Accessibility"
        description="Icons are a great way to help users who have difficulties with reading, focus attention, and low vision impairments. For such use cases, Status can be used without accompanying `title` text."
      >
        <MainSection.Subsection
          title="ARIA attributes"
          columns={2}
          description={`
If Status appears without \`title\` text, \`accessibilityLabel\` should be used to provide a text description for screen readers to announce and communicate the represented icon, as shown in the first example.

Avoid using the generic words like  "image" or "icon"; instead, use verbs that describe the meaning of the icon, for example: "there is a problem with this item".

If using \`title\` to describe what the icon represents, \`accessibilityLabel\` does not need to be provided, as shown in the second example.
`}
        >
          <MainSection.Card
            cardSize="md"
            defaultCode={`
<Flex gap={1}>
  <Status accessibilityLabel="This item has a problem" type="problem" />
  <Text weight="bold" size="lg">Dynamic retargeting</Text>
</Flex>`}
          />
          <MainSection.Card
            cardSize="md"
            defaultCode={`
<Flex alignItems="end" direction="column" gap={1}>
  <Status title="This item has a problem" type="problem" />
  <Text align="center" weight="bold">
    Dynamic retargeting
  </Text>
</Flex>`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        name="Localization"
        description={`Be sure to localize the \`title\` and \`subtext\` props. Note that localization can lengthen text by 20 to 30 percent.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection title="Text additions">
          <MainSection.Card
            cardSize="md"
            title="Status name"
            defaultCode={`
<Flex direction="column" gap={4}>
  <Status type='unstarted' title='Unstarted' />
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
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen('Status') },
  };
}
