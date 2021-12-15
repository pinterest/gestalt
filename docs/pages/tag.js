// @flow strict
import type { Node } from 'react';
import PropTable from '../components/PropTable.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';

export default function DocsPage(): Node {
  return (
    <Page title="Tag">
      <PageHeader
        name="Tag"
        description="[Tags](https://gestalt.pinterest.systems/tag) are objects that hold text and have a delete icon to remove them. They can appear within [TextFields](https://gestalt.pinterest.systems/textfield#tagsExample), [TextAreas](https://gestalt.pinterest.systems/textarea#tagsExample), [ComboBox](https://gestalt.pinterest.systems/combobox#Tags) or as standalone components."
      />
      <PropTable
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
            title="When to Use"
            description={`
          - In conjunction with [TextField](/textfield#tagsExample), [TextArea](/textarea#tagsExample), and [ComboBox](/combobox#Tags), or as a standalone element to display selected options.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
          - As a replacement for the [Badge](/badge), as the Badge is a singular element that gives context to a specific subject.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
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
    </Page>
  );
}
