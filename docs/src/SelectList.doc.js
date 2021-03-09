// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';
import FeedbackCallout from './components/FeedbackCallout.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <FeedbackCallout link="https://docs.google.com/forms/d/e/1FAIpQLSe7h8kVcD7QqvPvjkE8s8WvnuFfhYvAEQ6L7tZwPgHjJPAbSw/viewform?usp=pp_url&entry.847151274=SelectList" />,
);

card(
  <PageHeader
    name="SelectList"
    description={`
    SelectList displays a list of actions or options using the browser’s native select.`}
    defaultCode={`
      <SelectList
        id="selectlistexample"
        onChange={() => {}}
        options={[
          {label:'Austin', value: 'austin'},
          {label:'Los Angeles', value: 'la'},
          {label:'New York', value: 'nyc'},
          {label:'San Francisco', value: 'sf'},
          {label:'Seattle', value: 'seattle'},
        ]}
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
        description: `Used to disable the entire SelectList. See the [states](#States) variant to learn more.`,
        defaultValue: 'false',
      },
      {
        name: 'errorMessage',
        type: 'string',
        description: `Used to communicate error information to the user. Be sure to localize the text. See the [states](#States) variant to learn more.`,
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
        description: 'Callback triggered when the user makes any changes.',
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
          'If not provided, the first item in the list will be shown. Be sure to localize the text.',
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
        description: 'The currently-selected value.',
      },
    ]}
  />,
);

card(
  <MainSection name="Best practices">
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Use SelectList when the user needs to select from a simple list of items."
        defaultCode={`
<SelectList
  id="selectlistexample"
  onChange={() => {}}
  options={[
    {label:'Austin', value: 'austin'},
    {label:'Los Angeles', value: 'la'},
    {label:'New York', value: 'nyc'},
    {label:'San Francisco', value: 'sf'},
    {label:'Seattle', value: 'seattle'},
  ]}
  label='City'
/>`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description="Use SelectList when additional functionality such as subtext or images are needed. Use Dropdown instead."
        defaultCode={`
<SelectList
  id="selectlistexample"
  onChange={() => {}}
  options={[
    {label:'Austin', value: 'austin'},
    {label:'I want to put an image of Los Angeles here, but I can’t :( ', value: 'la'},
    {label:'New York', value: 'nyc'},
    {label:'San Francisco - there should be subtext for this option. D:', value: 'sf'},
    {label:'Seattle', value: 'seattle'},
  ]}
  label='City'
/>`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Order the list items in SelectList either alphabetically or by usage."
        defaultCode={`
<SelectList
  id="selectlistexample"
  onChange={() => {}}
  options={[
    {label:'Alberto', value: 'alberto'},
    {label:'Annie', value: 'annie'},
    {label:'Ashley', value: 'ashley'},
    {label:'Ayesha', value: 'ayesha'},
    {label:'Ryan', value: 'ryan'},
  ]}
  label='People who are awesome'
/>`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description="Use SelectList if there are fewer than 4 items in the list and there is space to display all options. Use RadioButtons instead."
        defaultCode={`
<SelectList
  id="selectlistexample"
  onChange={() => {}}
  options={[
    {label:'No', value: 'no'},
    {label:'Absolutely not', value: 'noagain'},
  ]}
  label='Is this a good use of a SelectList?'
/>`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Keep the same type of selection for a group of items. An example of this might be a filter bar. If some items could use SelectList and some items need to use Dropdown, use Dropdown for all the items in the group."
        defaultCode={`
<Flex>
  <SelectList
    id="selectlistexample"
    onChange={() => {}}
    options={[
      {label:'Filter value 1', value: 'fv11'},
      {label:'Filter value 2', value: 'fv12'},
    ]}
    placeholder='Filter 1'
  />
  <SelectList
    id="selectlistexample"
    onChange={() => {}}
    options={[
      {label:'Filter value 1', value: 'fv21'},
      {label:'Filter value 2', value: 'fv22'},
    ]}
    placeholder='Filter 2'
  />
</Flex>`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description="Mix Dropdown and SelectList in a group of items."
        defaultCode={`
<Flex>
  <SelectList
    id="selectlistexample"
    onChange={() => {}}
    options={[
      {label:'Filter value 1', value: 'fv11'},
      {label:'Filter value 2', value: 'fv12'},
    ]}
    placeholder='SelectList'
  />
  <Button
    accessibilityControls="basic-dropdown-example"
    accessibilityHaspopup
    iconEnd="arrow-down"
    text="Dropdown"
    inline
  />
</Flex>`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Accessibility">
    <MainSection.Subsection
      title="Labels"
      description={`
      SelectList comes with Label built-in: just use the \`label\` prop. Be sure to provide a unique id so the Label is associated with the correct SelectList.`}
    />
  </MainSection>,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection title="Size">
      <MainSection.Card
        cardSize="md"
        title="Large"
        description={`Use \`lg\` as the default size within Pinterest products.`}
        defaultCode={`<SelectList
        id="selectlistexample"
        onChange={() => {}}
        options={[
          {label:'Austin', value: 'austin'},
          {label:'Los Angeles', value: 'la'},
          {label:'New York', value: 'nyc'},
          {label:'San Francisco', value: 'sf'},
          {label:'Seattle', value: 'seattle'},
        ]}
        size='lg'
      />`}
      />
      <MainSection.Card
        cardSize="md"
        title="Medium"
        description={`Use \`md\` on denser surfaces, such as Business products or internal tools.`}
        defaultCode={`<SelectList
        id="selectlistexample"
        onChange={() => {}}
        options={[
          {label:'Austin', value: 'austin'},
          {label:'Los Angeles', value: 'la'},
          {label:'New York', value: 'nyc'},
          {label:'San Francisco', value: 'sf'},
          {label:'Seattle', value: 'seattle'},
        ]}
        size='md'
      />`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Helper text"
      description="Helper text should be used when additional description may be required to understand the SelectList. Most commonly, this could be text that is legally required to be displayed, or instructions to fill out a form (e.g. proper formatting). If the text is optional, Tooltip could be used instead."
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`<SelectList
        id="selectlistexample"
        onChange={() => {}}
        options={[
          {label:'Belgium', value: 'belgium'},
          {label:'Brazil', value: 'brazil'},
          {label:'Japan', value: 'japan'},
          {label:'New Zealand', value: 'newzealand'},
          {label:'Tanzania', value: 'tanzania'},
          {label:'United States', value: 'usa'},
        ]}
        label='Country'
        helperText='Pick your favorite country (the one with the best fries)'
      />`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="States">
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="lg"
        title="Default"
        defaultCode={`<SelectList
        id="selectlistexample"
        onChange={() => {}}
        options={[
          {label:'Austin', value: 'austin'},
          {label:'Los Angeles', value: 'la'},
          {label:'New York', value: 'nyc'},
          {label:'San Francisco', value: 'sf'},
          {label:'Seattle', value: 'seattle'},
        ]}
        label='City'
      />`}
      />
      <MainSection.Card
        cardSize="lg"
        title="Focused"
        defaultCode={`<SelectList
        id="selectlistexample"
        onChange={() => {}}
        options={[
          {label:'Austin', value: 'austin'},
          {label:'Los Angeles', value: 'la'},
          {label:'New York', value: 'nyc'},
          {label:'San Francisco', value: 'sf'},
          {label:'Seattle', value: 'seattle'},
        ]}
        label='City'
        focus
      />`}
      />
      <MainSection.Card
        cardSize="lg"
        title="Error"
        description={`Use \`errorMessage\` to pass in a description of the error in SelectList.`}
        defaultCode={`<SelectList
        id="selectlistexample"
        onChange={() => {}}
        options={[
          {label:'Basketweaving', value: 'basketweaving'},
          {label:'Bird watching', value: 'birdwatching'},
          {label:'Comic books', value: 'comicbooks'},
          {label:'Juggling', value: 'juggling'},
          {label:'Sailing', value: 'sailing'},
        ]}
        value='sailing'
        label='Hobby'
        errorMessage='Sailing is not a hobby, it is a passion'
      />`}
      />
      <MainSection.Card
        cardSize="lg"
        title="Disabled"
        defaultCode={`<SelectList
        id="selectlistexample"
        onChange={() => {}}
        options={[
          {label:'Austin', value: 'austin'},
          {label:'Los Angeles', value: 'la'},
          {label:'New York', value: 'nyc'},
          {label:'San Francisco', value: 'sf'},
          {label:'Seattle', value: 'seattle'},
        ]}
        label='City'
        disabled={true}
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
`}
    />
  </MainSection>,
);
export default cards;
