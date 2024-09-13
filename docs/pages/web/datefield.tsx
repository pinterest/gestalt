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
import { DateField } from 'gestalt-datepicker';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import SandpackExample from '../../docs-components/SandpackExample';
import disabled from '../../examples/datefield/disabled';
import disabledDates from '../../examples/datefield/disabledDates';
import enabled from '../../examples/datefield/enabled';
import error from '../../examples/datefield/error';
import helperText from '../../examples/datefield/helperText';
import main from '../../examples/datefield/main';
import readOnly from '../../examples/datefield/readOnly';
import sizes from '../../examples/datefield/sizes';

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

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  const [locale, setLocale] = useState<string | null>('en-US');
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        badge="experimental"
        bannerSlim={
          <BannerSlim
            iconAccessibilityLabel="Warning message"
            message="DateField is an experimental component. Expect development and design iteration, breaking API changes or even component deprecation."
            type="warning"
          />
        }
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
      >
        <SandpackExample
          code={main}
          hideEditor
          name={`Main ${generatedDocGen?.displayName} example`}
          previewHeight={200}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <LocalizationSection
        layout="column"
        name={generatedDocGen?.displayName}
        noDefaultLabelProvider
      >
        <MainSection.Subsection
          description={`DateField supports multiple locales. Adjust the date format to each [date-fns locale](https://date-fns.org/v2.14.0/docs/Locale).

The following locale examples show the different locale format variants.

Note that locale data from date-fns is external to gestalt-datepicker, it's not an internal dependency. Add date-fns to your app's dependencies.

~~~jsx
import { DateField } from 'gestalt-datepicker';
import { it } from 'date-fns/locale';
<DateField localeData={it}/>
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
            <DateField
              id="DateField-example"
              // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly af: { readonly localeData: Locale; readonly lang: "Afrikaans"; }; readonly 'ar-SA': { readonly localeData: Locale; readonly lang: "Arabic (Saudi Arabia)"; }; ... 33 more ...; readonly 'zh-TW': { ...; }; }'.
              label={locale ? localeMap[locale].lang : undefined}
              // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly af: { readonly localeData: Locale; readonly lang: "Afrikaans"; }; readonly 'ar-SA': { readonly localeData: Locale; readonly lang: "Arabic (Saudi Arabia)"; }; ... 33 more ...; readonly 'zh-TW': { ...; }; }'.
              localeData={locale ? localeMap[locale].localeData : undefined}
              // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly af: { readonly localeData: Locale; readonly lang: "Afrikaans"; }; readonly 'ar-SA': { readonly localeData: Locale; readonly lang: "Arabic (Saudi Arabia)"; }; ... 33 more ...; readonly 'zh-TW': { ...; }; }'.
              name={locale ? localeMap[locale].lang : undefined}
              onChange={({ value }) => setDate(value)}
              onClearInput={() => setDate(null)}
              value={date}
            />
          </Flex>
        </MainSection.Subsection>
      </LocalizationSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`DateField is a controlled component. Use \`value\`, \`onChange\`, \`onClearInput\` and \`onError\` to implement it correctly.`}
          title="Controlled component"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={main} layout="row" name="Controlled component example" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`DateField is available in 'md' and 'lg' size.`}
          title="Size"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={sizes} name="DateField Sizes" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`
1. Enabled
The enabled state of DateField that represents it can be interacted with.

2. Error
DateField can display an error message. DateField can communicate input errors to the user. Use onError and errorMessage to implement it correctly. Check the [Disable past & future dates variant](/web/datefield#Disable-past-and-future-dates) for guidance on implementation.

3. Read-only
Read-only DateField are used to present information to the user without allowing them to edit the content. Typically they are used to show content or information that the user does not have permission or access to edit.

4. Disabled
DateField cannot be interacted with using the mouse or keyboard. They also do not need to meet contrast requirements, so do not use them to present info to the user (use "readOnly" instead).
`}
          title="State"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={enabled} layout="column" name="Enabled example" />
            }
            title="Enabled"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={disabled} layout="column" name="Disabled example" />
            }
            title="Disabled"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={error} layout="column" name="Error message example" />
            }
            title="Error"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={readOnly} layout="column" name="Read-only example" />
            }
            title="Read-only"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`'label' is an optional prop; however, DateField should always be properly labelled.
Check [TextField's Label variant section](/web/numberfield#Labels) for more examples and guidance.
`}
          title="Label"
        />
        <MainSection.Subsection
          description={`
          Whenever you want to provide more information about a form field, you should use \`helperText\`.
          `}
          title="Helper text"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={helperText}
                name="Helper Text to Explain More about Optional Info"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="DateField supports disabling future & past dates from being selected."
          title="Disable past & future dates"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={disabledDates} layout="row" name="disableRange example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          badge="experimental"
          description={`DateField consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onRender](/web/utilities/globaleventshandlerprovider#onRender): executed when DateField mounts for the first time

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#onRender) for more information.
`}
          title="External handlers"
        />
      </MainSection>

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-extensions#datefield',
            text: 'DateField extension',
          },
        ]}
      />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[DatePicker](/web/datepicker)**
Use DatePicker if the user is allowed to pick a date from a calendar popup.
    `}
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
    props: {
      generatedDocGen: await docGen('DateField'),
    },
  };
}
