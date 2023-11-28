// @flow strict-local
import { type Node as ReactNode, useState } from 'react';
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
};

const PREVIEW_HEIGHT = 480;

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  const [locale, setLocale] = useState<string | null>('en-US');
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <Page title="DatePicker">
      <PageHeader name="DatePicker" description={generatedDocGen?.description} pdocsLink>
        <SandpackExample
          code={main}
          name={`Main ${generatedDocGen?.displayName} example`}
          hideEditor
          previewHeight={PREVIEW_HEIGHT}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Allowing users to choose a date or date range by clicking through the calendar popup or typing in the text field.
          - Limiting date options to a specific range of dates.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - When the native date picking experience is preferred (typically mobile and mWeb experiences). In this case, use [TextField](/web/textfield) with type=”date”.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <LocalizationSection
        name={generatedDocGen?.displayName}
        layout="column"
        previewHeight={PREVIEW_HEIGHT}
        noDefaultLabelProvider
      >
        <MainSection.Subsection
          title="Date format locales"
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
        >
          <Flex gap={4} direction="row" wrap>
            <Flex.Item flex="none">
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
            </Flex.Item>
            <DatePicker
              id="locale-example"
              label={locale ? localeMap[locale].lang : undefined}
              onChange={({ value }) => setDate(value)}
              value={date}
              localeData={locale ? localeMap[locale].localeData : undefined}
              selectLists={['month']}
            />
          </Flex>
        </MainSection.Subsection>
      </LocalizationSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          columns={2}
          title="Controlled component"
          description={`
DatePicker is a controlled component. Use \`value\`, \`onChange\`, \`onClearInput\` and \`onError\` to implement it correctly.

DatePicker is controlled when \`value\` is not "undefined". When \`value\` is "undefined", it stays uncontrolled.

1. Empty input. If DatePicker doesn't present pre-selected date values, initialize \`value\` with "null" so the component is controlled.\

2. Pre-selected date values. If DatePicker presents pre-selected date values, initialize \`value\` with the pre-selected date so the component is controlled.
        `}
        >
          <MainSection.Card
            title="Empty input"
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={controlled}
                name="controlled variant"
                layout="column"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            title="Pre-selected date values"
            description={`
`}
            sandpackExample={
              <SandpackExample
                code={preselected}
                name="preselected variant"
                layout="column"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          columns={2}
          title="States"
          description={`
1. Disabled
2. Error. Display an error message. Error message overrides the helper text.
        `}
        >
          <MainSection.Card
            title="Disabled"
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={disabled}
                name="disabled variant"
                layout="column"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
          <MainSection.Card
            title="Error"
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={error}
                name="error variant"
                layout="column"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
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
                name="range variant"
                previewHeight={PREVIEW_HEIGHT}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Disabled dates"
          description="DatePicker supports disabling future & past dates as well as an array of selected dates."
        >
          <MainSection.Card
            cardSize="lg"
            title="Disable past & future dates"
            sandpackExample={
              <SandpackExample
                code={disable}
                name="disable variant"
                previewHeight={PREVIEW_HEIGHT}
                layout="column"
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            title="Disable selected dates"
            sandpackExample={
              <SandpackExample
                code={disableSelected}
                name="disable selected variant"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          columns={2}
          title="Select list"
          description="Provide select lists for quickly selecting year and month"
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
          <CombinationNew idealDirection={['down', 'left', 'right', 'up']}>
            {({ idealDirection }) => (
              <DatePicker
                id={`example-idealDirection-${idealDirection}`}
                label={`Direction ${idealDirection}`}
                onChange={() => {}}
                idealDirection={idealDirection}
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          badge="experimental"
          title="External handlers"
          description={`DatePicker consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onRender](/web/utilities/globaleventshandlerprovider#onRender): executed when DateField mounts for the first time

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#onRender) for more information.
`}
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
  props: { generatedDocGen: DocGen },
}> {
  return {
    props: {
      generatedDocGen: await docGen('DatePicker'),
    },
  };
}
