// @flow strict-local
import * as React from 'react';
import DatePicker from 'gestalt-datepicker';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';
import PropTable from './components/PropTable.js';
import Combination from './components/Combination.js';

const cards = [];
const card = c => cards.push(c);
const localeMap = {
  'ar-SA': ' Arabic (Saudi Arabia)',
  'cs-CZ': ' Czech',
  'da-DK': ' Danish',
  de: ' German',
  'el-GR': ' Greek',
  'en-AU': ' English (Australia)',
  'en-GB': ' English (British)',
  'en-IN': ' English (India)',
  'en-US': ' English (US)',
  'es-419': ' Spanish (Latin America)',
  'es-AR': ' Spanish (Argentina)',
  'es-ES': ' Spanish (Spain)',
  'es-MX': ' Spanish (Mexico)',
  'fi-FI': ' Finnish',
  fr: ' French',
  'hi-IN': ' Hindi',
  'hu-HU': ' Hungarian',
  'id-ID': ' Indonesian',
  it: ' Italian',
  ja: ' Japanese',
  'ko-KR': ' Korean',
  'ms-MY': ' Malay',
  'nb-NO': ' Norwegian (Bokm\u00e5l)',
  nl: ' Dutch',
  'pl-PL': ' Polish (Poland)',
  'pt-BR': ' Portuguese (Brazilian)',
  'pt-PT': ' Portuguese (Portugal)',
  'ro-RO': ' Romanian',
  'ru-RU': ' Russian',
  'sk-SK': ' Slovak',
  'sv-SE': ' Swedish',
  'th-TH': ' Thai',
  tr: ' Turkish',
  'uk-UA': ' Ukrainian',
  'vi-VN': ' Vietnamese',
  'zh-CN': ' Chinese (Simplified)',
  'zh-TW': ' Chinese (Traditional)',
};

card(
  <PageHeader
    name="DatePicker"
    description="Use Datepicker when the user has to select a date or date range."
    beta
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
        href: 'helperText',
      },
      { name: 'disabled', type: 'boolean', href: 'disabled' },
      {
        name: 'endDate',
        type: 'Date',
        description:
          'End date for which selection is enabled. Required for date range picker.',
        href: 'rangePicker',
      },
      { name: 'errorMessage', type: 'Node', href: 'errorMessage' },
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
        description:
          'isRTL (Right-To-Left) provides support to specific locales by positioning textfield icon accordingly',
      },
      { name: 'label', type: 'string' },
      {
        name: 'locale',
        required: true,
        type: `"ar-SA"|"cs-CZ"|"da-DK"|"de"|"el-GR"|"en-AU"|"en-GB"|"en-IN"|"en-US"|"es-419"|"es-AR"|"es-ES"|"es-MX"|"fi-FI"|"fr"|"hi-IN"|"hu-HU"|"id-ID"|"it"|"ja"|"ko-KR"|"ms-MY"|"nb-NO"|"nl"|"pl-PL"|"pt-BR"|"pt-PT"|"ro-RO"|"ru-RU"|"sk-SK"|"sv-SE"|"th-TH"|tr|"uk-UA"|"vi-VN"|"zh-CN"|"zh-TW"`,
        href: 'localeCombinations',
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
          'Defines a date field input to select the end date in a date range. Required for date range picker.',
        href: 'rangePicker',
      },
      {
        name: 'selectsStart',
        type: 'boolean',
        description:
          'Defines a date field input to select the start date in a date range. Required for date range picker.',
        href: 'rangePicker',
      },
      {
        name: 'startDate',
        type: 'Date',
        description:
          'Start date for which selection is enabled. Required for date range picker.',
        href: 'rangePicker',
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
    name="Example: Basic date picker field"
    defaultCode={`
function DatePickerExample() {
  const [date, setDate] = React.useState(new Date());
  return (
    <DatePicker
      accessibilityLabelNext='fakeAccessibilityLabelNext'
      accessibilityLabelPrevious='fakeAccessibilityLabelPrevious'
      accessibilityLabelIcon='fakeAccessibilityLabelIcon'
      id="example-basic"
      locale='en-US'
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
    id="rangePicker"
    description="
    You can use this component for a visual divider between two elements.
  "
    name="Example: Date range picker"
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
            onChange={handleSetStartDate}
            locale='en-US'
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
            onChange={handleSetEndDate}
            locale='en-US'
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

card(
  <Example
    id="example-disabled"
    description="
    DatePicker can display its own helper message for cases where you want to provide more information about the date field.
  "
    name="Example: Disabled"
    defaultCode={`
function DatePickerExample() {
  const [date, setDate] = React.useState(new Date());
  return (
    <DatePicker
      accessibilityLabelNext='fakeAccessibilityLabelNext'
      accessibilityLabelPrevious='fakeAccessibilityLabelPrevious'
      accessibilityLabelIcon='fakeAccessibilityLabelIcon'
      disabled
      id="disabled"
      locale='en-US'
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
    id="helperText"
    description="
    DatePicker can display its own helper message for cases where you want to provide more information about the date field.
  "
    name="Example: helperText"
    defaultCode={`
function DatePickerExample() {
  const [date, setDate] = React.useState(new Date());
  return (
    <DatePicker
      accessibilityLabelNext='fakeAccessibilityLabelNext'
      accessibilityLabelPrevious='fakeAccessibilityLabelPrevious'
      accessibilityLabelIcon='fakeAccessibilityLabelIcon'
      helperText={'https://pinterest.com/'}
      id="example-helperText"
      locale='en-US'
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
    id="errorMessage"
    description="
    DatePicker can display its own error message. To use our errors, simply pass in an errorMessage when there is an error present. Error message overrides helper text.
  "
    name="Example: Error message"
    defaultCode={`
function DatePickerExample() {
  const [date, setDate] = React.useState(undefined);
  return (
    <DatePicker
      accessibilityLabelNext='fakeAccessibilityLabelNext'
      accessibilityLabelPrevious='fakeAccessibilityLabelPrevious'
      accessibilityLabelIcon='fakeAccessibilityLabelIcon'
      errorMessage={!date ? "This field can't be blank!" : null}
      helperText={'https://pinterest.com/'}
      id="example-errorMessage"
      locale='en-US'
      onChange={({value}) => setDate(value)}
      value={date}
    />

  )
}
`}
  />
);

card(
  <Combination
    id="localeCombinations"
    name="Locales"
    locale={[...Object.keys(localeMap)]}
  >
    {({ locale }) => (
      <DatePicker
        id={`example-${locale}`}
        accessibilityLabelNext="fakeAccessibilityLabelNext"
        accessibilityLabelPrevious="fakeAccessibilityLabelPrevious"
        accessibilityLabelIcon="fakeAccessibilityLabelIcon"
        onChange={() => {}}
        label={localeMap[locale]}
        locale={locale}
        value={new Date()}
      />
    )}
  </Combination>
);

export default cards;
