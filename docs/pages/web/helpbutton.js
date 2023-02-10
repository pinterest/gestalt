// @flow strict
import { type Node } from 'react';
import Example from '../../docs-components/Example.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import MainSection from '../../docs-components/MainSection.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import main from '../../examples/helpbutton/main.js';
import endGuideElement from '../../examples/helpbutton/endGuideElement.js';
import intermixedBlocks from '../../examples/helpbutton/intermixedBlocks.js';
import withLink from '../../examples/helpbutton/withLink.js';

type DocsType = {|
  generatedDocGen: DocGen,
|};

export default function DocsPage({ generatedDocGen }: DocsType): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        defaultCode={`
<Flex height="100%" justifyContent="center" alignItems="center">
  <HelpButton
    text="Informational context that's displayed on click"
    accessibilityLabel="Popover context description"
  />
</Flex>
`}
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
      >
        <SandpackExample code={main} name="Main example" hideEditor />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- To offer simple, bite-sized assistive information about an element or section on the screen.
- To provide information or links to information that enhances a user's understanding of the feature.
        `}
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- To provide extensive information that is longer than a short sentence. Use [SlimBanner](/web/slimbanner) instead.
- To display recommendations for how to improve a user's experience. Use [SlimBanner](/web/slimbanner) instead.
- To display time-sensitive information to a user. Use [Callout](/web/callout) or [SlimBanner](/web/slimbanner) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <Example
            id="no-final-version-do"
            name="How to use"
            defaultCode={`
<Flex height="100%" justifyContent="center" alignItems="center" gap={1}>
  <Checkbox labelDisplay="hidden" label="Created pins checkbox" id="created-pins" onChange={() => {}} />
  <Text>Pins created in the last 30 days</Text>
  <HelpButton
    text="Date range must include at least 1 day in the last 30 days"
    accessibilityPopoverLabel="Date range must include at least 1 day in the last 30 days"
  />
</Flex>
`}
          />

          <Example
            id="no-final-version-dont"
            name="How to not use"
            defaultCode={`
<Text inline>
  See the total impact of your paid and organic content working together to increase page
  visits
  <HelpButton
    text="Number of times people visited your website after seeing your content on Pinterest"
    accessibilityPopoverLabel="Number of times people visited your website after seeing your content on Pinterest"
  />
  {' '}add-to-carts{' '}
  <HelpButton
    text="Number of times people added your products to their carts after interacting with your Pins"
    accessibilityPopoverLabel="Number of times people added your products to their carts after interacting with your Pins"
  />
  {' '}and checkouts
  <HelpButton
    text="Number of checkouts stemming from your Pins and ads"
    accessibilityPopoverLabel="Number of checkouts stemming from your Pins and ads"
  />
  .
</Text>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Place HelpButton to the end of the element you wish to add guidance to."
            sandpackExample={
              <SandpackExample code={endGuideElement} name="End of guide element" hideEditor />
            }
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Include HelpButton within blocks of content."
            sandpackExample={
              <SandpackExample
                code={intermixedBlocks}
                name="Intermixed guide element blocks"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Accessibility">
        <MainSection.Subsection description="Coming soon!" />
      </MainSection>

      <MainSection name="Localization">
        <MainSection.Subsection description="Be sure to localize `text`, `accessibilityLabel`, `link.text` and `link.accessibilityLabel` within HelpButton. Note that localization can lengthen text by 20 to 30 percent." />
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          title="With a link"
          description="HelpButton's popover content can contain a link to additional information. If needed, this interaction can be paired with [OnLinkNavigationProvider](/web/utilities/onlinknavigationprovider)."
        >
          <Example
            name="Link HelpButton example"
            defaultCode={`
<Flex height="100%" justifyContent="center" alignItems="center" gap={1}>
  <Text>This is Gestalt</Text>
  <HelpButton
    text="Is Pinterest's design system"
    accessibilityPopoverLabel="Gestalt meaning description"
    link={{
      href: 'https://gestalt.pinterest.systems/',
      text: 'Visit our portal',
      accessibilityLabel: 'Visit Gestalt portal',
    }}
  />
</Flex>
        `}
          />
          <MainSection.Card
            cardSize="md"
            sandpackExample={<SandpackExample code={withLink} name="Link component" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Tooltip](/web/tooltip)**
Tooltip describes the function of an interactive element, typically [IconButton](/web/iconbutton), on hover. However, adding links, buttons or any clickable element within Tooltip is not advisable due to accessibility concerns. Adding Tooltip to HelpButton is not necessary as it's already built in.

**[IconButton](/web/iconbutton)**
HelpButton is a more specific component than IconButton. IconButton is preferable for more general uses of interactive icons whereas HelpButton is the preferred solution for providing short-form guidance for an element.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: DocsType |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'HelpButton' }) },
  };
}
