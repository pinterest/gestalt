// @flow strict-local
import { type Node, useState } from 'react';
import {
  af,
  arSA,
  bg,
  cs,
  da,
  de,
  el,
  enGB,
  enUS,
  es,
  fi,
  fr,
  he,
  hi,
  hr,
  hu,
  id,
  it,
  ja,
  ko,
  ms,
  nb,
  nl,
  pl,
  pt,
  ptBR,
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
import { Flex, SelectList, SlimBanner } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import disabledFuture from '../../examples/daterange/disabledFuture.js';
import disabledPast from '../../examples/daterange/disabledPast.js';
import errorMessaging from '../../examples/daterange/errorMessaging.js';
import futureRadiogroup from '../../examples/daterange/futureRadioGroup.js';
import implementation from '../../examples/daterange/implementation.js';
import main from '../../examples/daterange/main.js';
import pastRadiogroup from '../../examples/daterange/pastRadioGroup.js';

const localeMap = {
  'af': { localeData: af, lang: 'Afrikaans' },
  'ar-SA': { localeData: arSA, lang: 'Arabic (Saudi Arabia)' },
  'bg': { localeData: bg, lang: 'Bulgarian' },
  'cs-CZ': { localeData: cs, lang: 'Czech' },
  'da-DK': { localeData: da, lang: 'Danish' },
  de: { localeData: de, lang: 'German' },
  'el-GR': { localeData: el, lang: 'Greek' },
  'en-GB': { localeData: enGB, lang: 'English (British)' },
  'en-US': { localeData: enUS, lang: 'English (US)' },
  es: { localeData: es, lang: 'Spanish' },
  'fi-FI': { localeData: fi, lang: 'Finnish' },
  fr: { localeData: fr, lang: 'French' },
  he: { localeData: he, lang: 'Hebrew' },
  'hi-IN': { localeData: hi, lang: 'Hindi' },
  'hr': { localeData: hr, lang: 'Croatian' },
  'hu-HU': { localeData: hu, lang: 'Hungarian' },
  'id-ID': { localeData: id, lang: 'Indonesian' },
  it: { localeData: it, lang: 'Italian' },
  ja: { localeData: ja, lang: 'Japanese' },
  'ko-KR': { localeData: ko, lang: 'Korean' },
  'ms-MY': { localeData: ms, lang: 'Malay' },
  'nb-NO': { localeData: nb, lang: 'Norwegian (Bokm\u00e5l)' },
  nl: { localeData: nl, lang: 'Dutch' },
  'pl-PL': { localeData: pl, lang: 'Polish (Poland)' },
  'pt-BR': { localeData: ptBR, lang: 'Portuguese (Brazilian)' },
  'pt-PT': { localeData: pt, lang: 'Portuguese (Portugal)' },
  'ro-RO': { localeData: ro, lang: 'Romanian' },
  'ru-RU': { localeData: ru, lang: 'Russian' },
  'sk-SK': { localeData: sk, lang: 'Slovak' },
  'sv-SE': { localeData: sv, lang: 'Swedish' },
  'th-TH': { localeData: th, lang: 'Thai' },
  tr: { localeData: tr, lang: 'Turkish' },
  'uk-UA': { localeData: uk, lang: 'Ukrainian' },
  'vi-VN': { localeData: vi, lang: 'Vietnamese' },
  'zh-CN': { localeData: zhCN, lang: 'Chinese (Simplified)' },
  'zh-TW': { localeData: zhTW, lang: 'Chinese (Traditional)' },
};

export default function DatePickerPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  const [locale, setLocale] = useState<string | null>(null);

  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        badge="pilot"
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        slimBanner={
          <SlimBanner
            type="warning"
            iconAccessibilityLabel="Warning message"
            message="DateRange is an pilot component. Expect development and design iteration and breaking API changes."
          />
        }
      >
        <SandpackExample
          code={main}
          name={`Main ${generatedDocGen?.displayName} example`}
          hideEditor
          previewHeight={500}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            title="When to use"
            description={`
- When asking users to select past, present or future date ranges
- When users can pick between pre-selected date ranges or input a custom date range
`}
          />
          <MainSection.Card
            type="don't"
            title="When not to use"
            description={`
- When users need to select one specific day. Use [DatePicker](/web/datepicker) instead
- When users need to input a date value with a numeric keyboard, for example when adding a birthday date. Use [DateField](/datefield) instead
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            title="Do"
            description={`
- Disable future or past dates according to the use case. If the user would like to see predictions, for example, disable the past.
- When possible, provide a list of applicable date ranges to facilitate user selection
`}
          />
          <MainSection.Card
            type="don't"
            title="Don't"
            description={`
- Enable users to select dates in the future or past, if those dates are not a valid input
- Provide a long of a list of applicable date ranges with confusing labels, to avoid confusing the user. Display concise options and in a logical order.
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Controlled component"
          description={`
DateRange is a controlled component. Follow the implementation in the example to implement a controlled DateRange correctly.

When there’s not a date range selected, the call-to-action disables to prevent user errors.
          `}
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={implementation}
                name="implementation example"
                previewHeight={500}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="With RadioGroup"
          description="This variant allow users to select common options of date ranges, so they can select an option without having to navigate through the calendar picker."
        >
          <MainSection.Card
            cardSize="md"
            title="Future selection"
            sandpackExample={
              <SandpackExample
                code={futureRadiogroup}
                name="future radiogroup"
                previewHeight={500}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            title="Past selection"
            sandpackExample={
              <SandpackExample code={pastRadiogroup} name="past radiogroup" previewHeight={500} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Error messaging"
          description="DateRange can communicate errors when the user selects an invalid date. Use `startDateErrorMessage`, `endDateErrorMessage` and `onStartDateChange`, `onEndDateChange` to implement error messaging correctly."
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample code={errorMessaging} name="error example" previewHeight={500} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Disable future & past"
          description="DateField supports disabling future and past dates from being selected."
        >
          <MainSection.Card
            cardSize="md"
            title="Disable past"
            sandpackExample={
              <SandpackExample code={disabledPast} name="past example" previewHeight={500} />
            }
          />
          <MainSection.Card
            cardSize="md"
            title="Disable future"
            sandpackExample={
              <SandpackExample code={disabledFuture} name="future example" previewHeight={500} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Supporting locales"
          description="Select the correct locale to see DataRange's selected locale support."
        >
          <Flex gap={4} direction="column" flex="none">
            <SelectList
              id="selectlistexample1"
              label="Country"
              size="lg"
              onChange={({ value }) => setLocale(value)}
            >
              {Object.keys(localeMap).map((localeKey) => (
                <SelectList.Option
                  key={localeKey}
                  label={localeMap[localeKey].lang}
                  value={localeKey}
                />
              ))}
            </SelectList>
            <DateRange
              startDateValue={new Date()}
              endDateValue={null}
              onStartDateChange={() => {}}
              onEndDateChange={() => {}}
              onStartDateError={() => {}}
              onEndDateError={() => {}}
              localeData={locale ? localeMap[locale].localeData : undefined}
              onSubmit={() => {}}
              onCancel={() => {}}
            />
          </Flex>
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Use concise labels to indicate what the date range selection is referring to`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Add long and complicated labels to the date range picker and to the RadioGroup labels
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[DateField](/web/datefield)**
DateField is used when the user has to select a date. Compared to DatePicker, DateField has no supporting calendar to select a date, the user must input date values with a numeric keyboard.
`}
        />
        <MainSection.Subsection
          description={`
**[DatePicker](/web/datepicker)**
DatePicker is used when the user has to select a date.  Compared to DateField, DatePicker has a supporting calendar to select a date.`}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('DateRange') },
  };
}
