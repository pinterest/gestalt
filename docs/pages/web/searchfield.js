// @flow strict
import { type Node } from 'react';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import MainSection from '../../docs-components/MainSection.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

import AccessibilitySection from '../../docs-components/AccessibilitySection.js';

export default function SearchFieldPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="SearchField">
      <PageHeader
        name="SearchField"
        description={generatedDocGen?.description}
        defaultCode={`
  function SearchFieldExample() {
    const [value, setValue] = React.useState('');

    return (
      <Flex gap={4} alignItems="center" flex="grow">
        <Icon
          icon="pinterest"
          color="brandPrimary"
          size={20}
          accessibilityLabel="Pinterest"
        />
        <Flex.Item flex="grow">
          <SearchField
            accessibilityLabel="Search all of Pinterest"
            accessibilityClearButtonLabel="Clear search field"
            id="searchFieldMainExample"
            onChange={({value}) => setValue(value)}
            placeholder="Search and explore"
            value={value}
          />
        </Flex.Item>
        <IconButton
          accessibilityLabel="Notifications"
          icon="speech-ellipsis"
          size="md"
        />
        <IconButton accessibilityLabel="Profile" icon="person" size="md" />
      </Flex>
    );
  }
`}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - To search or filter content within a surface.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - As a means of inputting content to a form. Use [TextField](/web/textfield) instead.
          - To act as an auto-complete input. Use [ComboBox](/web/combobox) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            showCode={false}
            type="do"
            description="Place SearchField above the content the user will be searching."
            defaultCode={`
<SearchField accessibilityLabel="Search your Pins" accessibilityClearButtonLabel="Clear search field" id="bestPracticesDo1" onChange={() => {}} placeholder="Search your Pins" />
      `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Hide SearchField behind an IconButton if there is enough space for the full component."
            defaultCode={`
<IconButton accessibilityLabel="Search your Pins" icon="search" />
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Make the `placeholder` specific. Give the user a hint about the content they're searching and/or what parameters they can use to search."
            defaultCode={`
<Flex alignItems="center" flex="grow">
  <Flex.Item flex="grow">
    <SearchField
      accessibilityLabel="Search by audience name or ID"
      accessibilityClearButtonLabel="Clear search field"
      id="bestPracticesDo2"
      onChange={() => {}}
      placeholder="Search by audience name or ID"
    />
  </Flex.Item>
</Flex>
      `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Add critical information to the `placeholder`. The `placeholder` text disappears once the user begins entering data and will therefore be unavailable."
            defaultCode={`
<Flex alignItems="center" flex="grow">
  <Flex.Item flex="grow">
    <SearchField
      accessibilityLabel="Search your Pins"
      accessibilityClearButtonLabel="Clear search field"
      id="bestPracticesDont2"
      onChange={() => {}}
      placeholder="Click the submit button to search"
    />
  </Flex.Item>
</Flex>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Make sure SearchField is displayed wide enough to completely display common search terms."
            defaultCode={`
<Box width={300}>
  <SearchField
    accessibilityLabel="Search your Pins"
    accessibilityClearButtonLabel="Clear search field"
    id="bestPracticesDo3"
    onChange={() => {}}
    value="Homecoming dresses"
  />
</Box>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Truncate or wrap text within SearchField."
            defaultCode={`
<Box width={300}>
  <SearchField
    accessibilityLabel="Search your Pins"
    accessibilityClearButtonLabel="Clear search field"
    id="bestPracticesDont3"
    onChange={() => {}}
    value="Swiss architecure from the 195…"
  />
</Box>
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`
      SearchField should ideally have a visible label above the input using the \`label\` prop. However, if need be, \`accessibilityLabel\` can be used to provide screen readers with context about the SearchField.

      Be sure to also specify (and localize) a string for the \`accessibilityClearButtonLabel\`.
      `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
  function SearchFieldExample() {
    const [value, setValue] = React.useState('');
    return (
      <Flex alignItems="center" flex="grow" gap={4}>
        <Icon
          accessibilityLabel="Pinterest"
          color="brandPrimary"
          icon="pinterest"
          size={20}
        />
        <Flex.Item flex="grow">
          <SearchField
            accessibilityLabel="Search all of Pinterest"
            accessibilityClearButtonLabel="Clear search field"
            id="searchFieldA11yExample"
            onChange={({value}) => setValue(value)}
            placeholder="Search and explore"
            value={value}
          />
        </Flex.Item>
        <IconButton
          accessibilityLabel="Notifications"
          icon="speech-ellipsis"
          size="md"
        />
        <IconButton accessibilityLabel="Profile" icon="person" size="md" />
      </Flex>
    );
  }
`}
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection name="Localization">
        <MainSection.Subsection
          description={`
      Be sure to localize the \`accessibilityLabel\`, \`accessibilityClearButtonLabel\`, \`errorMessage\`, \`label\` and \`placeholder\` prop values. Also localize \`value\` for those cases when it can be translated.

      Note that localization can lengthen text by 20 to 30 percent.
      `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
  function SearchFieldExample() {
    const [value, setValue] = React.useState('');
    return (
      <Flex alignItems="center" flex="grow" gap={4}>
        <Icon
          accessibilityLabel="Pinterest"
          color="brandPrimary"
          icon="pinterest"
          size={20}
        />
        <Flex.Item flex="grow">
          <SearchField
            accessibilityLabel="सभी Pinterest खोजें"
            accessibilityClearButtonLabel="खोज फ़ील्ड साफ़ करें"
            id="searchFieldLocalizationExample"
            onChange={({value}) => setValue(value)}
            placeholder="खोजें और एक्सप्लोर करें"
            value={value}
          />
        </Flex.Item>
        <IconButton
          accessibilityLabel="सूचनाएं"
          icon="speech-ellipsis"
          size="md"
        />
        <IconButton accessibilityLabel="प्रोफ़ाइल" icon="person" size="md" />
      </Flex>
    );
  }
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Visible label"
          description={`When specified, \`label\` adds a label above the SearchField. If \`label\` is specified, \`accessibilityLabel\` can be an empty string.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function SearchFieldExample() {
  const [value, setValue] = React.useState('');
  return (
    <Flex alignItems="center" flex="grow">
      <Flex.Item flex="grow">
        <SearchField
          accessibilityLabel=""
          accessibilityClearButtonLabel="Clear search field"
          label="Search Messages"
          id="searchMessagesLabelExample"
          onChange={({value}) => setValue(value)}
          placeholder="Search by name"
          value={value}
        />
        </Flex.Item>
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Sizes"
          description={`There are 2 sizes available: \`md\` (default) and \`lg\`.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function SearchFieldExample() {
  const [value, setValue] = React.useState('');
  const [lgValue, setLgValue] = React.useState('');
  return (
    <Flex alignItems="center" gap={12}>
      <Flex direction="column" flex="grow" gap={4}>
        <Text>Medium (md)</Text>
        <SearchField
          accessibilityLabel=""
          accessibilityClearButtonLabel="Clear search field"
          label="Search Messages"
          id="searchMessagesMedium"
          onChange={({value}) => setValue(value)}
          placeholder="Search by name"
          value={value}
        />
      </Flex>
      <Flex direction="column" flex="grow" gap={4}>
        <Text>Large (lg)</Text>
        <SearchField
          accessibilityLabel=""
          accessibilityClearButtonLabel="Clear search field"
          label="Search Messages"
          id="searchMessagesLarge"
          onChange={({value}) => setLgValue(value)}
          placeholder="Search by name"
          value={lgValue}
          size="lg"
        />
      </Flex>
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Error"
          description={`An \`errorMessage\` can be specified if needed.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function SearchFieldExample() {
  const [value, setValue] = React.useState('pepper#$%');
  return (
    <Flex alignItems="center" flex="grow">
      <Flex.Item flex="grow">
        <SearchField
          accessibilityLabel=""
          accessibilityClearButtonLabel="Clear search field"
          label="Search Messages"
          id="searchMessagesError"
          onChange={({value}) => setValue(value)}
          placeholder="Search by name"
          value={value}
          errorMessage="Invalid search term, please avoid special characters."
        />
      </Flex.Item>
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[ComboBox](/web/combobox)**
ComboBox allows users to filter a list when selecting an option. Choose ComboBox when the user is selecting from a finite list of options.
**[TextField](/web/textfield)**
TextField provides an affordance to input small to medium length text. Unless the text is used to search for or filter through content, choose TextField for shorter text input.
**[TextArea](/web/textarea)**
TextArea allows for multiline text input, suitable for longer length text. Unless the text is used to search for or filter through content, choose TextArea for longer text input.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'SearchField' }) },
  };
}
