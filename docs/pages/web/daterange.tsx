import { useState } from 'react';
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
import { BannerSlim, Flex, SelectList } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import disabledFuture from '../../examples/daterange/disabledFuture';
import disabledPast from '../../examples/daterange/disabledPast';
import errorMessaging from '../../examples/daterange/errorMessaging';
import futureRadiogroup from '../../examples/daterange/futureRadioGroup';
import implementation from '../../examples/daterange/implementation';
import localizationLabels from '../../examples/daterange/localizationLabels';
import main from '../../examples/daterange/main';
import mobile from '../../examples/daterange/mobile';
import pastRadiogroup from '../../examples/daterange/pastRadioGroup';
import readOnly from '../../examples/daterange/readOnly';
import secondaryDateRange from '../../examples/daterange/secondaryDateRange';
import secondaryErrorMessages from '../../examples/daterange/secondaryErrorMessages';

const PREVIEW_HEIGHT = 600;

const localeMap = {
  af: { localeData: af, lang: 'Afrikaans' },
  'ar-SA': { localeData: arSA, lang: 'Arabic (Saudi Arabia)' },
  bg: { localeData: bg, lang: 'Bulgarian' },
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
  hr: { localeData: hr, lang: 'Croatian' },
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
} as const;

export default function DatePickerPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  const [locale, setLocale] = useState<string | null>(null);

  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        badge="pilot"
        bannerSlim={
          <BannerSlim
            iconAccessibilityLabel="Warning message"
            message="DateRange is an pilot component. Expect development and design iteration and breaking API changes."
            type="warning"
          />
        }
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
      >
        <SandpackExample
          code={main}
          hideEditor
          layout="column"
          name={`Main ${generatedDocGen?.displayName} example`}
          previewHeight={PREVIEW_HEIGHT}
        />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            description={`
- When asking users to select past, present or future date ranges
- When users can pick between pre-selected date ranges or input a custom date range
`}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            description={`
- When users need to select one specific day. Use [DatePicker](/web/datepicker) instead
- When users need to input a date value with a numeric keyboard, for example when adding a birthday date. Use [DateField](/web/datefield) instead
`}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            description={`
- Disable future or past dates according to the use case. If the user would like to see predictions, for example, disable the past.
- When possible, provide a list of applicable date ranges to facilitate user selection
`}
            title="Do"
            type="do"
          />
          <MainSection.Card
            description={`
- Enable users to select dates in the future or past, if those dates are not a valid input
- Provide a long of a list of applicable date ranges with confusing labels, to avoid confusing the user. Display concise options and in a logical order.
`}
            title="Don't"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <LocalizationSection
        code={localizationLabels}
        layout="column"
        name={generatedDocGen?.displayName}
        previewHeight={PREVIEW_HEIGHT}
      >
        <MainSection.Subsection
          description={`DateRange supports multiple locales. Adjust the date format to each [date-fns locale](https://date-fns.org/v2.14.0/docs/Locale). The following locale examples show the different locale format variants.

Note that locale data from date-fns is external to gestalt-datepicker, it's not an internal dependency. Add date-fns to your app's dependencies.

~~~jsx
import { DateRange } from 'gestalt-datepicker';
import { it } from 'date-fns/locale';
<DateRange localeData={it}/>
~~~

Use the SelectList to try out different locales by passing in the \`localeData\` prop.`}
          title="Date format locales"
        >
          <Flex direction="row" gap={4} wrap>
            <Flex.Item flex="none">
              <SelectList
                id="selectlistexample1"
                label="Country"
                onChange={({ value }) => setLocale(value)}
                size="lg"
              >
                {Object.keys(localeMap).map((localeKey) => (
                  <SelectList.Option
                    key={localeKey}
                    // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly af: { readonly localeData: Locale; readonly lang: "Afrikaans"; }; readonly 'ar-SA': { readonly localeData: Locale; readonly lang: "Arabic (Saudi Arabia)"; }; ... 33 more ...; readonly 'zh-TW': { ...; }; }'.
                    label={localeMap[localeKey].lang}
                    value={localeKey}
                  />
                ))}
              </SelectList>
            </Flex.Item>
            <DateRange
              dateValue={{ startDate: new Date(), endDate: null }}
              // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly af: { readonly localeData: Locale; readonly lang: "Afrikaans"; }; readonly 'ar-SA': { readonly localeData: Locale; readonly lang: "Arabic (Saudi Arabia)"; }; ... 33 more ...; readonly 'zh-TW': { ...; }; }'.
              localeData={locale ? localeMap[locale].localeData : undefined}
              onCancel={() => {}}
              onDateChange={() => {}}
              onSubmit={() => {}}
            />
          </Flex>
        </MainSection.Subsection>
      </LocalizationSection>
      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
DateRange is a controlled component.
Use \`dateValue\`, \`onDateChange\`, \`onDateError\`, \`onSubmit\` and \`onCancel\` to implement it correctly.

Follow the implementation in the example to implement a controlled DateRange correctly.

When there’s not a date range selected, the call-to-action is disabled to prevent user errors.

\`onSubmit\` and \`onCancel\` are optional props. When not used, make sure DateRange is accessible implementing Popover's onDismiss correctly, as shown in the example. Otherwise, DateRange might not be able to be dismissed if the user performs no changes in the data.
          `}
          title="Controlled component"
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={implementation}
                layout="column"
                name="implementation example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="This variant allow users to select common options of date ranges, so they can select an option without having to navigate through the calendar picker."
          title="With RadioGroup"
        >
          <MainSection.Card
            cardSize="md"
            description="Use RadioGroup to select pre-established date ranges in the future. For example, activation dates for a new campaign."
            sandpackExample={
              <SandpackExample
                code={futureRadiogroup}
                layout="column"
                name="future radiogroup"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="Future selection"
          />
          <MainSection.Card
            cardSize="md"
            description="Use RadioGroup to select pre-established date ranges in the past. For example, date ranges to analize performance metrics in ongoing campaigns."
            sandpackExample={
              <SandpackExample
                code={pastRadiogroup}
                layout="column"
                name="past radiogroup"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="Past selection"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
DateRange can communicate errors when the user selects an invalid date. Use \`dateErrorMessage\`, \`onDateError\`, \`onDateBlur\`, \`onDateFocus\`, to implement error messaging correctly.

The following implementation shows how to use all required props for error messaging.

The \`onDateError\` event are very noisy. If the date fields are not pre-populated, leverage \`onDateBlur\` to validate the error state after the date fields lose focus. If the date fields are pre-populated leverage React's useEffect to validate the error state.
          `}
          title="Error messaging"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={errorMessaging}
                layout="column"
                name="error example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            description={`The secondary input fields also support error messages, you can control them with the \`secondaryDateErrorMessage\` prop.`}
            sandpackExample={
              <SandpackExample
                code={secondaryErrorMessages}
                layout="column"
                name="secondary errors example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="Secondary date errors"
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`DateField supports disabling future and past dates from being selected. Use \`minDate\` for disabling past dates and \`maxDate\` for disabling futures dates.
 1. Disable past. Disable the past when the user should select dates ranges in the future. For example, activation dates for a new campaign.
 2. Disable future. Disable the future when the user should select dates ranges in the past. For example, date ranges to analize performance metrics in ongoing campaigns.
        `}
          title="Disable past & future dates"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={disabledPast}
                layout="column"
                name="past example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="Disable past"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={disabledFuture}
                layout="column"
                name="future example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="Disable future"
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          badge="experimental"
          description={`DateRange consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onRender](/web/utilities/globaleventshandlerprovider#onRender): executed when DateField mounts for the first time

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#onRender) for more information.
`}
          title="External handlers"
        />

        <MainSection.Subsection
          description={`
DateRange requires [DeviceTypeProvider](/web/utilities/devicetypeprovider) to enable its mobile user interface. The example below shows the mobile platform UI and its implementation.

On mobile devices, the \`radiogroup\` prop is not shown.
  `}
          title="Mobile"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={mobile} layout="mobileRow" name="Mobile example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
DateRange supports a secondary date range in case you need to handle more that one range, in order to enable it you just need to pass the props \`secondaryDateValue\` and \`onSecondaryDateChange\`. One scenario for this could be if you need to compare/monitor metrics of two periods of time when creating campaigns.`}
          title="Secondary date range"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={secondaryDateRange}
                layout="column"
                name="Secondary date range example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection description="DateRange supports read-only date inputs, this option prevents the user from changing the date values from the date fields (not from interacting with the fields). " title="Read only">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={readOnly}
                layout="column"
                name="Read only example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Use concise labels to indicate what the date range selection is referring to`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Add long and complicated labels to the date range picker and to the RadioGroup labels
`}
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-extensions#daterange',
            text: 'DateRange extension',
          },
        ]}
      />

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

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('DateRange') },
  };
}
