// @flow strict
import { type Node as ReactNode } from 'react';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import SandpackExample from '../../docs-components/SandpackExample';
import endGuideElement from '../../examples/helpbutton/endGuideElement';
import intermixedBlocks from '../../examples/helpbutton/intermixedBlocks';
import localizationLabels from '../../examples/helpbutton/localizationLabels';
import main from '../../examples/helpbutton/main';
import withLink from '../../examples/helpbutton/withLink';
import withText from '../../examples/helpbutton/withText';

type DocsType = {
  generatedDocGen: DocGen,
};

export default function DocsPage({ generatedDocGen }: DocsType): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Main example" previewHeight={200} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description={`
- To offer simple, bite-sized assistive information about an element or section on the screen.
- To provide information or links to information that enhances a user's understanding of the feature.
        `}
            title="When to use"
            type="do"
          />

          <MainSection.Card
            cardSize="sm"
            description={`
- To provide extensive information that is longer than a short sentence. Use [BannerSlim](/web/bannerslim) instead.
- To display recommendations for how to improve a user's experience. Use [BannerSlim](/web/bannerslim) instead.
- To display time-sensitive information to a user. Use [BannerCallout](/web/bannercallout) or [BannerSlim](/web/bannerslim) instead.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Place HelpButton to the end of the element you wish to add guidance to."
            sandpackExample={
              <SandpackExample code={endGuideElement} hideEditor name="End of guide element" />
            }
            type="do"
          />

          <MainSection.Card
            cardSize="sm"
            description="Include HelpButton within blocks of content."
            sandpackExample={
              <SandpackExample
                code={intermixedBlocks}
                hideControls
                hideEditor
                name="Intermixed guide element blocks"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Accessibility">
        <MainSection.Subsection
          description={`HelpButton's tooltip text is \`static\`, defined as \`Click to learn more\`. Use the required \`accessibilityLabel\` prop to give the user more details, using the format "Click to learn more about {the associated element}". \`accessibilityPopoverLabel\` should be similar, but using the format "Expanded information about {the associated element}".`}
        />
      </MainSection>

      <LocalizationSection code={localizationLabels} name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="HelpButton's popover content can contain a link to additional information. If needed, this interaction can be paired with [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers)."
          title="Link"
        >
          <MainSection.Card
            cardSize="sm"
            sandpackExample={<SandpackExample code={withLink} name="Link component" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="The `text` prop accepts either a string or [Text](/web/text). Use a string for simple text without any visual style. HelpButton will handle the message style and adherence to design guidelines. If a message with more complex style is required, such as bold text or inline links, use Text to wrap your message with any additional [Text](/web/text) or [Link](/web/link) components contained within."
          title="Text"
        >
          <MainSection.Card
            cardSize="sm"
            sandpackExample={<SandpackExample code={withText} name="Text component" />}
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

export async function getServerSideProps(): Promise<{ props: DocsType }> {
  return {
    props: { generatedDocGen: await docGen('HelpButton') },
  };
}
