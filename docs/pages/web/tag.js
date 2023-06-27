// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import doDescribe from '../../examples/tag/doDescribe.js';
import doInput from '../../examples/tag/doInput.js';
import dontInput from '../../examples/tag/dontInput.js';
import dontInteractive from '../../examples/tag/dontInteractive.js';
import dontIntermix from '../../examples/tag/dontIntermix.js';
import doSuccinct from '../../examples/tag/doSuccinct.js';
import main from '../../examples/tag/main.js';
import variantDisabled from '../../examples/tag/variantDisabled.js';
import variantDismissable from '../../examples/tag/variantDismissable.js';
import variantError from '../../examples/tag/variantError.js';
import variantMaxWidth from '../../examples/tag/variantMaxWidth.js';
import variantWarning from '../../examples/tag/variantWarning.js';

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
          - In conjunction with [TextField](/web/textfield#Tags), [TextArea](/web/textarea#With-tags), and [ComboBox](/web/combobox#Tags), or as a standalone element to display selected options.
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

      <MainSection name="Best Practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use Tag to describe something that is related to more than one topic."
            sandpackExample={<SandpackExample code={doDescribe} hideEditor name="Do - Describe" />}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Tag as an interactive element. Tag should not be clickable or perform an action — use [Button](/web/button) or [Link](/web/link) instead. Tag is only intended to describe a subject."
            sandpackExample={
              <SandpackExample
                code={dontInteractive}
                hideControls
                hideEditor
                name="Don't - Interactive"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Write succinct labels for Tag — ideally two or fewer words."
            sandpackExample={<SandpackExample code={doSuccinct} hideEditor name="Do - Succinct" />}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Intermix removable and unremovable Tags in a group. Group or separate Tags that are removable from those that are unremovable. This creates a clear pattern to the user for which Tags can be removed and which cannot."
            sandpackExample={
              <SandpackExample
                code={dontIntermix}
                hideControls
                hideEditor
                name="Don't - Intermix"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Insert Tags directly into [ComboBox](/web/combobox), [TextField](/web/textfield) or [TextArea](/web/textarea) when providing an affordance to add/edit topics or categories."
            sandpackExample={<SandpackExample code={doInput} hideEditor name="Do - Input" />}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Place Tags outside of the input used to add or edit Tags."
            sandpackExample={
              <SandpackExample code={dontInput} hideControls hideEditor name="Don't - Input" />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection
        name="Localization"
        description={`Be sure to localize \`text\` and \`accessibilityRemoveIconLabel\`. Be mindful of label length so that it doesn’t truncate in languages with lengthier character counts.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
        If not disabled, Tags are dismissable by the "X" affordance, which triggers the \`onRemove\` callback. If your app uses [DefaultLabelProvider](/web/utilities/defaultlabelprovider), a default value for this label will be used. This can be overridden with a more specific label if desired.
        `}
          title="Dismissable"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={variantDismissable} name="Dismissable variant" />
            }
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
            sandpackExample={<SandpackExample code={variantDisabled} name="Disabled variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
        Use \`type="error"\` to communicate an error state to the user.
        `}
          title="Error"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={variantError} name="Error variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
        Use \`type="warning"\` to communicate a warning state to the user.
        `}
          title="Warning"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={variantWarning} name="Warning variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
        Tag has a maximum width of 300px. Longer text will be truncated, but can be seen by hovering over the Tag.
        `}
          title="Max width"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={variantMaxWidth} name="Max width variant" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Tag') },
  };
}
