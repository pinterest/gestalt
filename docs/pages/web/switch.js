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
import doDisabled from '../../examples/switch/doDisabled.js';
import doLabel from '../../examples/switch/doLabel.js';
import dontAlternative from '../../examples/switch/dontAlternative.js';
import dontTruncate from '../../examples/switch/dontTruncate.js';
import main from '../../examples/switch/main.js';
import variantCombinations from '../../examples/switch/variantCombinations.js';
import variantLabel from '../../examples/switch/variantLabel.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={main} name="Primary Switch example" hideEditor previewHeight={150} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - For a binary option that can be either active or inactive.
          - Typically used on mobile, where toggling the Switch takes immediate effect.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Choosing between related options. Each Switch should be considered a solitary, standalone option. For multiple, related choices, use [Checkboxes](/web/checkbox) or [RadioGroup](/web/radiogroup) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use a label to give Switch context when possible."
            sandpackExample={<SandpackExample code={doLabel} name="Do - label" hideEditor />}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Truncate label text. Instead, allow it to wrap to form another line."
            sandpackExample={
              <SandpackExample
                code={dontTruncate}
                name="Don't - Truncate"
                hideControls
                hideEditor
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Communicate why a switch is disabled and how to enable it if possible."
            sandpackExample={<SandpackExample code={doDisabled} name="Do - Disabled" hideEditor />}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use alternative styling to represent the functionality of a switch. Use Switch instead."
            sandpackExample={
              <SandpackExample
                code={dontAlternative}
                name="Don't - Alternative"
                hideControls
                hideEditor
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        name={generatedDocGen.displayName}
        description={`Switches should have [Labels](https://github.com/Label) that can be read by screen readers, and that can be clicked or tapped to make it easier for users to select and deselect. Make sure Label has an \`htmlFor\` prop that matches the \`id\` on the Switch. Test that the Switch and Label are properly connected by clicking or tapping on the label and confirming that it activates the Switch next to it.`}
      >
        <MainSection.Subsection
          title="Keyboard navigation"
          columns={2}
          description={`
    Switch has conventional keyboard support.
    - Users relying on the keyboard expect to move focus to the Switch by using the tab key or shift+tab when moving backwards.
    - Setting \`disabled\` will prevent Switch from receiving keyboard focus or input.
    - Once focused, the Space key toggles the Switch.
`}
        />
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`Be sure to localize \`label\` and \`subtext\`. Be mindful of label length so that it doesn’t truncate in languages with lengthier character counts.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="With a label"
          description={`
        Whenever using Switch, always use a [Label](/web/label) with it to make your component accessible.`}
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={variantLabel} name="Variant - With a label" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Disabled and switched combinations">
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantCombinations}
                name="Variant - Disabled and switched combinations"
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Be clear and brief with Switch labels so they can be easily understood.
- When possible, use verbs to clarify the action. Something like “set…” or “show…”.
- If possible, be clear whether the setting is activated or deactivated.
- Use sentence case for labels.
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Use vague language out of context, like “turn on” or “turn off” repeating the state of the switch is redundant and can clutter the interface.
- Don’t use “you,” “your,” or “my” to describe an action. Instead describe switches objectively.
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[RadioGroup](/web/radiogroup)**
      Use when presenting a user with a list of choices for which there can only be one selection.
`}
        />
        <MainSection.Subsection
          description={`
      **[Checkbox](/web/checkbox)**
      Used when presenting a user with a list of choices for which there can be multiple selections.
`}
        />
        <MainSection.Subsection
          description={`
      **[Fieldset](/web/fieldset)**
      Used to group a list of related Switches with a legend that describes the list.
    `}
        />
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Switch') },
  };
}
