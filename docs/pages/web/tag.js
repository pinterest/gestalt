// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import doDescribe from '../../examples/tag/doDescribe';
import doInput from '../../examples/tag/doInput';
import dontInput from '../../examples/tag/dontInput';
import dontInteractive from '../../examples/tag/dontInteractive';
import dontIntermix from '../../examples/tag/dontIntermix';
import doSuccinct from '../../examples/tag/doSuccinct';
import localizationLabels from '../../examples/tag/localizationLabels';
import main from '../../examples/tag/main';
import sizesExample from '../../examples/tag/sizes';
import variantDisabled from '../../examples/tag/variantDisabled';
import variantDismissable from '../../examples/tag/variantDismissable';
import variantError from '../../examples/tag/variantError';
import variantMaxWidth from '../../examples/tag/variantMaxWidth';
import variantWarning from '../../examples/tag/variantWarning';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Tag Main Example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - In conjunction with [TextField](/web/textfield#Tags), [TextArea](/web/textarea#With-tags), and [ComboBox](/web/combobox#Tags), or as a standalone element to display selected options.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - As a replacement for the [Badge](/web/badge), as Badge is a singular element that gives context to a specific subject.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best Practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use Tag to describe something that is related to more than one topic."
            sandpackExample={<SandpackExample code={doDescribe} hideEditor name="Do - Describe" />}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use Tag as an interactive element. Tag should not be clickable or perform an action — use [Button](/web/button) or [Link](/web/link) instead. Tag is only intended to describe a subject."
            sandpackExample={
              <SandpackExample
                code={dontInteractive}
                hideControls
                hideEditor
                name="Don't - Interactive"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Write succinct labels for Tag — ideally two or fewer words."
            sandpackExample={<SandpackExample code={doSuccinct} hideEditor name="Do - Succinct" />}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Intermix removable and unremovable Tags in a group. Group or separate Tags that are removable from those that are unremovable. This creates a clear pattern to the user for which Tags can be removed and which cannot."
            sandpackExample={
              <SandpackExample
                code={dontIntermix}
                hideControls
                hideEditor
                name="Don't - Intermix"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Insert Tags directly into [ComboBox](/web/combobox), [TextField](/web/textfield) or [TextArea](/web/textarea) when providing an affordance to add/edit topics or categories."
            sandpackExample={<SandpackExample code={doInput} hideEditor name="Do - Input" />}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Place Tags outside of the input used to add or edit Tags."
            sandpackExample={
              <SandpackExample code={dontInput} hideControls hideEditor name="Don't - Input" />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen?.displayName}
        notes={`Note that \`accessibilityRemoveIconLabel\` is optional as DefaultLabelProvider provides default strings. Use custom labels if they need to be more specific.`}
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
        <MainSection.Subsection
          description={`
        Tag is available in three sizes: small (24px), medium(32px), large(48px). Use the \`sm\` tag for denser surfaces.
        `}
          title="Size"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={sizesExample} name="Sizes variant" />}
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
    props: { generatedDocGen: await docGen('Tag') },
  };
}
