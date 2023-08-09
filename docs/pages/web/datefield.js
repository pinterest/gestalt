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
import { SlimBanner } from 'gestalt';
import { DateField } from 'gestalt-datepicker';
import CombinationNew from '../../docs-components/CombinationNew.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import disabled from '../../examples/datefield/disabled.js';
import error from '../../examples/datefield/error.js';
import main from '../../examples/datefield/main.js';
import states from '../../examples/datefield/states.js';

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

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        badge="experimental"
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        slimBanner={
          <SlimBanner
            type="warning"
            iconAccessibilityLabel="Warning message"
            message="DateField is an experimental component. Expect development and design iteration, breaking API changes or even component deprecation."
          />
        }
      >
        <SandpackExample
          code={main}
          name={`Main ${generatedDocGen?.displayName} example`}
          hideEditor
          previewHeight={200}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Controlled component"
          description={`DateField is a controlled component. Use \`value\`, \`onChange\`, \`onClearInput\` and \`onError\` to implement it correctly.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={main} name="Controlled component example" layout="row" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Error messaging"
          description={`DateField can communicate input errors to the user. Use \`onError\` and \`errorMessage\` to implement it correctly.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={error} name="Controlled component example" layout="row" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="States"
          description={`DateField supports \`disabled\` and \`readOnly\` states.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={states} name="Controlled component example" layout="row" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Disable past & future dates"
          description="DateField supports disabling future & past dates from being selected."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={disabled} name="disableRange example" layout="row" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          badge="experimental"
          title="External handlers"
          description={`DateField consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onMount](/web/utilities/globaleventshandlerprovider#onMount): executed when DateField mounts for the first time

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#onMount) for more information.
`}
        />
      </MainSection>

      <MainSection
        name="Supporting locales"
        description={`DateField supports multiple locales. Adjust the date format to each [date-fns locale](https://date-fns.org/v2.14.0/docs/Locale). The following locale examples show the different locale format variants.

IMPORTANT: Locale data from date-fns is external to gestalt-datepicker, it's not an internal dependency. Add date-fns to your app's dependencies.

~~~jsx
import { DateField } from 'gestalt-datepicker';
import { it } from 'date-fns/locale';
<DateField localeData={it}/>
~~~
`}
      >
        <MainSection.Subsection>
          <CombinationNew localeData={Object.keys(localeMap)} cardSize="xs">
            {({ localeData }) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const [date, setDate] = useState<Date | null>(null);

              return (
                <DateField
                  id={`localeExample:${localeMap[localeData].lang}`}
                  label={localeMap[localeData].lang}
                  onChange={({ value }) => setDate(value)}
                  onClearInput={() => setDate(null)}
                  value={date}
                  name={localeMap[localeData].lang}
                  localeData={localeMap[localeData].localeData}
                />
              );
            }}
          </CombinationNew>
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[DatePicker](/DatePicker)**
Use DatePicker if the user is allowed to pick a date from a calendar popup.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: {
      generatedDocGen: await docGen('DateField'),
    },
  };
}
