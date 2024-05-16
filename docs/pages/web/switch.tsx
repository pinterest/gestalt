import {ReactNode} from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import doDisabled from '../../examples/switch/doDisabled';
import doLabel from '../../examples/switch/doLabel';
import dontAlternative from '../../examples/switch/dontAlternative';
import dontTruncate from '../../examples/switch/dontTruncate';
import main from '../../examples/switch/main';
import variantCombinations from '../../examples/switch/variantCombinations';
import variantLabel from '../../examples/switch/variantLabel';

export default function DocsPage(
  {
    generatedDocGen,
  }: {
    generatedDocGen: DocGen
  },
) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Primary Switch example" previewHeight={150} />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - For a binary option that can be either active or inactive.
          - Typically used on mobile, where toggling the Switch takes immediate effect.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - Choosing between related options. Each Switch should be considered a solitary, standalone option. For multiple, related choices, use [Checkboxes](/web/checkbox) or [RadioGroup](/web/radiogroup) instead.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use a label to give Switch context when possible."
            sandpackExample={<SandpackExample code={doLabel} hideEditor name="Do - label" />}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Truncate label text. Instead, allow it to wrap to form another line."
            sandpackExample={
              <SandpackExample
                code={dontTruncate}
                hideControls
                hideEditor
                name="Don't - Truncate"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Communicate why a switch is disabled and how to enable it if possible."
            sandpackExample={<SandpackExample code={doDisabled} hideEditor name="Do - Disabled" />}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use alternative styling to represent the functionality of a switch. Use Switch instead."
            sandpackExample={
              <SandpackExample
                code={dontAlternative}
                hideControls
                hideEditor
                name="Don't - Alternative"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection
        description={`Switches should have [Labels](https://github.com/Label) that can be read by screen readers, and that can be clicked or tapped to make it easier for users to select and deselect. Make sure Label has an \`htmlFor\` prop that matches the \`id\` on the Switch. Test that the Switch and Label are properly connected by clicking or tapping on the label and confirming that it activates the Switch next to it.`}
        name={generatedDocGen.displayName}
      >
        <MainSection.Subsection
          columns={2}
          description={`
    Switch has conventional keyboard support.
    - Users relying on the keyboard expect to move focus to the Switch by using the tab key or shift+tab when moving backwards.
    - Setting \`disabled\` will prevent Switch from receiving keyboard focus or input.
    - Once focused, the Space key toggles the Switch.
`}
          title="Keyboard navigation"
        />
      </AccessibilitySection>

      <LocalizationSection
        name={generatedDocGen?.displayName}
        noDefaultLabelProvider
        notes={`Be sure to localize \`label\` and \`subtext\`. Be mindful of label length so that it doesn’t truncate in languages with lengthier character counts.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
        Whenever using Switch, always use a [Label](/web/label) with it to make your component accessible.`}
          title="With a label"
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
                layout="column"
                name="Variant - Disabled and switched combinations"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Be clear and brief with Switch labels so they can be easily understood.
- When possible, use verbs to clarify the action. Something like “set…” or “show…”.
- If possible, be clear whether the setting is activated or deactivated.
- Use sentence case for labels.
`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Use vague language out of context, like “turn on” or “turn off” repeating the state of the switch is redundant and can clutter the interface.
- Don’t use “you,” “your,” or “my” to describe an action. Instead describe switches objectively.
`}
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

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
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen
  }
}> {
  return {
    props: { generatedDocGen: await docGen('Switch') },
  };
}
