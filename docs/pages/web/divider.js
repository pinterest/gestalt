// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import dontCreateYourOwn from '../../examples/divider/dontCreateYourOwn';
import dontInset from '../../examples/divider/dontInset';
import dontOveruse from '../../examples/divider/dontOveruse';
import dontUseForDecoration from '../../examples/divider/dontUseForDecoration';
import mainExample from '../../examples/divider/mainExample';
import orientationExample1 from '../../examples/divider/orientationExample1';
import orientationExample2 from '../../examples/divider/orientationExample2';
import useDefaultGestalt from '../../examples/divider/useDefaultGestalt';
import useFromEdgeToEdge from '../../examples/divider/useFromEdgeToEdge';
import useToSeparateCollections from '../../examples/divider/useToSeparateCollections';
import useWhitespaceToSeparateGroups from '../../examples/divider/useWhitespaceToSeparateGroups';

export default function DividerPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample
          code={mainExample}
          hideEditor
          layout="column"
          name="Main Example"
          previewHeight={200}
        />
      </PageHeader>

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            description="Dividers should be used to bring clarity and structure to a layout. Primarily, Dividers help to separate groups of related elements or break up dense content."
            title="When to use"
            type="do"
          />
          <MainSection.Card
            description="Dividers shouldn't be used if elements can be separated using white space."
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use whitespace primarily to separate groups of related content."
            sandpackExample={
              <SandpackExample
                code={useWhitespaceToSeparateGroups}
                hideEditor
                layout="column"
                name="Use Whitespace To Separate Groups"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Overuse Dividers as this can cause them to lose their value and create unnecessary noise."
            sandpackExample={
              <SandpackExample
                code={dontOveruse}
                hideControls
                hideEditor
                layout="column"
                name="Don't Overuse, Avoid Noise"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use the default Gestalt Divider - 1px gray line."
            sandpackExample={
              <SandpackExample
                code={useDefaultGestalt}
                hideEditor
                layout="column"
                name="Use Default Gestalt"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Create your own divider with a different color or stroke style."
            sandpackExample={
              <SandpackExample
                code={dontCreateYourOwn}
                hideControls
                hideEditor
                layout="column"
                name="Don't Create Your Own With Different Style"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use horizontal Dividers from edge to edge."
            sandpackExample={
              <SandpackExample
                code={useFromEdgeToEdge}
                hideEditor
                layout="column"
                name="Use From Edge To Edge"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Inset Divider in a way that causes it to be free-floating or separated from content."
            sandpackExample={
              <SandpackExample
                code={dontInset}
                hideControls
                hideEditor
                layout="column"
                name="Don't Inset That Causes It Free Floating"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use Dividers to separate collections of content or create the appearance of containers."
            sandpackExample={
              <SandpackExample
                code={useToSeparateCollections}
                hideEditor
                layout="column"
                name="Use To Separate Collections Of Content"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use Dividers for decoration or to separate grouped content."
            sandpackExample={
              <SandpackExample
                code={dontUseForDecoration}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use For Decoration Or To Separate Grouped Content"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection
        description="Divider is not focusable and is treated as decorative. Screen readers on tab navigation don't announce Dividers but do announce them on left/right quick navigation."
        name={generatedDocGen?.displayName}
      />

      <LocalizationSection
        name={generatedDocGen?.displayName}
        noBaseText
        noDefaultLabelProvider
        notes={`If you are aligning Divider to content, ensure that it switches sides according to the content's start-end alignment.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          columns={2}
          description="You can use this component as a vertical divider between two elements. Placing it within a Flex layout with a direction of `row` will shift Divider to a vertical orientation."
          title="Orientation"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={orientationExample1}
                layout="column"
                name="Orientation Example 1"
              />
            }
            title="Horizontal"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={orientationExample2}
                layout="column"
                name="Orientation Example 2"
              />
            }
            title="Vertical"
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
  return {
    props: { generatedDocGen: await docGen('Divider') },
  };
}
