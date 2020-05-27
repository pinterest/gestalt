// @flow strict-local
import * as React from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="DatePicker"
    description="Use radio buttons when the user has to select a date or date range."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityLabelIcon',
        required: true,
        type: 'string',
        description:
          'Accessibility label for the calendar icon on the date field input that clients such as VoiceOver will read to describe the element.',
      },
      {
        name: 'accessibilityLabelNext',
        required: true,
        type: 'string',
        description:
          'Accessibility label for the next-month button on the calendar view that clients such as VoiceOver will read to describe the element.',
      },
      {
        name: 'accessibilityLabelPrevious',
        required: true,
        type: 'string',
        description:
          'Accessibility label for the previous-month button on the calendar view that clients such as VoiceOver will read to describe the element.',
      },
      {
        name: 'helperText',
        type: 'Node',
        description:
          'More information about how to complete the date picker field',
      },
      { name: 'disabled', type: 'boolean' },
      {
        name: 'endDate',
        type: 'Date',
        description: 'End date for which selection is enabled',
      },
      { name: 'errorMessage', type: 'Node' },
      {
        name: 'excludeDates',
        type: 'Array<Date>',
        description: 'Array of disabled dates for selection',
      },
      { name: 'id', required: true, type: 'string' },
      {
        name: 'idealDirection',
        type: `'up'|'right'|'down'|'left'`,
        description: 'Preferred direction for the calendar flyout to open',
      },
      {
        name: 'includeDates',
        type: 'Array<Date>',
        description: 'Array of enabled dates for selection',
      },
      {
        name: 'isRTL',
        type: 'boolean',
        defaultValue: false,
        description: 'Pending',
      },
      { name: 'label', type: 'string' },
      {
        name: 'locale',
        required: true,
        defaultValue: 'en-US',
        type: `"ar-SA"|"cs-CZ"|"da-DK"|"de"|"el-GR"|"en-AU"GB|"en-GB"GB|"en-IN"GB|"en-US"US|"es-419"|"es-AR"|"es-ES"|"es-MX"|"fi-FI"|"fr"|"hi-IN"|"hu-HU"|"id-ID"|"it"|"ja"|"ko-KR"|"ms-MY"|"nb-NO"|"nl"|"pl-PL"|"pt-BR"|"pt-PT"|"ro-RO"|"ru-RU"|"sk-SK"|"sv-SE"|"th-TH"|tr|"uk-UA"|"vi-VN"|"zh-CN"|"zh-TW"`,
      },
      {
        name: 'maxDate',
        type: 'Date',
        description: 'End date for which range selection is enabled',
      },
      {
        name: 'minDate',
        type: 'Date',
        description: 'Start date for which range selection is enabled',
      },
      {
        name: 'onChange',
        required: true,
        type: '({event: SyntheticInputEvent<>, value: Date }) => void',
      },
      { name: 'placeholder', type: 'string' },
      {
        name: 'selectsEnd',
        type: 'boolean',
        description:
          'Defines a date field input to select the end date in a date range',
      },
      {
        name: 'selectsStart',
        type: 'boolean',
        description:
          'Defines a date field input to select the start date in a date range',
      },
      {
        name: 'startDate',
        type: 'Date',
        description: 'Start date for which selection is enabled',
      },
      { name: 'value', type: 'Date', description: 'Selected date value' },
    ]}
  />
);

card(
  <Example
    description="
    Use this component to select date inputs.
  "
    name="Example"
    defaultCode={`
function DatePickerExample() {
  const [date, setDate] = React.useState(new Date());
  return (
    <DatePicker
      accessibilityLabelNext='fakeAccessibilityLabelNext'
      accessibilityLabelPrevious='fakeAccessibilityLabelPrevious'
      accessibilityLabelIcon='fakeAccessibilityLabelIcon'
      id="fakeId"
      locale="es-ES"
      onChange={({value}) => setDate(value)}
      value={date}
    />

  )
}
`}
  />
);

card(
  <Example
    description="
    You can use this component for a visual divider between two elements.
  "
    name="Example"
    defaultCode={`
function DatePickerRangeExample() {
  const [startDate, setStartDate] = React.useState(undefined);
  const [endDate, setEndDate] = React.useState(undefined);

  const handleSetStartDate = ({ event, value }) => setStartDate(value);
  const handleSetEndDate = ({ event, value }) => setEndDate(value);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="between"
        marginStart={-1}
        marginEnd={-1}
      >
        <Box column={6} paddingX={1}>
          <DatePicker
            startDate={startDate}
            accessibilityLabelNext='Go to next month'
            accessibilityLabelPrevious='Go to previous month'
            accessibilityLabelIcon='Select a start date'
            endDate={endDate}
            id='1'
            idealDirection="up"
            locale='en-US'
            onChange={handleSetStartDate}
            placeholder='Start Date'
            selectsStart
            value={startDate}
          />
        </Box>
        <Box column={6} paddingX={1}>
          <DatePicker
            startDate={startDate}
            accessibilityLabelNext='Go to next month'
            accessibilityLabelPrevious='Go to previous month'
            accessibilityLabelIcon='Select an end date'
            endDate={endDate}
            id='2'
            idealDirection="up"
            locale='en-US'
            onChange={handleSetEndDate}
            placeholder='End Date'
            selectsEnd
            value={endDate}
          />
        </Box>
      </Box>
    </Box>
  );
}
`}
  />
);

export default cards;
