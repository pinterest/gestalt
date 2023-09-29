// @flow strict
import React, { type Node } from 'react';
import { Box, Heading, Image, Mask, SlimBanner, Text } from 'gestalt';
import { DOCS_COPY_MAX_WIDTH_PX } from '../../../docs-components/consts.js';
import MainSection from '../../../docs-components/MainSection.js';
import Markdown from '../../../docs-components/Markdown.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

export default function FormsLayoutOverview(): Node {
  return (
    <Page title="RTL overview">
      <PageHeader
        name="RTL overview"
        type="guidelines"
        description="If you want to reach a global audience, you need to consider how your product design and code will work for different languages and scripts. One of the challenges you may face is how to handle right-to-left (RTL) and bidirectional (BIDI) languages, such as Arabic and Hebrew. These languages have different writing systems, layout rules and cultural preferences than left-to-right (LTR) languages, such as English, French and Spanish. Our guidelines will show you how to design and code for RTL and BIDI languages and scripts, and avoid common pitfalls and mistakes."
      />
      <MainSection
        name="What are RTL and BIDI languages?"
        description={`
When it comes to internationalization, some languages require special treatment based on the direction of their script. For Western languages, such as English, Spanish and French, the script is written and read from left-to-right [LTR] and those are identified as LTR languages.

However, there’s a group of languages where the script is written and read from right-to-left [RTL]. The group includes 12 languages, two of which are supported on Pinterest (Arabic and Hebrew). The direction of the script in those languages has a significant impact on the whole UI and therefore on the design and functionality of the localized product.

 - LTR languages (like English) display content from left to right
- RTL languages (like Arabic) display content from right to left
`}
      >
        <MainSection.Subsection
          title="What's bidirectionality (aka bidi)?"
          description="RTL languages have a primary direction, the text flows from RTL. In addition to that, they're also known as bidirectional languages, because some parts of the text, such as mathematical expressions, numeric dates and numbers bearing units are embedded from left to right."
        />
        <Box maxHeight={298} marginBottom={3} borderStyle="sm" rounding={4}>
          <Mask rounding={4}>
            <Image
              alt="Example of bi-directional text in English and Arabic."
              naturalWidth={2698}
              naturalHeight={894}
              src="https://i.pinimg.com/originals/2e/33/b2/2e33b2ca157b2a67eb9f7fb733adc3d4.png"
            />
          </Mask>
        </Box>
        <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginBottom={6}>
          <Text size="300">
            Example of a bidirectional text: a sentence in Arabic that contains a number or an
            English word (like “Pinterest”)
          </Text>
        </Box>
        <MainSection.Subsection title="What are some of the world’s most popular right-to-left and bidirectional languages?" />
        <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
          <Heading size="300" accessibilityLevel={4}>
            Arabic
          </Heading>
          <Markdown
            text={`
              A Semitic language spoken primarily in the Middle East and North Africa. It is the fourth most spoken language in the world, with an estimated 422 million speakers and 26 Arabic-speaking countries.
            `}
          />
          <Box marginBottom={6} marginTop={3}>
            <SlimBanner
              type="info"
              iconAccessibilityLabel="Information"
              message="Arabic speakers represent 4.3% of monthly active users (MAU) at Pinterest (19 million+)."
            />
          </Box>
          <Heading size="300" accessibilityLevel={4}>
            Hebrew
          </Heading>
          <Markdown
            text={`
            As one of the official national languages of Israel, Hebrew is a Semitic language with an estimated 9 million speakers worldwide.
            `}
          />
        </Box>
      </MainSection>
      <MainSection
        name="Flipping UI and content"
        description="The main change that'll happen to a UI when translating to languages like Arabic and Hebrew is that elements will flip to be read from right to left. However, not all UI elements will be mirrored when a UI flips."
      >
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="What changes"
            description={`
            - Form field icons are displayed on the opposite side of a field
            - Navigation buttons are displayed in reverse order
            - Icons that communicate direction, like arrows, are mirrored
            - Paragraph text (if it is translated to a RTL language) is right-aligned, aka “end-aligned”
            - Text in a list or items in a menu are all right-aligned, even if some of the text is in a LTR language
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="What stays the same"
            description={`
            - Icons that don’t communicate direction, such as a camera
            - Numbers, such as those on a clock and phone numbers
            - Charts and graphs
            - Paragraph text that is all in a LTR language
            - Primary buttons on mobile that need to be placed where it’s easiest for a person to reach them
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        name="Key considerations"
        description={`In this guide, you will learn how to design and code for RTL and BIDI scripts, and avoid common pitfalls and mistakes.

Here are the key considerations:

1. Layout and Text direction
2. Icons
3. Typography
        `}
      >
        <MainSection
          name="Pinterest resources"
          description="In addition to this guide, you can contact the Internationalization team via Slack at [#i18n](http://pinch.pinadmin.com/i18n-slack)"
        >
          <MainSection
            name="References"
            description={`
Additional external references for engineers and designers:
- [Material Design (Android)—Bidirectionality](https://m2.material.io/design/usability/bidirectionality.html)
- [Apple RTL Guidelines](https://developer.apple.com/design/human-interface-guidelines/right-to-left)
- [Unicode Bidirectional Algorithm](https://unicode.org/reports/tr9/)
- [Microsoft Right-to-left language support and bidirectional text](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/user-interface/bidirectional-support)
        `}
          />
        </MainSection>
      </MainSection>
    </Page>
  );
}
