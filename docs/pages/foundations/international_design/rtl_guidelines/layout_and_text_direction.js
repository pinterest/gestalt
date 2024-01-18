// @flow strict
import React, { type Node as ReactNode } from 'react';
import { Box, Image, Mask } from 'gestalt';
import { DOCS_COPY_MAX_WIDTH_PX } from '../../../../docs-components/consts';
import MainSection from '../../../../docs-components/MainSection';
import Markdown from '../../../../docs-components/Markdown';
import Page from '../../../../docs-components/Page';
import PageHeader from '../../../../docs-components/PageHeader';

export default function FormsLayoutOverview(): ReactNode {
  return (
    <Page title="Layout and text direction">
      <PageHeader
        name="Layout and text direction"
        type="guidelines"
        description={`
        The layout of the content must be adapted for RTL languages.
        - In Western languages, the layout is typically left-aligned, with text and images arranged from left to right.
        - In RTL languages, the layout is right-aligned, with text and images arranged from right to left. This can impact the positioning of elements such as icons, logos and navigation bars. It's also important to consider the impact on the overall design and visual hierarchy of the content. For example, graphics may need to be flipped, and menus and navigation bars may need to be moved to the right side of the screen.
        `}
      />
      <MainSection
        name="General flow of content"
        description="UI elements go in the same order as the LTR UI, but starting from the right margin. An element in position 1 is followed by the element in position 2, then 3 but they flow from right to left, as shown in the images below."
      >
        <Box maxHeight={609} marginBottom={3}>
          <Image
            alt="A desktop screen with navigation and content flowing from left to right."
            naturalWidth={2688}
            naturalHeight={1827}
            src="https://i.pinimg.com/originals/23/d4/4a/23d44aeee973066f74f0e1982c114ec8.png"
          />
        </Box>
        <Box maxHeight={609} marginBottom={10}>
          <Image
            alt="A desktop screen with navigation and content flowing from left to right."
            naturalWidth={2688}
            naturalHeight={1827}
            src="https://i.pinimg.com/originals/a7/7c/a1/a77ca1c8ae41395d111352ed026a03fd.png"
          />
        </Box>

        <MainSection
          name="Text direction and alignment"
          description={`
One of the most important considerations when localizing content for RTL languages is the content alignment and direction of the text. All text, including headings, body copy‌ and buttons, must be aligned to the right. This may seem simple, but it can have a significant impact on the design of the content.

Full paragraphs of text in an untranslated LTR language, however, remain left-aligned.
        `}
        />
        <Box maxHeight={609} marginBottom={3} borderStyle="sm" rounding={4}>
          <Mask rounding={4}>
            <Image
              alt="Example of bi-directional text in English and Arabic."
              naturalWidth={2688}
              naturalHeight={1827}
              src="https://i.pinimg.com/originals/15/53/e4/1553e4a34711a57892f4a5b44d7524d8.png"
            />
          </Mask>
        </Box>
        <Box marginBottom={10} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
          <Markdown
            text={`
  **Left:** A page in a LTR language—only full paragraphs are right-aligned when in an RTL
  language.

  **Right:** A page in a RTL language—only full paragraphs are left-aligned when
  in a LTR language.
  `}
          />
        </Box>
        <MainSection name="Buttons" />
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="Do"
            description="Flip the order of button groups so that the primary button goes on the left and secondary buttons go on the right."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/49/ee/98/49ee986fbbd66263ef7abaddfe957c85.png"
                naturalWidth={1107}
                naturalHeight={888}
                fit="contain"
                alt="A cancel button followed by a next button with an arrow pointing towards the right and following the word &#8220;Next&#8221; in an RTL language like English. The same order is flipped in Hebrew."
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="Don't"
            description="Don’t move key button groups like &#8220;Save&#8221; actions. Center them instead to allow users to reach them comfortably with their thumbs on mobile devices. Ask the Internationalization Team for feedback on placement of new action buttons; they can test positions as part of an RTL QA."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/91/86/0c/91860c3d7b6f61c4f6881ef2ed27b125.png"
                naturalWidth={1107}
                naturalHeight={888}
                fit="contain"
                alt="Buttons in Hebrew on Pins moved to the left corner where they are harder to reach for most users."
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
