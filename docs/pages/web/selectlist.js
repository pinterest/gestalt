// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import { type DocGen, multipledocgen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import main from '../../examples/selectlist/main.js';

export default function DocsPage({
  generatedDocGen,
}: {|
  generatedDocGen: {| [string]: DocGen |},
|}): Node {
  return (
    <Page title={generatedDocGen?.SelectList?.displayName}>
      <PageHeader
        name={generatedDocGen?.SelectList?.displayName}
        description={generatedDocGen?.SelectList?.description}
      >
        <SandpackExample
          code={main}
          name={`Main ${generatedDocGen?.SelectList?.displayName} example`}
          previewHeight={150}
          hideEditor
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen?.SelectList} />
      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen?.SelectListOption?.displayName}
          description={generatedDocGen?.SelectListOption?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.SelectListOption}
            id="SelectList.Option"
            name="SelectList.Option"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title={generatedDocGen?.SelectListGroup?.displayName}
          description={generatedDocGen?.SelectListGroup?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.SelectListGroup}
            id="SelectList.Group"
            name="SelectList.Group"
          />
        </MainSection.Subsection>
      </MainSection>
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
  label="Country"
  onChange={() => {}}
  size="lg"
>
  {[
    { label: 'Algeria', value: 'algeria' },
    { label: 'Belgium', value: 'belgium' },
    { label: 'Canada', value: 'canada' },
    { label: 'Denmark', value: 'denmark' },
    { label: 'Egypt', value: 'egypt' },
    { label: 'France', value: 'france' },
  ].map(({ label, value }) =>
    <SelectList.Option key={label} label={label} value={value} />
  )}
</SelectList>
`}
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use SelectList when additional functionality such as subtext or images are needed. Use [Dropdown](/web/dropdown) instead."
            defaultCode={`
<SelectList
  id="selectlistexample3"
  label="Country"
  onChange={() => {}}
  size="lg"
>
  {[
    { label: 'Algeria', value: 'algeria' },
    { label: 'An image of Belgium', value: 'belgium' },
    { label: 'Canada', value: 'canada' },
    { label: 'A longer description of Denmark with subtext', value: 'denmark' },
    { label: 'Egypt', value: 'egypt' },
    { label: 'France', value: 'france' },
  ].map(({ label, value }) =>
    <SelectList.Option key={label} label={label} value={value} />
  )}
</SelectList>
  `}
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
  label="Country"
  onChange={() => {}}
  size="lg"
>
  {[
    { label: 'Algeria', value: 'algeria' },
    { label: 'Belgium', value: 'belgium' },
    { label: 'Canada', value: 'canada' },
    { label: 'Denmark', value: 'denmark' },
    { label: 'Egypt', value: 'egypt' },
    { label: 'France', value: 'france' },
  ].map(({ label, value }) =>
    <SelectList.Option key={label} label={label} value={value} />
  )}
</SelectList>
`}
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use SelectList if there are fewer than 4 items in the list and there is space to display all options. Use [RadioGroup](/web/radiogroup) instead."
            defaultCode={`
<SelectList
  id="selectlistexample5"
  label="Gender"
  onChange={() => {}}
  size="lg"
>
  {[
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Non-binary', value: 'nonbinary' },
  ].map(({ label, value }) =>
    <SelectList.Option key={label} label={label} value={value} />
  )}
</SelectList>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Keep the same type of selection for a group of items. An example of this might be a filter bar. If some items could use SelectList and some items need to use [Dropdown](/web/dropdown), use Dropdown for all the items in the group."
            defaultCode={`
<Flex gap={{ column: 0, row: 2 }}>
  <SelectList
    id="selectlistexample6"
    label="Metric"
    onChange={() => {}}
    size="lg"
    value="v1"
  >
    {[
      { label: 'Revenue', value: 'v1' },
      { label: 'Checkouts', value: 'v2' },
      { label: 'Purchasers', value: 'v3' },
      { label: 'Page visits', value: 'v4' },
      { label: 'Add to cart', value: 'v5' },
      { label: 'Pin clicks', value: 'v6' },
    ].map(({ label, value }) =>
      <SelectList.Option key={label} label={label} value={value} />
    )}
  </SelectList>

  <SelectList
    id="selectlistexample7"
    label="Date range"
    onChange={() => {}}
    size="lg"
    value="v1"
  >
    {[
      { label: 'Last 7 days', value: 'v1' },
      { label: 'Last 14 days', value: 'v2' },
      { label: 'Last 21 days', value: 'v3' },
      { label: 'Last 30 days', value: 'v4' },
      { label: 'Last 60 days', value: 'v5' },
      { label: 'Last 90 days', value: 'v6' },
    ].map(({ label, value }) =>
      <SelectList.Option key={label} label={label} value={value} />
    )}
  </SelectList>
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
      <Flex gap={2} alignItems="end">
        <SelectList
          id="selectlistexample8"
          label="Metric"
          onChange={() => {}}
          size="lg"
        >
          {[
            { label: 'Revenue', value: 'v1' },
            { label: 'Checkouts', value: 'v2' },
            { label: 'Purchasers', value: 'v3' },
            { label: 'Page visits', value: 'v4' },
            { label: 'Add to cart', value: 'v5' },
            { label: 'Pin clicks', value: 'v6' },
          ].map(({ label, value }) =>
            <SelectList.Option key={label} label={label} value={value} />
          )}
        </SelectList>

        <Flex justifyContent="center">
          <Button
            accessibilityControls="header-dropdown-example"
            accessibilityHaspopup
            accessibilityExpanded={open}
            icon="add"
            iconEnd="arrow-down"
            onClick={() => setOpen((prevVal) => !prevVal)}
            ref={anchorRef}
            selected={open}
            size="lg"
            text="Date range"
          />

          {open && (
            <Dropdown
              anchor={anchorRef.current}
              id="selectlistexample9"
              onDismiss={() => { setOpen(false); }}
            >
              {[
                { value: "item 1", label: "Last 7 days" },
                { value: "item 2", label: "Last 14 days" },
                { value: "item 3", label: "Last 21 days" },
                { value: "item 4", label: "Last 30 days" },
                { value: "item 5", label: "Last 60 days" },
                { value: "item 6", label: "Last 90 days" },
              ].map(({ label, value }) =>
                <Dropdown.Item
                  key={label}
                  handleSelect={handleSelect}
                  option={{ label, value }}
                  selected={selected}
                />
              )}
            </Dropdown>
          )}
        </Flex>
      </Flex>
    );
  }
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.SelectList?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`
      SelectList comes with [Label](/web/label) built-in: just use the \`label\` prop. We strongly encourage always supplying a label. Be sure to provide a unique \`id\` so the Label is associated with the correct SelectList.

      If SelectList is labeled by content elsewhere on the page, or a more complex label is needed, the \`labelDisplay\` prop can be used to visually hide the label. In this case, it is still available to screen reader users, but will not appear visually on the screen.`}
        >
          <MainSection.Card
            defaultCode={`
<Flex gap={{ column: 0, row: 6 }}>
  <SelectList
    id="selectlistexampleA11yVisible"
    label="Date range"
    onChange={() => {}}
    size="lg"
  >
    {[
      { label: 'Last 5 days', value: '5' },
      { label: 'Last week', value: '7' },
      { label: 'Last 30 days', value: '30' },
      { label: 'Last sixth months', value: '6m' },
      { label: 'Last year', value: '365' },
    ].map(({ label, value }) =>
      <SelectList.Option key={label} label={label} value={value} />
    )}
  </SelectList>

  <Flex gap={2} direction="column">
    <Flex gap={1} alignItems="center">
      <Text size="300">
        Date range
      </Text>
      <IconButton
        accessibilityLabel="Info"
        icon="info-circle"
        size="sm"
        tooltip={{
          text: "Options available are based on your usage.",
          idealDirection: "right"
        }}
      />
    </Flex>
    <SelectList
      id="selectlistexampleA11yHiddenLabel"
      label="Date range"
      labelDisplay="hidden"
      onChange={() => {}}
      size="lg"
    >
      {[
        { label: 'Last 5 days', value: '5' },
        { label: 'Last week', value: '7' },
        { label: 'Last 30 days', value: '30' },
        { label: 'Last sixth months', value: '6m' },
        { label: 'Last year', value: '365' },
      ].map(({ label, value }) =>
        <SelectList.Option key={label} label={label} value={value} />
      )}
    </SelectList>
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
  label="Country"
  onChange={() => {}}
  size="lg"
>
  {[
    { label: 'Algeria', value: 'algeria' },
    { label: 'Belgium', value: 'belgium' },
    { label: 'Canada', value: 'canada' },
    { label: 'Denmark', value: 'denmark' },
    { label: 'Egypt', value: 'egypt' },
    { label: 'France', value: 'france' },
  ].map(({ label, value }) =>
    <SelectList.Option key={label} label={label} value={value} />
  )}
</SelectList>
`}
          />

          <MainSection.Card
            cardSize="md"
            title="Medium"
            description={`Use \`md\` on denser surfaces, such as business products or internal tools.`}
            defaultCode={`
  <SelectList
    id="selectlistexample11"
    label="Country"
    onChange={() => {}}
    size="md"
  >
    {[
      { label: 'Algeria', value: 'algeria' },
      { label: 'Belgium', value: 'belgium' },
      { label: 'Canada', value: 'canada' },
      { label: 'Denmark', value: 'denmark' },
      { label: 'Egypt', value: 'egypt' },
      { label: 'France', value: 'france' },
    ].map(({ label, value }) =>
      <SelectList.Option key={label} label={label} value={value} />
    )}
  </SelectList>
  `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Label visibility"
          description={`In some cases, the label for a SelectList is represented in a different way visually, as demonstrated below. In these instances, you can set \`labelDisplay="hidden"\` to ensure SelectList is properly labeled for screen readers while using a different element to represent the label visually.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex gap={2} direction="column">
  <Flex gap={1} alignItems="center">
    <Text weight="bold" size="300">
      Date range
    </Text>
    <IconButton
      accessibilityLabel="Info"
      icon="info-circle"
      size="sm"
      tooltip={{
        text: "Options available are based on your usage.",
        idealDirection: "right"
      }}
    />
  </Flex>

  <SelectList
    id="selectlistexampleHiddenLabel"
    label="Date range"
    labelDisplay="hidden"
    onChange={() => {}}
    size="lg"
  >
    {[
      { label: 'Last 5 days', value: '5' },
      { label: 'Last week', value: '7' },
      { label: 'Last 30 days', value: '30' },
      { label: 'Last sixth months', value: '6m' },
      { label: 'Last year', value: '365' },
    ].map(({ label, value }) =>
      <SelectList.Option key={label} label={label} value={value} />
    )}
  </SelectList>
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
  helperText="Product prices in your data source without an ISO currency code will default to this currency"
  id="selectlistexample12"
  label="Default currency"
  onChange={() => {}}
  size="lg"
>
  {[
    { label: 'ARS - Argentine peso', value: 'ars' },
    { label: 'AUD - Australian dollar', value: 'aud' },
    { label: 'ERN - Eritrean nakfa', value: 'ern' },
    { label: 'EUR - Euro', value: 'eur' },
    { label: 'GBP - British pound', value: 'gbp' },
    { label: 'JPY - Japanese yen', value: 'jpy' },
    { label: 'USD - United States Dollar', value: 'usd' },
  ].map(({ label, value }) =>
    <SelectList.Option key={label} label={label} value={value} />
  )}
</SelectList>
`}
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
  return (
    <SelectList
    id="selectlistexample13"
    label="Country"
    name="country"
    onChange={({ value }) => setCountry(value)}
    placeholder="Select a country"
    value={country}
    >
      {[
        { label: 'Algeria', value: 'algeria' },
        { label: 'Belgium', value: 'belgium' },
        { label: 'Canada', value: 'canada' },
        { label: 'Denmark', value: 'denmark' },
        { label: 'Egypt', value: 'egypt' },
        { label: 'France', value: 'france' },
      ].map(({ label, value }) =>
        <SelectList.Option key={label} label={label} value={value} />
      )}
    </SelectList>
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
  errorMessage="You must select a country"
  id="selectlistexample14"
  label="Country"
  onChange={() => {}}
  placeholder="Select a country"
  size="lg"
  >
  {[
    { label: 'Algeria', value: 'algeria' },
    { label: 'Belgium', value: 'belgium' },
    { label: 'Canada', value: 'canada' },
    { label: 'Denmark', value: 'denmark' },
    { label: 'Egypt', value: 'egypt' },
    { label: 'France', value: 'france' },
  ].map(({ label, value }) =>
    <SelectList.Option key={label} label={label} value={value} />
  )}
</SelectList>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Groups"
          description="SelectList.Group can be used to group related options. Note that disabling a group disables all of its options."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<SelectList
  helperText="Note that the family members aren't secondary!"
  id="selectlistexample15"
  label="Choose your favorite secondary character"
  onChange={() => {}}
  placeholder="Select a character"
  size="lg"
  >
    <SelectList.Group disabled label="Family">
      {['Bart', 'Lisa', 'Homer', 'Marge', 'Maggie'].map((name) =>
        <SelectList.Option key={name} label={name} value={name} />
      )}
    </SelectList.Group>
    <SelectList.Group label="Neighbors">
      {['Ned', 'Maude', 'Rod', 'Todd'].map((name) =>
        <SelectList.Option key={name} label={name} value={name} />
      )}
    </SelectList.Group>
    <SelectList.Group label="Cartoons">
      {['Itchy', 'Scratchy', 'Poochie'].map((name) =>
        <SelectList.Option key={name} label={name} value={name} />
      )}
    </SelectList.Group>
</SelectList>
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.SelectList?.displayName} />
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

export async function getServerSideProps(): Promise<{|
  props: {| generatedDocGen: {| [string]: DocGen |} |},
|}> {
  const docgen = await multipledocgen({
    componentName: ['SelectList', 'SelectListOption', 'SelectListGroup'],
  });

  return {
    props: { generatedDocGen: docgen },
  };
}
