// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import disabled from '../../examples/tag/disabled.js';
import dismissable from '../../examples/tag/dismissable.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import error from '../../examples/tag/error.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import main from '../../examples/tag/main.js';
import MainSection from '../../docs-components/MainSection.js';
import maxWidth from '../../examples/tag/maxWidth.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import warning from '../../examples/tag/warning.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen.description}>
        <SandpackExample code={main} name="Tag Main Example" hideEditor />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - In conjunction with [TextField](/web/textfield#tagsExample), [TextArea](/web/textarea#tagsExample), and [ComboBox](/web/combobox#Tags), or as a standalone element to display selected options.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - As a replacement for the [Badge](/web/badge), as Badge is a singular element that gives context to a specific subject.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
        If not disabled, Tags are dismissable by the "X" affordance, which triggers the \`onRemove\` callback. If your app uses [DefaultLabelProvider](/web/utilities/defaultlabelprovider), a default value for this label will be used. This can be overridden with a more specific label if desired.
        `}
          title="Dismissable"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={dismissable} name="Dismissable variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
        When disabled, Tags are visible but cannot be removed.

        If this condition is constant (not determined dynamically), \`onRemove\` can use a no-op (e.g. \`() => {}\`).
        `}
          title="Disabled"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={disabled} name="Disabled variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
        Use \`type="error"\` to communicate an error state to the user.
        `}
          title="Error"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={error} name="Error variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
        Use \`type="warning"\` to communicate a warning state to the user.
        `}
          title="Warning"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={warning} name="Warning variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
        Tag has a maximum width of 300px. Longer text will be truncated, but can be seen by hovering over the Tag.
        `}
          title="Max width"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={maxWidth} name="Max width variant" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Tag' }) },
  };
}
