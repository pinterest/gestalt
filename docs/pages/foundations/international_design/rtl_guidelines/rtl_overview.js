// @flow strict
import React, { type Node as ReactNode } from 'react';
import { BannerSlim, Box, Heading, Image, Mask, Text } from 'gestalt';
import { DOCS_COPY_MAX_WIDTH_PX } from '../../../../docs-components/consts';
import MainSection from '../../../../docs-components/MainSection';
import Markdown from '../../../../docs-components/Markdown';
import Page from '../../../../docs-components/Page';
import PageHeader from '../../../../docs-components/PageHeader';

export default function FormsLayoutOverview(): ReactNode {
  return (
    <Page title="RTL overview">
      <PageHeader
        description="If you want to reach a global audience, you need to consider how your product design and code will work for different languages and scripts. One of the challenges you may face is how to handle right-to-left (RTL) and bidirectional (BIDI) languages, such as Arabic and Hebrew. These languages have different writing systems, layout rules and cultural preferences than left-to-right (LTR) languages, such as English, French and Spanish. Our guidelines will show you how to design and code for RTL and BIDI languages and scripts, and avoid common pitfalls and mistakes."
        name="RTL overview"
        type="guidelines"
      />
      <MainSection
        description={`
When it comes to internationalization, some languages require special treatment based on the direction of their script. For Western languages, such as English, Spanish and French, the script is written and read from left-to-right [LTR] and those are identified as LTR languages.

However, there’s a group of languages where the script is written and read from right-to-left [RTL]. The group includes 12 languages, two of which are supported on Pinterest (Arabic and Hebrew). The direction of the script in those languages has a significant impact on the whole UI and therefore on the design and functionality of the localized product.

 - LTR languages (like English) display content from left to right
- RTL languages (like Arabic) display content from right to left
`}
        name="What are RTL and BIDI languages?"
      >
        <MainSection.Subsection
          description="RTL languages have a primary direction, the text flows from RTL. In addition to that, they're also known as bidirectional languages, because some parts of the text, such as mathematical expressions, numeric dates and numbers bearing units are embedded from left to right."
          title="What's bidirectionality (aka bidi)?"
        />
        <Box borderStyle="sm" marginBottom={3} maxHeight={298} rounding={4}>
          <Mask rounding={4}>
            <Image
              alt="Example of bi-directional text in English and Arabic."
              naturalHeight={894}
              naturalWidth={2698}
              src="https://i.pinimg.com/originals/2e/33/b2/2e33b2ca157b2a67eb9f7fb733adc3d4.png"
            />
          </Mask>
        </Box>
        <Box marginBottom={6} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
          <Text size="300">
            Example of a bidirectional text: a sentence in Arabic that contains a number or an
            English word (like “Pinterest”)
          </Text>
        </Box>
        <MainSection.Subsection title="What are some of the world’s most popular right-to-left and bidirectional languages?" />
        <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
          <Heading accessibilityLevel={4} size="300">
            Arabic
          </Heading>
          <Markdown
            text={`
              A Semitic language spoken primarily in the Middle East and North Africa. It is the fourth most spoken language in the world, with an estimated 422 million speakers and 26 Arabic-speaking countries.
            `}
          />
          <Box marginBottom={6} marginTop={3}>
            <BannerSlim
              iconAccessibilityLabel="Information"
              message="Arabic speakers represent 4.3% of monthly active users (MAU) at Pinterest (19 million+)."
              type="info"
            />
          </Box>
          <Heading accessibilityLevel={4} size="300">
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
        description="The main change that'll happen to a UI when translating to languages like Arabic and Hebrew is that elements will flip to be read from right to left. However, not all UI elements will be mirrored when a UI flips."
        name="Flipping UI and content"
      >
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
            - Form field icons are displayed on the opposite side of a field
            - Navigation buttons are displayed in reverse order
            - Icons that communicate direction, like arrows, are mirrored
            - Paragraph text (if it is translated to a RTL language) is right-aligned, aka “end-aligned”
            - Text in a list or items in a menu are all right-aligned, even if some of the text is in a LTR language
        `}
            title="What changes"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
            - Icons that don’t communicate direction, such as a camera
            - Numbers, such as those on a clock and phone numbers
            - Charts and graphs
            - Paragraph text that is all in a LTR language
            - Primary buttons on mobile that need to be placed where it’s easiest for a person to reach them
        `}
            title="What stays the same"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        description={`In this guide, you will learn how to design and code for RTL and BIDI scripts, and avoid common pitfalls and mistakes.

Here are the key considerations:

1. Layout and Text direction
2. Icons
3. Typography
        `}
        name="Key considerations"
      >
        <MainSection
          description="In addition to this guide, you can contact the Internationalization team via Slack at [#i18n](http://pinch.pinadmin.com/i18n-slack)"
          name="Pinterest resources"
        >
          <MainSection
            description={`
Additional external references for engineers and designers:
- [Material Design (Android)—Bidirectionality](https://m2.material.io/design/usability/bidirectionality.html)
- [Apple RTL Guidelines](https://developer.apple.com/design/human-interface-guidelines/right-to-left)
- [Unicode Bidirectional Algorithm](https://unicode.org/reports/tr9/)
- [Microsoft Right-to-left language support and bidirectional text](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/user-interface/bidirectional-support)
        `}
            name="References"
          />
        </MainSection>
      </MainSection>
    </Page>
  );
}
