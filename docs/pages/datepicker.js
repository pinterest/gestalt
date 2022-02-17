// @flow strict-local
import { type Node, useState } from 'react';
import DatePicker from 'gestalt-datepicker';
import {
  arSA,
  cs,
  da,
  de,
  el,
  enGB,
  enUS,
  es,
  fi,
  fr,
  hi,
  hu,
  id,
  it,
  ja,
  ko,
  ms,
  nb,
  nl,
  pl,
  ptBR,
  pt,
  ro,
  ru,
  sk,
  sv,
  th,
  tr,
  uk,
  vi,
  zhCN,
  zhTW,
} from 'date-fns/locale';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import Combination from '../components/Combination.js';
import MainSection from '../components/MainSection.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';

const localeMap = {
  'ar-SA': { localeData: arSA, lang: ' Arabic (Saudi Arabia)' },
  'cs-CZ': { localeData: cs, lang: ' Czech' },
  'da-DK': { localeData: da, lang: ' Danish' },
  de: { localeData: de, lang: ' German' },
  'el-GR': { localeData: el, lang: ' Greek' },
  'en-GB': { localeData: enGB, lang: ' English (British)' },
  'en-US': { localeData: enUS, lang: ' English (US)' },
  es: { localeData: es, lang: ' Spanish' },
  'fi-FI': { localeData: fi, lang: ' Finnish' },
  fr: { localeData: fr, lang: ' French' },
  'hi-IN': { localeData: hi, lang: ' Hindi' },
  'hu-HU': { localeData: hu, lang: ' Hungarian' },
  'id-ID': { localeData: id, lang: ' Indonesian' },
  it: { localeData: it, lang: ' Italian' },
  ja: { localeData: ja, lang: ' Japanese' },
  'ko-KR': { localeData: ko, lang: ' Korean' },
  'ms-MY': { localeData: ms, lang: ' Malay' },
  'nb-NO': { localeData: nb, lang: ' Norwegian (Bokm\u00e5l)' },
  nl: { localeData: nl, lang: ' Dutch' },
  'pl-PL': { localeData: pl, lang: ' Polish (Poland)' },
  'pt-BR': { localeData: ptBR, lang: ' Portuguese (Brazilian)' },
  'pt-PT': { localeData: pt, lang: ' Portuguese (Portugal)' },
  'ro-RO': { localeData: ro, lang: ' Romanian' },
  'ru-RU': { localeData: ru, lang: ' Russian' },
  'sk-SK': { localeData: sk, lang: ' Slovak' },
  'sv-SE': { localeData: sv, lang: ' Swedish' },
  'th-TH': { localeData: th, lang: ' Thai' },
  tr: { localeData: tr, lang: ' Turkish' },
  'uk-UA': { localeData: uk, lang: ' Ukrainian' },
  'vi-VN': { localeData: vi, lang: ' Vietnamese' },
  'zh-CN': { localeData: zhCN, lang: ' Chinese (Simplified)' },
  'zh-TW': { localeData: zhTW, lang: ' Chinese (Traditional)' },
};

export default function DatePickerPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="DatePicker">
      <PageHeader
        name="DatePicker"
        description={generatedDocGen?.description}
        defaultCode={`
      function DatePickerExample() {
        const handleChange = (value) => value;

        return (
          <DatePicker
            id="example-page-header"
            label="Select a date"
            onChange={({ value }) => handleChange(value)}
          />
        )
      }
    `}
      />
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to Use"
            description={`
          - Allowing users to choose a date or date range by clicking through the calendar popup or typing in the text field.
          - Limiting date options to a specific range of dates.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
          - When the native date picking experience is preferred (typically mobile and mWeb experiences). In this case, use [TextField](/textfield) with type=”date”.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <Example
        description="
    Use DatePicker to select date inputs.
  "
        name="Example: Basic Date Picker"
        defaultCode={`
function DatePickerExample() {
  const handleChange = (value) => value;

  return (
    <DatePicker
      id="example-basic"
      label="Select a date"
      onChange={({value}) => handleChange(value)}
    />
  )
}
`}
      />
      <Example
        description="
    Provide pre-selected date values to DatePicker.
  "
        id="preselectedValue"
        name="Example: Preselected Date"
        defaultCode={`
function DatePickerExample() {
  const handleChange = (value) => value;

  return (
    <DatePicker
      id="example-preselected value"
      label="Alberto's birth date"
      onChange={({value}) => handleChange(value)}
      value={new Date(1985,6,4)}
    />
  )
}
`}
      />
      <Example
        id="rangePicker"
        description="
    Use DatePicker to select date range inputs.
  "
        name="Example: Date Range Picker"
        defaultCode={`
function DatePickerRangeExample() {
  const [startDate, setStartDate] = React.useState(undefined);
  const [endDate, setEndDate] = React.useState(undefined);
  const endDateInput = React.useRef(null)
  const startDateInput = React.useRef(null)

  return (
    <Flex gap={2}>
      <DatePicker
        rangeStartDate={startDate}
        rangeEndDate={endDate}
        id="example-start-date"
        label="Check In"
        nextRef={endDateInput}
        onChange={({ event, value }) => {
          setStartDate(value);
        }}
        rangeSelector="start"
        value={startDate}
        ref={startDateInput}
      />
      <DatePicker
        rangeStartDate={startDate}
        rangeEndDate={endDate}
        id="example-end-date"
        label="Check Out"
        nextRef={startDateInput}
        onChange={({ event, value }) => setEndDate(value)}
        rangeSelector="end"
        value={endDate}
        ref={endDateInput}
      />
    </Flex>
  );
}
`}
      />
      <Example
        id="disabled"
        name="Example: Disabled"
        defaultCode={`
function DatePickerExample() {
  const [date, setDate] = React.useState(new Date());

  return (
    <DatePicker
      disabled
      id="example-disabled"
      label="User Activation Date"
      onChange={({value}) => setDate(value)}
      value={date}
    />
  )
}
`}
      />
      <Example
        id="maxMinDates"
        description="
    Disable dates outside of a min and max date range.
  "
        name="Example: Delimited selection period"
        defaultCode={`
function DatePickerExample() {
  const handleChange = (value) => value;

  return (
    <DatePicker
      id="example-maxMinDates"
      minDate={new Date(2020, 6, 6)}
      maxDate={new Date(2020, 6, 10)}
      label="Select a date"
      onChange={({value}) => handleChange(value)}
    />
  )
}
`}
      />
      <Example
        id="include"
        description="
    Enable an array of dates.
  "
        name="Example: Enabled dates"
        defaultCode={`
function DatePickerExample() {
  const handleChange = (value) => value;

  return (
    <DatePicker
      id="example-include"
      includeDates={[new Date(2020,2,11), new Date(2020,2,15)]}
      label="Select Your Appointment"
      onChange={({value}) => handleChange(value)}
    />
  )
}
`}
      />
      <Example
        id="exclude"
        description="
    Disable an array of dates.
  "
        name="Example: Disabled dates"
        defaultCode={`
function DatePickerExample() {
  const handleChange = (value) => value;

  return (
    <DatePicker
      id="example-exclude"
      excludeDates={[new Date(2020,2,11), new Date(2020,2,12)]}
      label="Select Your Appointment"
      onChange={({value}) => handleChange(value)}
      value={new Date(2020,2,9)}
    />
  )
}
`}
      />
      <Example
        id="helperText"
        description="
    Display a helper message for cases where you want to provide more information about the date field.
  "
        name="Example: Helper Text"
        defaultCode={`
function DatePickerExample() {
  return (
    <DatePicker
      helperText="Select a wonderfully sunny wedding date."
      id="example-helperText"
      label="Wedding Date"
      onChange={() => {}}
      value={new Date()}
    />
  )
}
`}
      />
      <Example
        id="errorMessage"
        description="
    Display an error message. Error message overrides the helper text.
  "
        name="Example: Error Message"
        defaultCode={`
function DatePickerExample() {
  const [date, setDate] = React.useState(undefined);

  return (
    <DatePicker
      errorMessage={!date ? "This field can't be blank!" : null}
      helperText="Select a preferred day for your training."
      id="example-errorMessage"
      label="Schedule Your Training"
      onChange={({value}) => setDate(value)}
    />
  )
}
`}
      />
      <Combination
        id="idealDirection"
        name="Example: Ideal Direction"
        description="Define the preferred direction for the DatePicker popover to open. If that placement doesn't fit, the opposite direction will be used."
        layout="4column"
        idealDirection={['down', 'left', 'right', 'up']}
      >
        {({ idealDirection }) => (
          <DatePicker
            id={`example-idealDirection-${idealDirection}`}
            label={`Direction ${idealDirection}`}
            onChange={() => {}}
            idealDirection={idealDirection}
          />
        )}
      </Combination>
      <Combination
        id="localeData"
        name="Example: Locales"
        description="
Adjust the date format to each date-fns locale (https://date-fns.org/v2.14.0/docs/Locale).
The following locale examples show the different locale format variants.
IMPORTANT: Locale data from date-fns is external to gestalt-datepicker, it's not an internal dependency. Add date-fns to your app's dependencies.
~~~jsx
import DatePicker from 'gestalt-datepicker';
import { it } from 'date-fns/locale';
<DatePicker localeData={it}/>
~~~
  "
        layout="4column"
        localeDataCode={Object.keys(localeMap)}
      >
        {({ localeDataCode }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [date, setDate] = useState(new Date());

          return (
            <DatePicker
              id={`example-${localeDataCode}`}
              label={localeMap[localeDataCode].lang}
              onChange={({ value }) => setDate(value)}
              value={date}
              localeData={localeMap[localeDataCode].localeData}
            />
          );
        }}
      </Combination>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: {
      generatedDocGen: await docgen({
        componentName: 'DatePicker',
      }),
    },
  };
}
