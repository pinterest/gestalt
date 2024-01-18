// @flow strict
import React, { type Node as ReactNode } from 'react';
import { Box, Callout, Flex, Image, Mask, Text } from 'gestalt';
import { DOCS_COPY_MAX_WIDTH_PX } from '../../../../docs-components/consts';
import MainSection from '../../../../docs-components/MainSection';
import Page from '../../../../docs-components/Page';
import PageHeader from '../../../../docs-components/PageHeader';

export default function FormsLayoutOverview(): ReactNode {
  return (
    <Page title="Typography">
      <PageHeader
        name="Typography"
        type="guidelines"
        description={`
Another important consideration is typography. RTL scripts require a different typography. The choice of font can also have a significant impact on the readability of RTL content. For example, letters can connect to each other, rather than standing alone as they do in LTR languages. This means that fonts need to be chosen carefully, to make sure that they are appropriate for the language being used.

Many **scripts**, such as **Arabic**, have special [orthographic](https://en.wikipedia.org/wiki/Orthographic_rules) rules that require certain combinations of letterforms to be combined into special  [ligature forms](https://en.wikipedia.org/wiki/Ligature_(typography).  The rules governing ligature formation in Arabic can be quite complex, requiring special script-shaping technologies.
        `}
      />
      <MainSection
        name="Leverage our existing fonts, Text and Heading components"
        description={`
In Pinterest products, we default to device fonts so that fallbacks for RTL are handled automatically. Also, if you use our existing components for text, alignment and spacing are also handled out-of-the box.
- [Heading component](https://gestalt.pinterest.systems/web/heading)
- [Text component](https://gestalt.pinterest.systems/web/text)

Pinterest marketing sites using Pinterest Sans. For more information, refer to the [brand guidelines](http://pinch.pinadmin.com/brand-typography)
`}
      >
        <MainSection name="Typography considerations for non-product or brand applications" />
        <MainSection.Subsection
          title="How to select fonts for RTL and LTR"
          description={`
Fonts are an essential element of web development, as they can influence the readability, accessibility‌ and the aesthetics of your app or site. When selecting fonts for RTL and LTR web development, you need to consider language support, font style, font size and spacing.

Language support is vital; you should use tools such as Google Fonts or Font Squirrel to find fonts that accommodate multiple languages and scripts. Additionally, the font style should be appropriate for the context of your content and consistent across different languages. Serif, sans-serif‌ or monospace fonts are all acceptable options; however, avoid using overly decorative fonts as they can reduce readability or cause visual clutter.

Finally, adjust the font size and spacing according to the text direction and the characteristics of the script. For example, RTL scripts tend to have more vertical strokes than LTR scripts, so you may need to increase the font size and line height for RTL text. CSS logical properties or SASS mixins can be used to apply different font styles based on the text direction.
        `}
        />
      </MainSection>
      <MainSection
        name="Date and time formatting"
        description="Date and time formatting is another important consideration. In RTL languages, the date and time should be displayed from right to left, rather than left to right. In addition to the alignment of the date, dates should be formatted according to the user’s local, indicated in their OS settings. The appropriate formatting codes in the localization software can achieve this."
      >
        <MainSection
          name="Numbers and currency"
          description="Numbers and currency are also formatted differently in RTL languages. In Arabic, for example, the decimal separator is a comma, rather than a period as it is in English. Currency symbols follow numbers in Arabic—they're placed on the left. Similarly to the dates formatting, currency formatting should follow the user’s selected local formatting in their OS settings."
        >
          <MainSection.Subsection
            title="Number enumeration"
            description={`
Numbers in RTL scripts are LTR; When enumerating numbers the list of numbers starts from right and flows to the left; however, 2 digit+ numbers are written from left to right and shouldn't be reversed.
  `}
          >
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
                    alt="A pagination component with numbers from large to small reading from left to right."
                    naturalWidth={1107}
                    naturalHeight={888}
                    src="https://i.pinimg.com/originals/34/56/b1/3456b1eccc619a5430e08ab8121f9794.png"
                  />
                </Box>
                <Flex direction="column" gap={2}>
                  <Box marginBottom={6}>
                    <Text>Enumeration in LTR</Text>
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
                    alt="A pagination component with numbers from large to small reading from right to left."
                    naturalWidth={1107}
                    naturalHeight={888}
                    src="https://i.pinimg.com/originals/5f/67/1c/5f671cff85060d9dadc750222203bccd.png"
                  />
                </Box>
                <Flex direction="column" gap={2}>
                  <Box marginBottom={6}>
                    <Text>Enumeration in RTL</Text>
                  </Box>
                </Flex>
              </Flex.Item>
            </Flex>
          </MainSection.Subsection>
          <MainSection.Subsection
            title="Phone numbers"
            description={`
  Phone numbers should be written the same way as in English; if they are written in an international format, the leading + should be to the left of the phone number (like in English), next to the leading digit. Use bidirectional algorithms to format numbers correctly.
  `}
          >
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
                    alt="A list of left-aligned phone numbers in English will all of the text reading from left to right."
                    naturalWidth={1107}
                    naturalHeight={888}
                    src="https://i.pinimg.com/originals/55/01/10/550110041ad3b06987a69ec7c125ad30.png"
                  />
                </Box>
                <Flex direction="column" gap={2}>
                  <Box marginBottom={6}>
                    <Text>LTR phone numbers</Text>
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
                    alt="A list of right-aligned phone numbers in Arabic. The heading and descriptions of the numbers read from right to left, but the numbers themselves read from left to right."
                    naturalWidth={1107}
                    naturalHeight={888}
                    src="https://i.pinimg.com/originals/57/fa/9c/57fa9c7b1bb55f796712253f151fbeae.png"
                  />
                </Box>
                <Flex direction="column" gap={2}>
                  <Box marginBottom={6}>
                    <Text>RTL phone numbers</Text>
                  </Box>
                </Flex>
              </Flex.Item>
            </Flex>
          </MainSection.Subsection>
          <MainSection.Subsection
            title="Western vs Eastern Arabic digits"
            description={`
Different RTL languages can use different number systems.

For example, Hebrew text uses Western Arabic numerals and Hebrew Numerals, whereas Arabic text might use either Western or Eastern Arabic numerals.
  `}
          >
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
                    alt="The numbers 4,5,6 as Western digits."
                    naturalWidth={1107}
                    naturalHeight={888}
                    src="https://i.pinimg.com/originals/39/af/f1/39aff12a780fb6e3268f7c6c5d247019.png"
                  />
                </Box>
                <Flex direction="column" gap={2}>
                  <Box marginBottom={3}>
                    <Text>Western Arabic numerals</Text>
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
                    alt="The numbers 4,5,6 as Eastern digits reading from right to left."
                    naturalWidth={1107}
                    naturalHeight={888}
                    src="https://i.pinimg.com/originals/16/0e/e3/160ee3007efad1c437b36dd525f6d19e.png"
                  />
                </Box>
                <Flex direction="column" gap={2}>
                  <Box marginBottom={6}>
                    <Text>Eastern Arabic numerals</Text>
                  </Box>
                </Flex>
              </Flex.Item>
            </Flex>
            <MainSection.Subsection description="In the Pinterest app, numerals' format choice should mimic the person’s choice in their operating system settings. For instance, if a person opted for Eastern Arabic numerals, digits displayed in the app should be in that format." />
          </MainSection.Subsection>
          <Box marginBottom={10}>
            <Callout
              type="warning"
              iconAccessibilityLabel="Warning"
              title="Don't release without testing"
              message="Testing is an indispensable step in localization, especially when it comes to RTL languages. Always have native, in-market speakers review the full content to ensure that you have the content catered for the target audience and, more importantly, present it so it can be read effortlessly. What’s more, the lessons learned from testing can always be applied to the next round of development, making it more streamlined and cost-effective."
            />
          </Box>
        </MainSection>
        <MainSection
          name="Additional considerations"
          description={`
            As mentioned previously, bidirectional content includes both RTL (for example, Arabic words) and LTR (for example, English) script components.
        `}
        />
        <Box maxHeight={163} marginBottom={3} borderStyle="sm" rounding={4}>
          <Mask rounding={4}>
            <Image
              alt="The top of a long form as part of a setting screen."
              naturalWidth={2688}
              naturalHeight={489}
              src="https://i.pinimg.com/originals/16/7c/89/167c89b73098adc08391b013caf57a29.png"
            />
          </Mask>
        </Box>
        <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginBottom={6}>
          <Text size="300">
            Example of a sentence in Arabic that contains a number or an English word (like
            &#8220;Pinterest&#8221;)
          </Text>
        </Box>
        <MainSection.Subsection
          description={`
To render Bidirectional content correctly, bidi-algorithm rules should be applied as part of engineering internationalization efforts—these rules will guarantee that the components of a sentence are in the right position in the flow for the sentence to be made.

How do the rules affect the order of the bidi content?
- The entire sentence/string flows from right to left
- English words will flow from left to right (or any word in LTR language)
- Numbers (incl. Phone numbers) will also flow from left to right.
- Each component will be in the correct position for the sentence to make sense.
        `}
        />
        <MainSection.Subsection
          title="Note to engineers"
          description={`
In all major web browsers, the order of characters in memory (logical) isn't the same as the order in which they are displayed (visual).

The set of rules applied by the browser to produce the correct order at the time of display are described by the [Unicode Bidirectional Algorithm](https://www.w3.org/International/articles/inline-bidi-markup/uba-basics), or 'bidi algorithm' for short. The page covers the following principles:
- Characters and directional typing
- Directional runs
- Base direction, a fundamentally important concept
- Neutral characters
- Embedding changes to the base direction
- Numbers
- Mirrored Characters

        `}
        />
      </MainSection>
    </Page>
  );
}
