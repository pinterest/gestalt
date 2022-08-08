// @flow strict
import { type Node } from 'react';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import MainSection from '../../docs-components/MainSection.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import docgen, { overrideTypes, type DocGen } from '../../docs-components/docgen.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

import AccessibilitySection from '../../docs-components/AccessibilitySection.js';

export default function SelectListPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="SelectList">
      <PageHeader
        name="SelectList"
        description={generatedDocGen?.description}
        defaultCode={`
<SelectList
  id="selectlistexample1"
  onChange={() => {}}
  options={[
    {label:'Algeria', value: 'algeria'},
    {label:'Belgium', value: 'belgium'},
    {label:'Canada', value: 'canada'},
    {label:'Denmark', value: 'denmark'},
    {label:'Egypt', value: 'egypt'},
    {label:'France', value: 'france'},
  ]}
  size='lg'
  label='Country'
/>
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
          - When presenting users with a list of options that utilizes the native select functionality of the browser or device.
          - When presenting users with a list of options to choose from, like display settings.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - When more than 10 options are presented and the ability to filter the list would be beneficial. Use [ComboBox](/web/combobox) instead.
          - When extra functionality, like groups, subtext or badges, is needed. Use [Dropdown](/web/dropdown) instead.
          - When the options are links and navigate users to different places. Use [Dropdown](/web/dropdown) instead.
          `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use SelectList when the user needs to select from a simple list of items."
            defaultCode={`
<SelectList
  id="selectlistexample2"
  onChange={() => {}}
  options={[
    {label:'Algeria', value: 'algeria'},
    {label:'Belgium', value: 'belgium'},
    {label:'Canada', value: 'canada'},
    {label:'Denmark', value: 'denmark'},
    {label:'Egypt', value: 'egypt'},
    {label:'France', value: 'france'},
  ]}
  label='Country'
  size='lg'
/>`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use SelectList when additional functionality such as subtext or images are needed. Use [Dropdown](/web/dropdown) instead."
            defaultCode={`
<SelectList
  id="selectlistexample3"
  onChange={() => {}}
  options={[
    {label:'Algeria', value: 'algeria'},
    {label:'An image of Belgium', value: 'belgium'},
    {label:'Canada', value: 'canada'},
    {label:'A longer description of Denmark with subtext', value: 'denmark'},
    {label:'Egypt', value: 'egypt'},
    {label:'France', value: 'france'},
  ]}
  label='Country'
  size='lg'
/>`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Order the list items in SelectList either alphabetically or by usage."
            defaultCode={`
<SelectList
  id="selectlistexample4"
  onChange={() => {}}
  options={[
    {label:'Algeria', value: 'algeria'},
    {label:'Belgium', value: 'belgium'},
    {label:'Canada', value: 'canada'},
    {label:'Denmark', value: 'denmark'},
    {label:'Egypt', value: 'egypt'},
    {label:'France', value: 'france'},
  ]}
  label='Country'
  size='lg'
/>`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use SelectList if there are fewer than 4 items in the list and there is space to display all options. Use [RadioGroup](/web/radiogroup) instead."
            defaultCode={`
<SelectList
  id="selectlistexample5"
  onChange={() => {}}
  options={[
    {label:'Male', value: 'male'},
    {label:'Female', value: 'female'},
    {label:'Non-binary', value: 'nonbinary'},
  ]}
  label='Gender'
  size='lg'
/>`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Keep the same type of selection for a group of items. An example of this might be a filter bar. If some items could use SelectList and some items need to use [Dropdown](/web/dropdown), use Dropdown for all the items in the group."
            defaultCode={`
<Flex gap={{ column: 0, row: 2 }}
  <SelectList
    id="selectlistexample6"
    onChange={() => {}}
    options={[
      {label:'Revenue', value: 'v1'},
      {label:'Checkouts', value: 'v2'},
      {label:'Purchasers', value: 'v3'},
      {label:'Page visits', value: 'v4'},
      {label:'Add to cart', value: 'v5'},
      {label:'Pin clicks', value: 'v6'},
    ]}
    value='v1'
    size='lg'
    label='Metric'
  />
  <SelectList
    id="selectlistexample7"
    onChange={() => {}}
    options={[
      {label:'Last 7 days', value: 'v1'},
      {label:'Last 14 days', value: 'v2'},
      {label:'Last 21 days', value: 'v3'},
      {label:'Last 30 days', value: 'v4'},
      {label:'Last 60 days', value: 'v5'},
      {label:'Last 90 days', value: 'v6'},
    ]}
    value='v1'
    size='lg'
    label='Date range'
  />
</Flex>`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Mix [Dropdown](/web/dropdown) and SelectList in a group of items."
            defaultCode={`
  function SubtextIconButtonFlyoutExample() {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null);
    const anchorRef = React.useRef(null);
    const handleSelect = ({ item }) => {
      setSelected(item);
    };

    return (
      <Flex gap={{ row: 2, column: 0 }} alignItems='end'>
      <SelectList
        id="selectlistexample8"
        onChange={() => {}}
        options={[
          {label:'Revenue', value: 'v1'},
          {label:'Checkouts', value: 'v2'},
          {label:'Purchasers', value: 'v3'},
          {label:'Page visits', value: 'v4'},
          {label:'Add to cart', value: 'v5'},
          {label:'Pin clicks', value: 'v6'},
        ]}
        size='lg'
        label='Metric'
      />
      <Box display="flex" justifyContent="center">

        <Button
          accessibilityControls="header-dropdown-example"
          accessibilityHaspopup
          accessibilityExpanded={ open }
          iconEnd="arrow-down"
          text="Date range"
          selected={open}
          icon="add"
          size="lg"
          onClick={ () => setOpen((prevVal) => !prevVal) }
          ref={anchorRef}
        />
        {open && (
          <Dropdown id="selectlistexample9" anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
            <Dropdown.Item
              handleSelect={handleSelect}
              selected={selected}
              option={{ value: "item 1", label: "Last 7 days" }}
            />
            <Dropdown.Item
              handleSelect={handleSelect}
              selected={selected}
              option={{ value: "item 2", label: "Last 14 days" }}
            />
            <Dropdown.Item
              handleSelect={handleSelect}
              selected={selected}
              option={{ value: "item 3", label: "Last 21 days" }}
            />
            <Dropdown.Item
              handleSelect={handleSelect}
              selected={selected}
              option={{ value: "item 4", label: "Last 30 days" }}
            />
            <Dropdown.Item
              handleSelect={handleSelect}
              selected={selected}
              option={{ value: "item 5", label: "Last 60 days" }}
            />
            <Dropdown.Item
              handleSelect={handleSelect}
              selected={selected}
              option={{ value: "item 6", label: "Last 90 days" }}
            />
          </Dropdown>
        )}
      </Box>
      </Flex>
    );
  }
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`
      SelectList comes with [Label](/web/label) built-in: just use the \`label\` prop. We strongly encourage always supplying a label. Be sure to provide a unique \`id\` so the Label is associated with the correct SelectList.

      If SelectList is labeled by content elsewhere on the page, or a more complex label is needed, the \`labelDisplay\` prop can be used to visually hide the label. In this case, it is still available to screen reader users, but will not appear visually on the screen.`}
        >
          <MainSection.Card
            defaultCode={`
<Flex gap={{ column: 0, row: 6 }}
  <SelectList
    id="selectlistexampleA11yVisible"
    onChange={() => {}}
    options={[
      {label: 'Last 5 days', value: '5'},
      {label: 'Last week', value: '7'},
      {label: 'Last 30 days', value: '30'},
      {label: 'Last sixth months', value: '6m'},
      {label: 'Last year', value: '365'},
    ]}
    label='Date range'
    size='lg'
  />
  <Flex gap={{ column: 2, row: 0 }} direction="column">
    <Text weight="bold" size="300">Date range</Text>
    <SelectList
      id="selectlistexampleA11yHiddenLabel"
      onChange={() => {}}
      options={[
        {label: 'Last 5 days', value: '5'},
        {label: 'Last week', value: '7'},
        {label: 'Last 30 days', value: '30'},
        {label: 'Last sixth months', value: '6m'},
        {label: 'Last year', value: '365'},
      ]}
      label='Date range'
      labelDisplay="hidden"
      size='lg'
    />
  </Flex>
</Flex>
`}
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection name="Variants">
        <MainSection.Subsection title="Size" columns={2}>
          <MainSection.Card
            cardSize="md"
            title="Large"
            description={`Use \`lg\` as the recommended size within Pinterest products.`}
            defaultCode={`
<SelectList
  id="selectlistexample10"
  onChange={() => {}}
  options={[
    {label:'Algeria', value: 'algeria'},
    {label:'Belgium', value: 'belgium'},
    {label:'Canada', value: 'canada'},
    {label:'Denmark', value: 'denmark'},
    {label:'Egypt', value: 'egypt'},
    {label:'France', value: 'france'},
  ]}
  size='lg'
  label='Country'
/>`}
          />
          <MainSection.Card
            cardSize="md"
            title="Medium"
            description={`Use \`md\` on denser surfaces, such as Business products or internal tools.`}
            defaultCode={`
  <SelectList
    id="selectlistexample11"
    onChange={() => {}}
    options={[
      {label:'Algeria', value: 'algeria'},
      {label:'Belgium', value: 'belgium'},
      {label:'Canada', value: 'canada'},
      {label:'Denmark', value: 'denmark'},
      {label:'Egypt', value: 'egypt'},
      {label:'France', value: 'france'},
    ]}
    size='md'
    label='Country'
  />`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Label visibility"
          description={`In some cases, the label for a SelectList is represented in a different way visually, as demonstrated below. In these instances, you can set \`labelDisplay="hidden"\` to ensure SelectList is properly labeled for screen readers while using a different element to represent the label visually.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
            <Flex gap={{ column: 2, row: 0 }} direction="column">
<Text weight="bold" size="300">Date range</Text>
<SelectList
  id="selectlistexampleHiddenLabel"
  onChange={() => {}}
  options={[
    {label: 'Last 5 days', value: '5'},
    {label: 'Last week', value: '7'},
    {label: 'Last 30 days', value: '30'},
    {label: 'Last sixth months', value: '6m'},
    {label: 'Last year', value: '365'},
  ]}
  label='Date range'
  labelDisplay="hidden"
  size='lg'
/>
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Helper text"
          description="Helper text should be used when additional description may be required to understand the SelectList. Common examples include text that is legally required to be displayed, or instructions to fill out a form (e.g. proper formatting). If the text is optional, [Tooltip](/web/tooltip) could be used instead."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<SelectList
  id="selectlistexample12"
  onChange={() => {}}
  options={[
    {label: 'ARS - Argentine peso', value: 'ars'},
    {label: 'AUD - Australian dollar', value: 'aud'},
    {label: 'ERN - Eritrean nakfa', value: 'ern'},
    {label: 'EUR - Euro', value: 'eur'},
    {label: 'GBP - British pound', value: 'gbp'},
    {label: 'JPY - Japanese yen', value: 'jpy'},
    {label: 'USD - United States Dollar', value: 'usd'},
  ]}
  label='Default currency'
  helperText='Product prices in your data source without an ISO currency code will default to this currency'
  size='lg'
/>`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Controlled component"
          description="SelectList must be used as a controlled component when the `placeholder` or `value` props are needed. When used in this manner, `onChange` and `value` are required, while `placeholder` is optional."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example(props) {
  const [country, setCountry] = React.useState('')
  const countryOptions = [
    {
      label:'Algeria',
      value: 'algeria'
    },
    {
      label:'Belgium',
      value: 'belgium'
    },
    {
      label:'Canada',
      value: 'canada'
    },
    {
      label:'Denmark',
      value: 'denmark'
    },
    {
      label:'Egypt',
      value: 'egypt'
    },
    {
      label:'France',
      value: 'france'
    },
  ];
  return (
    <SelectList
      id="selectlistexample13"
      name="country"
      onChange={({ value }) => setCountry(value)}
      options={countryOptions}
      placeholder="Select a country"
      value={country}
      label='Country'
    />
  );
}`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Error message"
          description="`errorMessage` should be used to denote an error state in SelectList and to provide a message for how the user can fix it."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<SelectList
  id="selectlistexample14"
  onChange={() => {}}
  options={[
    {label:'Algeria', value: 'algeria'},
    {label:'Belgium', value: 'belgium'},
    {label:'Canada', value: 'canada'},
    {label:'Denmark', value: 'denmark'},
    {label:'Egypt', value: 'egypt'},
    {label:'France', value: 'france'},
  ]}
  placeholder=' '
  label='Country'
  errorMessage='You must select a country'
  size='lg'
/>`}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Dropdown](/web/dropdown)**
If additional functionality is needed in the menu, such as subtext, headers or custom styling, use Dropdown.

**[ComboBox](/web/combobox)**
If users need the ability to choose an option by entering text to filter a long list of options, use ComboBox.

**[RadioGroup](/web/radiogroup)**
If users need the ability to choose between fewer than 4 options, use RadioButton.

**[Checkbox](/web/checkbox)**
If users need the ability to choose between a yes/no option, use Checkbox.
`}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  const docGen = await docgen({ componentName: 'SelectList' });
  const overriddenDocGen = overrideTypes(docGen, {
    onChange: '({| event: SyntheticInputEvent<HTMLSelectElement>, value: string |}) => void',
  });
  return {
    props: { generatedDocGen: overriddenDocGen },
  };
}
