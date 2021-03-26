// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';
import FeedbackCallout from './components/FeedbackCallout.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(<FeedbackCallout componentName="SelectList" />);

card(
  <PageHeader
    name="SelectList"
    description={`
    SelectList displays a list of actions or options using the browser’s native select.`}
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
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'disabled',
        type: 'boolean',
        description: `Used to disable the entire SelectList.`,
        defaultValue: 'false',
      },
      {
        name: 'errorMessage',
        type: 'string',
        description: `Used to communicate error information to the user. Be sure to localize the text. See the [error message](#Error-message) variant to learn more.`,
      },
      {
        name: 'helperText',
        type: 'string',
        description: `Used to provide more information about the form field. Be sure to localize the text. See the [helper text](#Helper-text) variant to learn more.`,
      },
      {
        name: 'id',
        type: 'string',
        description:
          'A unique identifier to connect the underlying `<select>` with the associated label.',
        required: true,
      },
      {
        name: 'label',
        type: 'string',
        description: 'The label shown above the input. Be sure to localize the label.',
      },
      {
        name: 'name',
        type: 'string',
        description: 'Used to specify the name of the control.',
      },
      {
        name: 'onChange',
        type: '({| event: SyntheticInputEvent<>, value: string |}) => void',
        description:
          'Callback triggered when the user selects a new option.  See the [controlled component](#Controlled-component) variant to learn more.',
        required: true,
      },
      {
        name: 'options',
        type: 'Array<{| label: string, value: string, disabled?: boolean |}>',
        description:
          'The options displayed in the dropdown list. Note that ``disabled`` here is used to disable a single option. Be sure to localize the label.',
        required: true,
      },
      {
        name: 'placeholder',
        type: 'string',
        description:
          'If not provided, the first item in the list will be shown. Be sure to localize the text. See the [controlled component](#Controlled-component) variant to learn more.',
      },
      {
        name: 'size',
        type: '"md" | "lg"',
        required: false,
        description: `md: 40px, lg: 48px. See the [size](#Size) variant to learn more.`,
        defaultValue: 'md',
      },
      {
        name: 'value',
        type: 'string',
        description:
          'The currently-selected value. See the [controlled component](#Controlled-component) variant to learn more.',
      },
    ]}
  />,
);

card(
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
        description="Use SelectList when additional functionality such as subtext or images are needed. Use Dropdown instead."
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
        description="Use SelectList if there are fewer than 4 items in the list and there is space to display all options. Use RadioButtons instead."
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
        description="Keep the same type of selection for a group of items. An example of this might be a filter bar. If some items could use SelectList and some items need to use Dropdown, use Dropdown for all the items in the group."
        defaultCode={`
<Flex gap={2}>
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
        description="Mix Dropdown and SelectList in a group of items."
        defaultCode={`
  function SubtextIconButtonFlyoutExample() {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null);
    const anchorRef = React.useRef(null);
    const handleSelect = ({ item }) => {
      setSelected(item);
    };

    return (
      <Flex gap={2} alignItems='end'>
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
          inline
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
  </MainSection>,
);

card(
  <MainSection name="Accessibility">
    <MainSection.Subsection
      title="Labels"
      description={`
      SelectList comes with Label built-in: just use the \`label\` prop - we strongly encourage always supplying a label. Be sure to provide a unique \`id\` so the Label is associated with the correct SelectList.`}
    />
  </MainSection>,
);

card(
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
      title="Helper text"
      description="Helper text should be used when additional description may be required to understand the SelectList. Most commonly, this could be text that is legally required to be displayed, or instructions to fill out a form (e.g. proper formatting). If the text is optional, Tooltip could be used instead."
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
      description="Error message should be used to denote an error state in the specific SelectList and to provide a message for how the user can fix it."
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
  </MainSection>,
);

card(
  <MainSection name="Related">
    <MainSection.Subsection
      description={`
**[Dropdown](/Dropdown)**
If additional functionality is needed in the menu, such as subtext, headers or custom styling, use Dropdown.

**[Typeahead](/Typeahead)**
If users need the ability to choose an option by entering text to filter a long list of options, use Typeahead.

**[RadioButton](/RadioButton)**
If users need the ability to choose between fewer than 4 options, use RadioButton.

**[Checkbox](/Checkbox)**
If users need the ability to choose between a yes/no option, use Checkbox.
`}
    />
  </MainSection>,
);
export default cards;
