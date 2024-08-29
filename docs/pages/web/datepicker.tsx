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
import { Flex, SelectList } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import CombinationNew from '../../docs-components/CombinationNew';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import controlled from '../../examples/datepicker/controlled';
import disable from '../../examples/datepicker/disable';
import disabled from '../../examples/datepicker/disabled';
import disableSelected from '../../examples/datepicker/disableSelected';
import error from '../../examples/datepicker/error';
import helperText from '../../examples/datepicker/helperText';
import main from '../../examples/datepicker/main';
import preselected from '../../examples/datepicker/preselected';
import range from '../../examples/datepicker/range';
import selectLists from '../../examples/datepicker/selectLists';

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

const PREVIEW_HEIGHT = 480;

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  const [locale, setLocale] = useState<string | null>('en-US');
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <Page title="DatePicker">
      <PageHeader description={generatedDocGen?.description} name="DatePicker" pdocsLink>
        <SandpackExample
          code={main}
          hideEditor
          name={`Main ${generatedDocGen?.displayName} example`}
          previewHeight={PREVIEW_HEIGHT}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - Allowing users to choose a date or date range by clicking through the calendar popup or typing in the text field.
          - Limiting date options to a specific range of dates.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - When the native date picking experience is preferred (typically mobile and mWeb experiences). In this case, use [TextField](/web/textfield) with type=”date”.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <LocalizationSection
        layout="column"
        name={generatedDocGen?.displayName}
        noDefaultLabelProvider
        previewHeight={PREVIEW_HEIGHT}
      >
        <MainSection.Subsection
          description={`DatePicker supports multiple locales. Adjust the date format to each [date-fns locale](https://date-fns.org/v2.14.0/docs/Locale).

The following locale examples show the different locale format variants.

Note that locale data from date-fns is external to gestalt-datepicker, it's not an internal dependency. Add date-fns to your app's dependencies.

~~~jsx
import { DatePicker } from 'gestalt-datepicker';
import { it } from 'date-fns/locale';
<DatePicker localeData={it}/>
~~~

Use the SelectList to try out different locales by passing in the \`localeData\` prop.
`}
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
            <DatePicker
              id="locale-example"
              // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly af: { readonly localeData: Locale; readonly lang: "Afrikaans"; }; readonly 'ar-SA': { readonly localeData: Locale; readonly lang: "Arabic (Saudi Arabia)"; }; ... 33 more ...; readonly 'zh-TW': { ...; }; }'.
              label={locale ? localeMap[locale].lang : undefined}
              // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly af: { readonly localeData: Locale; readonly lang: "Afrikaans"; }; readonly 'ar-SA': { readonly localeData: Locale; readonly lang: "Arabic (Saudi Arabia)"; }; ... 33 more ...; readonly 'zh-TW': { ...; }; }'.
              localeData={locale ? localeMap[locale].localeData : undefined}
              onChange={({ value }) => setDate(value)}
              selectLists={['month']}
              value={date}
            />
          </Flex>
        </MainSection.Subsection>
      </LocalizationSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          columns={2}
          description={`
DatePicker is a controlled component. Use \`value\`, \`onChange\`, \`onClearInput\` and \`onError\` to implement it correctly.

DatePicker is controlled when \`value\` is not "undefined". When \`value\` is "undefined", it stays uncontrolled.

1. Empty input. If DatePicker doesn't present pre-selected date values, initialize \`value\` with "null" so the component is controlled.\

2. Pre-selected date values. If DatePicker presents pre-selected date values, initialize \`value\` with the pre-selected date so the component is controlled.
        `}
          title="Controlled component"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={controlled}
                layout="column"
                name="controlled variant"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="Empty input"
          />
          <MainSection.Card
            cardSize="lg"
            description={`
`}
            sandpackExample={
              <SandpackExample
                code={preselected}
                layout="column"
                name="preselected variant"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="Pre-selected date values"
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          columns={2}
          description={`
1. Disabled
2. Error. Display an error message. Error message overrides the helper text.
        `}
          title="States"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={disabled}
                layout="column"
                name="disabled variant"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="Disabled"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={error}
                layout="column"
                name="error variant"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="Error"
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Helper text">
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={helperText}
                name="helperText variant"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Date range">
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={range}
                layout="column"
                name="range variant"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="DatePicker supports disabling future & past dates as well as an array of selected dates."
          title="Disabled dates"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={disable}
                layout="column"
                name="disable variant"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="Disable past & future dates"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={disableSelected}
                name="disable selected variant"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="Disable selected dates"
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          columns={2}
          description="Provide select lists for quickly selecting year and month"
          title="Select list"
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={selectLists}
                name="selectLists example"
                previewHeight={PREVIEW_HEIGHT + 100}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Define the preferred direction for the DatePicker popover to open. If that placement doesn't fit, the opposite direction will be used."
          title="Ideal Direction"
        >
          {/* @ts-expect-error - TS2322 - Type '{ children: ({ idealDirection }: { [key: string]: any; }) => Element; idealDirection: string[]; }' is not assignable to type 'IntrinsicAttributes & Props'. */}
          <CombinationNew idealDirection={['down', 'left', 'right', 'up']}>
            {({ idealDirection }) => (
              <DatePicker
                id={`example-idealDirection-${idealDirection}`}
                idealDirection={idealDirection}
                label={`Direction ${idealDirection}`}
                onChange={() => {}}
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          badge="experimental"
          description={`DatePicker consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onRender](/web/utilities/globaleventshandlerprovider#onRender): executed when DateField mounts for the first time

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#onRender) for more information.
`}
          title="External handlers"
        />
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-extensions#datepicker',
            text: 'Datepicker extension',
          },
        ]}
      />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: {
      generatedDocGen: await docGen('DatePicker'),
    },
  };
}
