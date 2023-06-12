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
import { Box } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import Combination from '../../docs-components/Combination.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import controlled from '../../examples/datepicker/controlled.js';
import disable from '../../examples/datepicker/disable.js';
import disabled from '../../examples/datepicker/disabled.js';
import disableSelected from '../../examples/datepicker/disableSelected.js';
import error from '../../examples/datepicker/error.js';
import helperText from '../../examples/datepicker/helperText.js';
import main from '../../examples/datepicker/main.js';
import preselected from '../../examples/datepicker/preselected.js';
import range from '../../examples/datepicker/range.js';
import selectLists from '../../examples/datepicker/selectLists.js';

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
const PREVIEW_HEIGHT = 420;
const PREVIEW_HEIGHT_HELPERTEXT = 450;

export default function DatePickerPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="DatePicker">
      <PageHeader name="DatePicker" description={generatedDocGen?.description}>
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

      <MainSection name="Variants">
        <MainSection.Subsection columns={2} title="Controlled component">
          <MainSection.Card
            title="Empty input"
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
            title="Pre-selected date values"
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

        <MainSection.Subsection columns={2} title="States">
          <MainSection.Card
            title="Disabled"
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
            description="Display an error message. Error message overrides the helper text."
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
            title="Disable future & past"
            sandpackExample={
              <SandpackExample
                code={disable}
                name="disable variant"
                previewHeight={PREVIEW_HEIGHT_HELPERTEXT}
                layout="column"
              />
            }
          />
          <MainSection.Card
            title="Disable selected dates"
            sandpackExample={
              <SandpackExample
                code={disableSelected}
                name="disable selected variant"
                previewHeight={PREVIEW_HEIGHT_HELPERTEXT}
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
                previewHeight={PREVIEW_HEIGHT_HELPERTEXT + 100}
              />
            }
          />
        </MainSection.Subsection>

        <Combination
          id="idealDirection"
          name="Ideal Direction"
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
          name="Supporting locales"
          description="
Adjust the date format to each date-fns locale (https://date-fns.org/v2.14.0/docs/Locale).
The following locale examples show the different locale format variants.
IMPORTANT: Locale data from date-fns is external to gestalt-datepicker, it's not an internal dependency. Add date-fns to your app's dependencies.
~~~jsx
import { DatePicker } from 'gestalt-datepicker';
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
              <Box width="100%" height="100%" color="default">
                <DatePicker
                  id={`example-${localeDataCode}`}
                  label={localeMap[localeDataCode].lang}
                  onChange={({ value }) => setDate(value)}
                  value={date}
                  localeData={localeMap[localeDataCode].localeData}
                  selectLists={['month']}
                />
              </Box>
            );
          }}
        </Combination>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
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
