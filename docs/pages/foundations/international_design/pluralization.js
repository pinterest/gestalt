// @flow strict
import React, { type Node as ReactNode } from 'react';
import { Box, Flex, Image, Link, List, Mask, SlimBanner, Table, Text } from 'gestalt';
import { DOCS_COPY_MAX_WIDTH_PX } from '../../../docs-components/consts';
import MainSection from '../../../docs-components/MainSection';
import Markdown from '../../../docs-components/Markdown';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';

export default function FormsLayoutOverview(): ReactNode {
  return (
    <Page title="Pluralization">
      <PageHeader
        name="Pluralization"
        type="guidelines"
        description={`
        If you want to reach a global audience, you need to consider how your product design and code will work for different languages and scripts. One of the challenges you may face is how to handle pluralization. Pluralization accommodates different plural rules across languages. It allows for the display of different messages depending on the quantity selected. These different messages are based on the plural rules of the language.`}
      />
      <MainSection
        name="It's not just singular and plural"
        description="For most Western countries, the term plural usually means more than one, or, if we want to think about it in a more technical way, anything that’s countable and different from one (we say, for example, “zero Pins”, even though it’s not necessarily more than one).
        <br/></br>
        There are [different types of plurals](https://www.unicode.org/cldr/charts/43/supplemental/language_plural_rules.html) depending on the language. English has two plural forms: singular and plural, “one Pin” and “five Pins.” Many languages share this simple duality, but quite a few don’t. Chinese has one plural form, and so does Japanese. Russian has four, and Arabic has six!"
      >
        <Box
          maxHeight={564}
          marginBottom={6}
          borderStyle="sm"
          rounding={4}
          paddingX={4}
          paddingY={4}
        >
          <Flex height="100%" alignItems="center" justifyContent="center" gap={4}>
            <Flex direction="column" gap={4}>
              <Flex gap={4}>
                <Box borderStyle="sm" paddingX={2} paddingY={8} rounding={3} width={130}>
                  <Flex alignItems="center" direction="column" gap={4}>
                    <Text weight="bold">English</Text>
                    <Text weight="bold" color="error">
                      0 <Text inline>Pin</Text>s
                    </Text>
                    <Text weight="bold" color="error">
                      1 <Text inline>Pin</Text>
                    </Text>
                    <Text weight="bold" color="error">
                      2 <Text inline>Pin</Text>s
                    </Text>
                  </Flex>
                </Box>
                <Box borderStyle="sm" paddingX={2} paddingY={8} rounding={3} width={130}>
                  <Flex alignItems="center" direction="column" gap={4}>
                    <Text weight="bold">French</Text>
                    <Text weight="bold" color="error">
                      0 <Text inline>Epingle</Text>
                    </Text>
                    <Text weight="bold" color="error">
                      1 <Text inline>Epingle</Text>
                    </Text>
                    <Text weight="bold" color="error">
                      2 <Text inline>Epingle</Text>s
                    </Text>
                  </Flex>
                </Box>
                <Box borderStyle="sm" paddingX={2} paddingY={8} rounding={3} width={130}>
                  <Flex alignItems="center" direction="column" gap={4}>
                    <Text weight="bold">Japanese</Text>
                    <Text weight="bold" color="error">
                      0 <Text inline>ピン</Text>
                    </Text>
                    <Text weight="bold" color="error">
                      1 <Text inline>ピン</Text>
                    </Text>
                    <Text weight="bold" color="error">
                      2 <Text inline>ピン</Text>
                    </Text>
                  </Flex>
                </Box>
              </Flex>

              <Box borderStyle="sm" paddingX={2} paddingY={3} rounding={3}>
                <Flex alignItems="center" direction="column" gap={4}>
                  <Text>
                    {"translate ('"}{' '}
                    <Text weight="bold" color="error" inline>
                      {'{num}'}
                    </Text>{' '}
                    {"Pin', ' "}
                    <Text weight="bold" color="error" inline>
                      {'{num}'}
                    </Text>
                    {" Pins', num) "}
                  </Text>
                </Flex>
              </Box>
            </Flex>

            <Box borderStyle="sm" paddingX={2} paddingY={3} rounding={3} width={130}>
              <Flex alignItems="center" direction="column" gap={4}>
                <Text weight="bold">Russian</Text>
                <Text weight="bold" color="error">
                  0 <Text inline>Пин</Text>ов
                </Text>
                <Text weight="bold" color="error">
                  1 <Text inline>Пин</Text>
                </Text>
                <Text weight="bold" color="error">
                  2 <Text inline>Пин</Text>а
                </Text>
                <Text weight="bold" color="error">
                  5 <Text inline>Пин</Text>ов
                </Text>
                <Text weight="bold" color="error">
                  11 <Text inline>Пин</Text>ов
                </Text>
                <Text weight="bold" color="error">
                  21 <Text inline>Пин</Text>
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginBottom={6}>
          <Text size="300">
            Visual representation of the term Pin and the different plural forms
          </Text>
        </Box>

        <MainSection
          name="What is Pluralization?"
          description={`

          Pluralization (p11n) is the process of changing nouns from singular to plural form. Pluralization is complex and surprisingly diverse across languages. It’s the problem we face with i18n keys, which contain a numeric parameter.

          When localizing plurals, we often have a dynamic count integer that we use to determine which form to pick. For example, 1 → “one Pin”, 2 → “two Pins”.

          Looking at English, we have our two forms, “one” and “other” in localization lingo. Here, we’d need two versions of the message:

          * One → “You’ve created 1 Pin so far!”
          * Other → “You’ve created 30 Pins so far!”
        `}
        />
        <Flex gap={6} alignContent="between" wrap direction="row">
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              width="100%"
              paddingX={8}
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
                alt="A representation of Pinterest on a cellphone showing the following message: You've created one Pin so far!"
                naturalWidth={1107}
                naturalHeight={888}
                src="https://www.pinterest-assets.com/AssetLink/s3yy1s7h2e47jplk2l5mg3ig3h2ppw42/pluralization-example-one-png.jpg"
              />
            </Box>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              width="100%"
              paddingX={8}
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
                alt="A representation of Pinterest on a cellphone showing the following message: You've created thirty Pins so far!"
                naturalWidth={1107}
                naturalHeight={888}
                src="https://www.pinterest-assets.com/AssetLink/730p85i75r30yvp8kbem0n4bbp302a0r/pluralization-example-other-png.jpg"
              />
            </Box>
          </Flex.Item>
        </Flex>

        <Box marginTop={10} maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginBottom={10}>
          <List
            type="unordered"
            spacing="regular"
            label={
              <Text>
                What about languages that require multiple plural forms, like Arabic?{' '}
                <Text inline>
                  <Link
                    href="https://www.unicode.org/cldr/charts/42/supplemental/language_plural_rules.html#ar"
                    display="inline"
                    externalLinkIcon="default"
                    target="blank"
                    rel="nofollow"
                  >
                    Arabic has six plural forms
                  </Link>
                  . If we want accurate translations for the above message, we need six versions.
                  The localization industry has used two different approaches for pluralization in
                  Arabic:
                </Text>
              </Text>
            }
          >
            <List.Item
              text={
                <Text weight="bold">
                  Approach 1, for required placeholders:{' '}
                  <Text inline>
                    (currently used at Pinterest) is grammatically incorrect but commonly used and
                    acceptable. This approach has been used for in-app strings because a placeholder
                    representing the integer is needed and can’t be omitted. This approach shouldn’t
                    be used in site content where pluralization doesn’t require using placeholders
                    for integers (ex: Help Center, Policy, Marketing content).
                  </Text>
                </Text>
              }
            />
            <List.Item
              text={
                <Text weight="bold">
                  Approach 2, when placeholders aren’t required:{' '}
                  <Text inline>
                    {' '}
                    is grammatically correct but could be challenging when used for in-app strings
                    because it requires omitting integer placeholders.
                  </Text>
                </Text>
              }
            />
          </List>
        </Box>

        <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginBottom={10}>
          <SlimBanner
            type="recommendation"
            iconAccessibilityLabel="Recommendation"
            message="We should aim to use the pluralization libraries that use the grammatically correct forms, and not the commonly acceptable ones."
          />
        </Box>

        <MainSection.Subsection
          title="For required placeholders"
          description={`
          This approach is grammatically incorrect yet commonly used and acceptable pluralization (includes integers for 0/1/2). Currently used in Pinterest in-app strings.`}
        />

        <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={10}>
          <Box marginTop={0} maxWidth="100%">
            <Table accessibilityLabel="For required placeholders">
              <Table.Header>
                <Table.Row>
                  {[
                    'Group of intergers',
                    'Intergers range',
                    'English source',
                    'Arabic',
                    'Back-translation',
                  ].map((item) => (
                    <Table.HeaderCell key={item}>
                      <Text align={item === 'RTL' ? 'end' : 'start'} size="200" weight="bold">
                        {item}
                      </Text>
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Text size="200">zero</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">0</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {0} pins'}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Box dir="rtl">
                      <Text size="200">{' لقد أنشأنا {٠} من المنشورات '}</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {0} from pins'}</Text>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Text size="200">one</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">1</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {0} pin'}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Box dir="rtl">
                      <Text size="200">{'لقد أنشأنا منشوراً {١}'}</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created pin {1}'}</Text>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Text size="200">two</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">2</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {0} pins'}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Box dir="rtl">
                      <Text size="200">{'قد أنشأنا منشورين {٢} '}</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created pins {2}'}</Text>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Text size="200">few</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">3-10</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {0} pins'}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Box dir="rtl">
                      <Text size="200">{'لقد  أنشأنا {٣} منشورات'}</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {3} pins'}</Text>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Text size="200">many</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">11-99, 101+</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {0} pins'}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Box dir="rtl">
                      <Text size="200">{'لقد  أنشأنا {١١} منشوراً'}</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {11} pins'}</Text>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Text size="200">other</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">100, 1000, 10,000+</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {0} pins'}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Box dir="rtl">
                      <Text size="200">{'لقد  أنشأنا {١٠٠} منشورٍ'}</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {100} pins'}</Text>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Box>
        </Box>

        <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={10} marginBottom={10}>
          <Markdown
            text={`
            **Note:** when applying this rule, we should allow translators to move the integer placeholder position and also share the rule with examples in the Pinterest Style Guide. `}
          />
        </Box>

        <MainSection.Subsection
          title="When placeholders aren't required"
          description={`
      This approach is the grammatically correct pluralization (omits integers for 0/1/2).`}
        />

        <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={10}>
          <Box marginTop={3} maxWidth="100%">
            <Table accessibilityLabel="When placeholders aren't required">
              <Table.Header>
                <Table.Row>
                  {[
                    'Group of intergers',
                    'Intergers range',
                    'English source',
                    'Arabic',
                    'Back-translation',
                  ].map((item) => (
                    <Table.HeaderCell key={item}>
                      <Text align={item === 'RTL' ? 'end' : 'start'} size="200" weight="bold">
                        {item}
                      </Text>
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Text size="200">zero</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">0</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {0} pins'}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Box dir="rtl">
                      <Text size="200">لم ننشئ أي منشور</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">We have not created any pins</Text>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Text size="200">one</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">1</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {0} pin'}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Box dir="rtl">
                      <Text size="200">لقد أنشأنا منشوراً واحداً</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">We have created pin one</Text>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Text size="200">two</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">2</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {0} pins'}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Box dir="rtl">
                      <Text size="200">لقد أنشأنا منشورين اثنين</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">We have created pins two</Text>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Text size="200">few</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">3-10</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {0} pins'}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Box dir="rtl">
                      <Text size="200">{'لقد  أنشأنا {٣} منشورات'}</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {3} pins'}</Text>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Text size="200">many</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">11-99, 101+</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {0} pins'}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Box dir="rtl">
                      <Text size="200">{'لقد  أنشأنا {١١} منشوراً'}</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {11} pins'}</Text>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Text size="200">other</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">100, 1000, 10,000+</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {0} pins'}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Box dir="rtl">
                      <Text size="200">{'لقد  أنشأنا {١٠٠} منشورٍ'}</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="200">{'We have created {100} pins'}</Text>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Box>
        </Box>

        <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={10} marginBottom={10}>
          <List type="unordered" spacing="regular" label={<Text weight="bold">Note:</Text>}>
            <List.Item
              text={
                <Text inline>
                  {' '}
                  The Internationalization Team—engineering specifically—should check{' '}
                  <Link
                    href="https://www.unicode.org/cldr/charts/44/supplemental/language_plural_rules.html"
                    display="inline"
                    externalLinkIcon="default"
                    target="blank"
                    rel="nofollow"
                  >
                    CLDR (Common Locale Data Repository)
                  </Link>{' '}
                  to see how this could be implemented for in-app strings{' '}
                </Text>
              }
            />
            <List.Item text="When translating for larger contents (websites), the second approach, the grammatically correct one, should be implemented" />
          </List>
        </Box>

        <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginBottom={10}>
          <SlimBanner
            type="info"
            iconAccessibilityLabel="Info"
            message="There’s no one-size-fits-all answer to plural translation. We need a solution that allows selecting the correct plural form for any given language, not just “pick from singular and plural”."
          />
        </Box>

        <MainSection
          name="How does pluralization work?"
          description={`
        Pluralization allows for the display of different messages depending on the quantity selected. These different messages are based on the plural rules of the language. CLDR uses short, mnemonic tags for these plural categories:

        * zero
        * one (singular)
        * two (dual)
        * few (paucal)
        * many (also used for fractions if they have a separate class)
        * other (required—general plural form—also used if the language only has a single form)

        When you have a dynamic string with a placeholder for a numeric value appended to a text (ex: {numPins} Pins), you need to **always pluralize your string**, even if you know that the number will always be greater than zero.
        `}
        />

        <MainSection
          name="Mapping to CLDR forms"
          description={`
        When writing the source string in English, the singular string _“You have {numberMessage} message”_ maps to CLDR's one form and the plural string _“You have {numberMessage}”_ messages maps to CLDR's other form.

        Some languages like Japanese will use a single form (other) in the localized message, whereas Russian will use four forms (one, few, many and other) and Arabic will use six forms (zero, one, two, few, many and other).

        See [CLDR Plural Rules](https://cldr.unicode.org/index/cldr-spec/plural-rules) for more details.
        `}
        />

        <MainSection.Subsection title="English" description="en.properties" />
        <Box marginTop={0} marginBottom={10}>
          <embed
            style={{ border: 0 }}
            width="100%"
            height="400"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fg8UzEN5Mg4kMoljbuje33y%2FInternational-Design%3Ftype%3Ddesign%26node-id%3D11%253A6%26mode%3Ddesign%26t%3DzrO9UZUaSEHo73ga-1"
            allowFullScreen
          />
        </Box>

        <MainSection.Subsection title="French" description="fr.properties" />
        <Box marginTop={0} marginBottom={10}>
          <embed
            style={{ border: 0 }}
            width="100%"
            height="400"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fg8UzEN5Mg4kMoljbuje33y%2FInternational-Design%3Ftype%3Ddesign%26node-id%3D11%253A21%26mode%3Ddesign%26t%3DzrO9UZUaSEHo73ga-1"
            allowFullScreen
          />
        </Box>

        <MainSection.Subsection title="Japanese" description="ja.properties" />
        <Box marginTop={0} marginBottom={10}>
          <embed
            style={{ border: 0 }}
            width="100%"
            height="400"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fg8UzEN5Mg4kMoljbuje33y%2FInternational-Design%3Ftype%3Ddesign%26node-id%3D11%253A26%26mode%3Ddesign%26t%3DzrO9UZUaSEHo73ga-1"
            allowFullScreen
          />
        </Box>

        <MainSection.Subsection title="Russian" description="ru.properties" />
        <Box marginTop={0} marginBottom={10}>
          <embed
            style={{ border: 0 }}
            width="100%"
            height="400"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fg8UzEN5Mg4kMoljbuje33y%2FInternational-Design%3Ftype%3Ddesign%26node-id%3D11%253A31%26mode%3Ddesign%26t%3DzrO9UZUaSEHo73ga-1"
            allowFullScreen
          />
        </Box>

        <MainSection.Subsection
          title="Java Code Snippet"
          description="Also see the full documentation at [L10nMessages](https://l10nmessages.io/docs/icu4j/#pluralization---message-with-quantity), a Pinterest open source project."
        />
        <Box marginTop={0} marginBottom={10}>
          <embed
            style={{ border: 0 }}
            width="100%"
            height="1000"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fg8UzEN5Mg4kMoljbuje33y%2FInternational-Design%3Ftype%3Ddesign%26node-id%3D11%253A33%26mode%3Ddesign%26t%3DzrO9UZUaSEHo73ga-1"
            allowFullScreen
          />
        </Box>

        <MainSection
          name="Pluralization in the different Pinterest platforms"
          description={`
        Each platform at Pinterest has a special function/macro to handle pluralization:

        * [Pinboard Wiki page](https://pinch/i18n-in-pinboard)
        * [Webapp Wiki page](https://pinhch/i18n-in-web)
        * [Android official documentation](https://developer.android.com/guide/topics/resources/string-resource#Plurals)
        * iOS: briefly mentioned in the [Working with Localization Wiki page](https://pinch/working-l10n)
        `}
        />

        <MainSection
          name="Real life examples"
          description={`
        Source and target examples of wrong pluralization. Correct output should be “1 day”
        `}
        />
        <Box maxHeight={459} marginBottom={3} borderStyle="sm" rounding={4}>
          <Mask rounding={4}>
            <Image
              alt="Example of a table with information of old conversion tags. One of the columns shows Views: 1 days"
              naturalWidth={2688}
              naturalHeight={1083}
              src="https://www.pinterest-assets.com/AssetLink/m32dt1car0cl867307ae0r2m04w888jy/real-life-example-one-png.png"
            />
          </Mask>
        </Box>

        <Box marginTop={12} marginBottom={8}>
          <Markdown
            text={`
            Timestamp wrongly pluralized
            `}
          />
        </Box>
        <Box maxHeight={459} marginBottom={10} borderStyle="sm" rounding={4}>
          <Mask rounding={4}>
            <Image
              alt="Example of timestamp of a Pin wrongly pluralizared, with the output 'two minute ago'"
              naturalWidth={2688}
              naturalHeight={1044}
              src="https://www.pinterest-assets.com/AssetLink/7cp04j2v04ji826j1fqn43yj3lpx86rj/real-life-example-two-png.png"
            />
          </Mask>
        </Box>

        <MainSection name="Related">
          <MainSection.Subsection
            description={`
          **[International design](/foundations/international_design/about_international_design)**
          About International Design abreviations and its meaning
          `}
          />
          <MainSection.Subsection
            description={`
          **[RTL guidelines](/foundations/international_design/rtl_guidelines/rtl_overview)**
          A guide to designing surfaces with RTL languages in mind
          `}
          />
        </MainSection>
      </MainSection>
    </Page>
  );
}
