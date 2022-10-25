// @flow strict
import { type Node } from 'react';
import PropTable from '../../docs-components/PropTable.js';
import Example from '../../docs-components/Example.js';
import PageHeader from '../../docs-components/PageHeader.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import defaultExample from '../../examples/tag/defaultExample.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen.description}>
        <SandpackExample code={defaultExample} name="Tag Main Example" hideEditor />
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
        <Example
          description="Default standalone Tag"
          name="Standalone"
          defaultCode={`
function Example(props) {
  const [showTag, setShowTag] = React.useState(true);
  return showTag ? (
    <Tag
      onRemove={() => setShowTag(false)}
      removeIconAccessibilityLabel="Remove New tag"
      text="New"
    />
  ) : null;
}
  `}
        />
        <Example
          description="Disabled standalone Tag"
          name="Disabled"
          defaultCode={`
<Tag disabled text="New" />
  `}
        />
        <Example
          description="Standalone Tag in an error state"
          name="Error"
          defaultCode={`
function Example(props) {
  const [showTag, setShowTag] = React.useState(true);
  return showTag ? (
    <Tag
      errorMessage="Error"
      onRemove={() => setShowTag(false)}
      removeIconAccessibilityLabel="Remove New tag"
      text="New"
    />
  ) : null;
}
  `}
        />
        <Example
          description="Tags have a max width of 300px, and will clip longer text"
          name="Max width"
          defaultCode={`
function Example(props) {
  const [showTag, setShowTag] = React.useState(true);
  return showTag ? (
    <Tag
      onRemove={() => setShowTag(false)}
      removeIconAccessibilityLabel="Remove long example tag"
      text="The quick brown fox jumps over the lazy dog"
    />
  ) : null;
}
  `}
        />
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
