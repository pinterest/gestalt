// @flow strict
import React, { type Node as ReactNode } from 'react';
// eslint-disable-next-line no-unused-vars
import { Box, Callout, Flex, Heading, Icon, Image, Mask, SlimBanner,Table, Text } from 'gestalt';
import { DOCS_COPY_MAX_WIDTH_PX } from '../../../docs-components/consts';
import MainSection from '../../../docs-components/MainSection';
import Markdown from '../../../docs-components/Markdown';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';

export default function FormsLayoutOverview(): ReactNode {
  return (
    <Page title="Number localization">
      <PageHeader
        name="Number localization"
        type="guidelines"
        description={`
        If you want to reach a global audience, you need to consider how your product design and code will work for different languages and scripts. One of the challenges you may face is how to handle numerals. Number formatting is one of the aspects of internationalization that can affect the usability and accessibility of Pinterest products and services. Different countries and regions have different conventions and preferences for how they display and interpret numbers—such as decimals, commas, currency symbols and units of measurement.`}
      />
      <MainSection
        name="The 1, 2, 3s of number localization"
        description="Below you will find a few considerations to take into account when creating content for global audiences that contains numerals."
      >
      <MainSection.Subsection
          title="Numeral Systems"
          description={`
          When localizing numbers, it's important to have an idea of the different numeral systems that exist in the world. A numeral system is a written representation of numbers. The Western Arabic numeral system (which has the digit symbols 0, 1, 2, 3, 4, 5, 6, 7, 8, 9) is very common in Western locales. Not all languages use Western Arabic digits, though. Bengali, for example, uses the Bengali–Assamese numeral system, whose digits differ from the Western Arabic system: ০, ১, ২, ৩, ৪, ৫, ৬, ৭, ৮, ৯.`}
      />

<Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={2}>

<Box marginTop={0} maxWidth="100%">
  <Table accessibilityLabel="For required placeholders">
    <Table.Header>
      <Table.Row>
        {['Quantity', 'Price per item', 'Subtotal'].map((item) => (
          <Table.HeaderCell key={item}>
            <Text align="end" size="200" weight="bold">
              {item}
            </Text>
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Text size="200" align="end">17</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200" align="end">$123.00</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200" align="end">$2,091.00</Text>
        </Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Text size="200" align="end">1</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200" align="end">$4.56</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200" align="end">$4.56</Text>
        </Table.Cell>
      </Table.Row>

    </Table.Body>
  </Table>
</Box>
</Box>

<Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={0}>

<Box marginTop={0} maxWidth="100%">
  <Table accessibilityLabel="For required placeholders">
    <Table.Header>
      <Table.Row>
        {['পরিমাণ', 'আইটেম প্রতি মান', 'সাবটোটাল'].map((item) => (
          <Table.HeaderCell key={item}>
            <Text align="end" size="200" weight="bold">
              {item}
            </Text>
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Text size="200" align="end">১৭</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200" align="end">১২৩.০০US$</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200" align="end">২,০৯১.০০US$</Text>
        </Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Text size="200" align="end">১</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200" align="end">৪.৫৬US$</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200" align="end">৪.৫৬US$</Text>
        </Table.Cell>
      </Table.Row>

    </Table.Body>
  </Table>
</Box>
</Box>

<Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={8}>
<Markdown
            text={`
            The same numbers represented in the Western Arabic and Bengali numeral systems  `}
          />
</Box>

<Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={10}>
<MainSection.Subsection
          title="Fonts"
          description={`Fonts factor into our number localization as well. When we select fonts for our digital products, we may want to make sure that they support all the numeral systems we need. Most operating systems today do a good job of falling back to system fonts when they encounter characters that the currently active font doesn't support. This means that we can often use custom fonts that don't include all the numeral systems we support without numbers turning into gibberish on us. </br>
          However, it's worth considering international numeral systems when doing UX research for our apps and websites. An international stock exchange app may need to represent all kinds of numeral systems, for example, and our font selection process may need to be sensitive to this. In all cases, we should always test our apps and websites on different platforms to see how our numeral systems are being rendered for our users.`}
      />
</Box>

<MainSection.Subsection
          title="Separators: Breaking up large numbers"
          description={`When representing large numbers, it often helps with legibility to break up the numbers into digit groups. In many English locales we're used to separating thousands with a comma, and to separate the integer and fraction parts of a number with a point—like **1,234,567.89**. However, it's important to be aware that different locales separate digit groups differently. In French (and even in some English locales), for example, it's common to separate groups of thousands with space and to separate an integer and a fraction with a comma—like **1 234 567,89**. Some locales only separate the integer portion of a number, while others separate both the integer and fractional portions. </br>
          In case you're interested in best practices on how to format numbers at Pinterest, check out our [Content Standards](https://gestalt.pinterest.systems/foundations/content_standards/voice).`}
      />

<MainSection.Subsection
          title="Currencies"
          description={`Localizing currency involves using symbols or codes to indicate the currency of the current number. Depending on the context, a special symbol ($ or US$), or an ISO 4217 currency code (USD) is used to represent the currency.</br>
          Some locales place the currency symbol to the left of the number, while others place the symbol to the right.`}
      />

<Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={2}>

<Box marginTop={0} maxWidth="100%">
  <Table accessibilityLabel="For required placeholders">
    <Table.Header>
      <Table.Row>
        {['Locale', 'Currency', 'Example'].map((item) => (
          <Table.HeaderCell key={item}>
            <Text size="200" weight="bold">
              {item}
            </Text>
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Text size="200">US English</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">US Dollar</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">$2,091.00</Text>
        </Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Text size="200">US English</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">Bermudan Dollar</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">BMD 2,091.00</Text>
        </Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Text size="200">US English</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">Mexican Peso</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">MX$2,091.00</Text>
        </Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Text size="200">US English</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">Chinese Yuan</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">CN¥2,091.00</Text>
        </Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Text size="200">China Chinese</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">Chinese Yuan</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">¥2,091.00</Text>
        </Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Text size="200">France French</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">Euro</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">2 091,00 €</Text>
        </Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Text size="200">Bangladesh Bengali</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">Bangladesh Taka</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">২,০৯১.০০৳</Text>
        </Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Text size="200">Saudi Arabia Arabic</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">Pakistani Rupee</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">PKR٢٬٠٩١٬٠٠</Text>
        </Table.Cell>
      </Table.Row>

    </Table.Body>
  </Table>
</Box>
</Box>

<Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={8} marginBottom={8}>
<Markdown
            text={`
            The same number represented in different currencies  `}
          />
</Box>

<MainSection.Subsection
          title="Percentages"
          description={`The common percent sign (%) may seem like it would be uniform across all locales, but that's not the case. Different locales use different symbols for the percent sign. And like currency symbols, the percent sign can go to the left or right of its associated number depending on the locale.`}
      />

<Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={2}>

<Box marginTop={0} maxWidth="100%">
  <Table accessibilityLabel="For required placeholders">
    <Table.Header>
      <Table.Row>
        {['Locale', 'Example'].map((item) => (
          <Table.HeaderCell key={item}>
            <Text size="200" weight="bold">
              {item}
            </Text>
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Text size="200">US English</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">5%</Text>
        </Table.Cell>

      </Table.Row>

      <Table.Row>
        <Table.Cell>
          <Text size="200">Arabic</Text>
        </Table.Cell>
        <Table.Cell>
          <Text size="200">%٥</Text>
        </Table.Cell>
      </Table.Row>

    </Table.Body>
  </Table>
</Box>
</Box>

<Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={8} marginBottom={8}>
<Markdown
            text={`
            The same percentage in different locales`}
          />
</Box>

      <MainSection.Subsection
          title="Phone numbers"
          description={`Phone numbers are formatted differently depending on the country. Use [these regional guidelines](https://docs.google.com/spreadsheets/d/1tW_Uri1CPsJiJCaq6CYFAuIB95gSvMgrPEDiyQ0JfPM/edit#gid=703821290) 18n libraries to learn how they're formatted in each language.`}
      />

      <MainSection.Subsection
          title="Time and dates"
      />
        <Box marginBottom={6} borderStyle="sm" rounding={4}>
          <Mask rounding={4}>
            <Image
              alt="Two examples of DateFields, one in English and one in Russian. While date formatting in English is MM/DD/YYYY, in Russian is dd.mm.yyyy"
              naturalWidth={2688}
              naturalHeight={729}
              src="https://www.pinterest-assets.com/AssetLink/c44a01yn4m2dx8stf3nwgl0hxgp8p6hv/times-and-dates-png.png"
            />
          </Mask>
        </Box>
        <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={8} marginBottom={8}>
<Markdown
            text={`
            It's no secret that people in different countries write the date and time in a certain way. For instance, in the US, they specify the month first, followed by the day, and then the year. Each component is also separated by a slash, which gives us **mm/dd/yyyy**, for example: 09/01/2021, which would be September 1, 2021. However, if you showed this date to a person from, say, Russia, they'd think that 09 is the day and 01 is the month. That's because in CIS (Commonwealth of Independent States) countries, the day goes before the month and usually each component is separated by dots: **dd.mm.yyyy**.
            </br>Moreover, we have different time formats. In some countries people tend to use a 12-hour format and append am/pm, whereas in others the standard is the 24-hour format. Therefore, it's very important to localize date and time properly based on the currently set locale.
            `}
          />
</Box>

      <MainSection
          name="Best practices"
      />
          <MainSection.Subsection
          title="Write with localization in mind"
          description={`When writing source content, be careful with examples and scenarios and use caution when utilizing expressions, slang or other phraseological constructs specific to your own culture, such as references to historical events that may not resonate. They need not be cut out entirely, simply used carefully and in such a way that they can be modified to be made suitable or omitted entirely. </br>
          Prepare for text expansion. If you are tight on space, keep in mind that numbers might expand in length during translation. Some languages are more "wordy" than others, requiring more or fewer words to express the same meanings.  </br>
          Localization can work more smoothly when the source content is written with localization in mind.`}
          />

          <MainSection.Subsection
          title="Follow i18n libraries"
          />
   <Box marginTop={-4} maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginBottom={10}>
          <Markdown
            text={`
            Don't try to reinvent all of that from scratch! Instead, make your life easier by using i18n libraries that already encode all of those standards and practices:

            * **[ICU](https://github.com/unicode-org/icu) - (International Components for Unicode)**: ICU is a mature, widely used set of C/C++ and Java libraries providing Unicode and Globalization support for software applications. ICU libraries (bindings) can be found for most popular languages (PyICU, ICU4J, ICU4C, etc.).
            * **[CLDR](https://cldr.unicode.org/) (Unicode Common Locale Data Repository)**: provides locale-specific patterns for formatting and parsing:
              * Dates
              * Times
              * Time zones
              * Numbers
              * Currency values
              * Measurement units
              * Translations of names (such as languages, scripts, time zones etc)
            * **Language-specific libraries** (for example: [FormatJS](https://formatjs.io/) and [i18next](https://www.i18next.com/))`}
          />
        </Box>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="Do"
            description={`
            - Plan for text expansion: lay out your elements in a way where text expansion doesn't hinder your information hierarchy
            - Flexible design for varying language length and font size
            - Use pseudo-localization to find problems
            - [Rely on local formats](https://docs.google.com/spreadsheets/d/1tW_Uri1CPsJiJCaq6CYFAuIB95gSvMgrPEDiyQ0JfPM/edit#gid=703821290) and i18n libraries
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="Don't"
            description={`
            - Account for text expansion and different number systems causing the line break at the wrong spot
            - Consider localization into different locales during the design phase
            - Release without testing and pseudo-localization
            - Assume numerals formats are the same for all languages and markets
        `}
          />
        </MainSection.Subsection>

        <MainSection
          name="Design tips"
          description="Mock up a scenario where the store, presentment, payout, and billing currencies are different. This scenario is becoming more common as more merchants start selling globally."
      />

        <Flex gap={6} alignContent="between" wrap direction="row">
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              width="100%"
              minHeight={164}
              overflow="hidden"
              color="light"
              rounding={2}
              borderStyle="sm"
              marginBottom={3}
              display="inlineBlock"
              justifyContent="center"
            >
              <Image
                alt="A Datapoint showing a currency number in Japanese Yen"
                naturalWidth={1107}
                naturalHeight={888}
                src="https://www.pinterest-assets.com/AssetLink/05tt4migaba35hrbci6ocqa6654si24g/design-tips-one-png.jpg"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={4}>
              <Markdown
            text={`* **Use Japanese Yen (JPY) amount to test currency length and space constraints**
            1 USD is approximately 100 JPY. If there is enough space for the JPY amount, it should work for most other major currencies.
            `}
          />
              </Box>
            </Flex>
          </Flex.Item>

          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              width="100%"
              minHeight={164}
              overflow="hidden"
              color="light"
              rounding={2}
              borderStyle="sm"
              marginBottom={3}
              display="inlineBlock"
              justifyContent="center"
            >
              <Image
                alt="A section of a table with data including Dollar and Japanese Yen currency values"
                naturalWidth={1107}
                naturalHeight={888}
                src="https://www.pinterest-assets.com/AssetLink/34lj5h3nbhl73g02j08w0827n0641pyn/design-tips-2-png.jpg"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={4}>
              <Markdown
            text={`* **Always assyme the worst-case scenario for text length**
            Especially on mobile and in layouts such as tables and columns. Avoid using narrow columns.
            `}
              />
              </Box>
            </Flex>

          </Flex.Item>
        </Flex>

        <Box marginTop={0} maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginBottom={8}>
          <Markdown
            text={`
            * **Use currencies that share the same symbol to test for clarity**
            USD, CAD, AUD, HKD, SGD are just a few of the many currencies that share the same symbol “$”.</br></br>

            * **Work with linguistic experts**
            To review line breaks and word wrapping for character-based languages, like Chinese or Japanese, to make sure they don't break sentences.</br></br>

            * **Write content thinking about:**
              *  Whether the currency symbol appears before or after the amount (for example, $250, 250 USD, 250 $)
              * Whether decimals are used (for example, there are no "cents" in Japanese yen)
              * Whether the decimal sign is a period or a comma (for example, 37,50 or 37.50)
              * How to group numbers (for example, 10,000 or 1,0000, or using spaces)`}
          />
        </Box>

          <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginBottom={10}>
            <SlimBanner
            type="info"
            iconAccessibilityLabel="Info"
           message="Always test your number localization to make sure it works correctly and is accurately understood by users in the target locale. This can help catch any errors or misunderstandings before they reach end users." />
          </Box>


        <MainSection name="Related">
        <MainSection.Subsection
            description={`
          **[International design](https://gestalt.pinterest.systems/foundations/international_design/about_international_design)**
          About International Design abreviations and its meaning
          `}
          />
          <MainSection.Subsection
            description={`
          **[RTL guidelines](https://gestalt.pinterest.systems/foundations/international_design/rtl_guidelines/rtl_overview)**
          A guide to designing surfaces with RTL languages in mind
          `}
          />

        </MainSection>
      </MainSection>
    </Page>
  );
}
