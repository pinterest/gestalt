// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import disabled from '../../examples/tag/disabled.js';
import dismissable from '../../examples/tag/dismissable.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import error from '../../examples/tag/error.js';
import main from '../../examples/tag/main.js';
import MainSection from '../../docs-components/MainSection.js';
import maxWidth from '../../examples/tag/maxWidth.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import PropTable from '../../docs-components/PropTable.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen.description}>
        <SandpackExample code={main} name="Tag Main Example" hideEditor />
      </PageHeader>

      <PropTable
        componentName={generatedDocGen?.displayName}
        props={[
          {
            name: 'disabled',
            type: 'boolean',
            defaultValue: false,
            description:
              'Set a disabled state so the tag looks inactive and cannot be interacted with.',
          },
          {
            name: 'errorMessage',
            type: 'string',
            description:
              "Set an error state on the tag. The message is used as an accessibility label for the error icon. Keep it short so it doesn't overwhelm the user.",
          },
          {
            name: 'onRemove',
            type: '({| event: SyntheticMouseEvent<> |}) => void',
            description:
              'Callback fired when the tag is removed. Should handle state updates to stop rendering the component. Required unless the tag is in a disabled state.',
          },
          {
            name: 'removeIconAccessibilityLabel',
            type: 'string',
            description:
              'Accessibility label for the icon button to remove the tag, ideally something like "Remove [Tag Name] Tag". Required unless the tag is in a disabled state.',
          },
          {
            name: 'text',
            type: 'string',
            required: true,
            description: 'Short text to render inside the tag.',
          },
        ]}
      />

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
          - As a replacement for the [Badge](/web/badge), as the Badge is a singular element that gives context to a specific subject.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
        If not disabled, Tags are dismissable by the "X" affordance, which triggers the \`onRemove\` callback. Be sure to provide \`removeIconAccessibilityLabel\`!
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

        If this condition is constant (not determined dynamically), \`onRemove\` and \`removeIconAccessibilityLabel\` can be omitted.
        `}
          title="Disabled"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={disabled} name="Disabled variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
        Use the \`errorMessage\` to communicate an error state to the user.

        Note that the message is only available to screen readers. You should indicate the error in the surrounding UI, including how to correct it.
        `}
          title="Error"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={error} name="Error variant" />}
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
