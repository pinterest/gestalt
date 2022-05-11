// @flow strict
import { type Node } from 'react';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../components/docgen.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import QualityChecklist from '../components/QualityChecklist.js';

import AccessibilitySection from '../components/AccessibilitySection.js';

export default function BadgePage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Badge">
      <PageHeader
        name="Badge"
        description={generatedDocGen?.description}
        defaultCode={`
      <Text>Update your pronouns in your profile settings <Badge text="New" /></Text>
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
          - Labeling and bringing awareness to a specific element or feature (e.g., something is new or required).
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Providing feedback at the element level (e.g., displaying error messages). Use inline text instead.
          - Requiring interaction from users since Badges are always static and non-interactive.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Align the badge to the top of large accompanying text (anything larger than 16px). Center align for standard size text."
            defaultCode={`
              <Flex direction="column" gap={4}>
                <Text size="600">Ads & Campaigns <Badge text="Beta" position="top"/></Text>
                <Text size="300">Ads & Campaigns <Badge text="Beta"/></Text>
              </Flex>
              `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use colored badges over media. Instead use the dark or light wash."
            defaultCode={`
            <Mask height={150} width={280} rounding={2}>
              <Image alt="Botanical art in coral and green" fit="cover" src="https://i.ibb.co/cbjgZft/img-door.jpg" naturalWidth={1} naturalHeight={1}/>
              <Box position="absolute" top>
                <Box padding={4}>
                  <Badge text="Active" type="success"/>
                </Box>
              </Box>
            </Mask>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use established color patterns so users can quickly scan and identify sentiment. However, the badge text should always clearly indicate the sentiment, so color is not the sole indicator of information."
            defaultCode={`
            <Table accessibilityLabel="Badge color patterns">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Text weight="bold">Post title</Text>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Text weight="bold">Status</Text>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Text>Handmade ceramics</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge text="Posted" type="success"/>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text>Lunch ideas</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge text="Cancelled" type="error"/>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text>Tattoo inspo</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge text="Archived" type="neutral"/>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use complex or verbose language. Instead use a single, scannable word. For example: 'New'."
            defaultCode={`
            <Text size="300">7 wardrobe trends <Badge text="Fresh off the press"/></Text>

`}
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description={`
        The badge text is read out by assistive technologies like screen readers so all users can access the meaning of the badge in context. Text should demonstrate the sentiment clearly enough to be understood immediately without relying on color alone.
        `}
      />

      <MainSection
        name="Localization"
        description={`Be sure to localize the \`text\` prop. Note that localization can lengthen text by 20 to 30 percent. `}
      />
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Type"
          description={`
          Badge is available in five styles. Each \`type\` represents a messaging sentiment.

          1. **Info (default)**
          Communicates helpful information or an important attribute. For example, 'New' or 'Help'.

          2. **Success**
          Indicates a constructive or successful state. For example, 'Available', 'Completed', 'Approved' or 'Added'.

          3. **Warning**
          Communicates cautionary or time-sensitive information to the user. For example, 'Busy', 'Missing' or 'Warning'.

          4. **Error**
          Informs the user of problems or errors that require potential action to correct. For example, 'Deleted' or 'Cancelled'.

          5. **Neutral**
          Indicates a general, non-critical status update. For example, 'Unavailable' or 'Not started'.
 `}
        >
          <MainSection.Card
            defaultCode={`
  <Table accessibilityLabel="Type examples">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Text weight="bold">Type</Text>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Text weight="bold">Example</Text>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Text>Info</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="300">Ads & Campaigns <Badge text="New" type="info"/></Text>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Text>Success</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="300">Ads & Campaigns <Badge text="Completed" type="success"/></Text>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Text>Warning</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="300">Ads & Campaigns <Badge text="Needs attention" type="warning"/></Text>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Text>Error</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="300">Ads & Campaigns <Badge text="Failed" type="error"/></Text>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Text>Neutral</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="300">Ads & Campaigns <Badge text="Not started" type="neutral"/></Text>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Over media"
          description={`
          Badge may be used over media using two wash styles.

          1. **Over media - Light wash**
          The light wash badge should be used over media that is dark or utilizes a dark gradient overlay.

          2. **Over media - Dark wash**
          The dark wash badge should be used over media that is light or utilizes a light gradient overlay.
`}
        >
          <MainSection.Card
            defaultCode={`
<Flex gap={4}>
  <Mask height={150} width={280} rounding={2}>
    <Image alt="Botanical art in coral and green" fit="cover" src="https://i.ibb.co/cbjgZft/img-door.jpg" naturalWidth={1} naturalHeight={1}>
      <Box padding={4}>
        <Badge text="Light wash" type="lightWash"/>
      </Box>
    </Image>

  </Mask>
  <Mask height={150} width={280} rounding={2}>
    <Image alt="Botanical art in coral and green" fit="cover" src="https://i.ibb.co/7bQQYkX/stock2.jpg" naturalWidth={1} naturalHeight={1}>
      <Box padding={4}>
        <Badge text="Dark wash" type="darkWash"/>
      </Box>
    </Image>
  </Mask>
</Flex>
          `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Positioning"
          description="By default, Badge is rendered inline within the parent element. However, the `position` prop can be used to adjust the alignment. Badges should align to the top of large accompanying text."
        >
          <MainSection.Card
            defaultCode={`
<Flex gap={4} direction="column">
  <Text size="300">Ads & Campaigns <Badge text="New" /></Text>
  <Text size="600">Ads & Campaigns <Badge text="Beta" position="top"/></Text>
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Within other components"
          description="Components like [Module](/module) and [Dropdown](/dropdown) have Badges built into the component through props, so it will not be necessary to add the component yourself."
        >
          <MainSection.Card
            defaultCode={`
function ModuleExample() {
  return (
    <Box column={12} maxWidth={800} padding={2}>
      <Module
        badge={{ text: 'Beta' }}
        id="ModuleExample - badge"
        title="Title"
        >
        <Text size="200">This is example content.</Text>
      </Module>
    </Box>
  );
}
          `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Use a single word to describe the status of an element. For example, “New” not “New post.”
- Where applicable, describe the status in past tense. For example, “Archived” not “Archive.”
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Use conflicting language with defined type sentiments. For example, the error badge should not say “Complete.”
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
        **[Status](/status)**
        Status is a graphic indicator of an element’s state.

        **[Tooltip](/tooltip)**
        Tooltip is a floating text label that succinctly describes the function of an interactive element.       `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Badge' }) },
  };
}
