// @flow strict
import { Text, Heading, Image, Box } from 'gestalt';
import { type Node } from 'react';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import Success from '../../../graphics/illustration/success.svg';
import WorkingOnIt from '../../../graphics/illustration/workingOnIt.svg';

export default function IllustrationGuidelinesPage(): Node {
  return (
    <Page title="Brand expression">
      <PageHeader
        badge="pilot"
        name="Illustration"
        type="guidelines"
        description="Illustrations bring meaning and emotion to otherwise simple layouts. They can add context, enhance information comprehension and add visual interest. Generally, illustrations should be used in conjunction with blocks of informative text."
      />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - In experiences that are full page or in alignment with blocks of informative content
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Without a purpose as a decorative element. Illustrations should always accompany content.
          - In an experience that competes with user content and Pins
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card type="do" description="Use illustrations at the recommended size.">
            <Success />
          </MainSection.Card>
          <MainSection.Card
            type="don't"
            description="Increase or shrink the size of illustrations past their prescribed size. If you need something smaller, consider using an icon. "
          >
            <WorkingOnIt />
          </MainSection.Card>
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Allow the illustrations to have plenty of surrounding white space."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/f3/28/c9/f328c971f43eabac1a9577ac229a90ef.png"
                naturalWidth={767}
                naturalHeight={590}
                fit="contain"
                alt="example of using color fills in a celebratory moment"
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="don't"
            description="Place illustrations on top of other elements such as images or text."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/4d/d8/a5/4dd8a5d093c6bcce384a3b50dc57e9d6.png"
                naturalWidth={834}
                naturalHeight={614}
                fit="contain"
                alt="example of inappropriately adding text over photography"
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Use the correct illustration type in the correct context. For example, use a loading illustration for content about processing."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/ee/92/be/ee92be2b2750c84fcf3073fb13dec636.png"
                naturalWidth={686}
                naturalHeight={358}
                fit="contain"
                alt="example of using appropriate colors with typography"
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="don't"
            description="Change the color, line thickness or subject of the illustration."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/31/d0/f0/31d0f02d6ed561591968a8cea0aa1abe.png"
                naturalWidth={734}
                naturalHeight={614}
                fit="contain"
                alt="example of using inappropriate colors with typography"
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Use illustrations in experiences that are full page or in alignment with blocks of informative content. "
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/dd/8e/a4/dd8ea46b19b81846ee2f66ed322789f5.png"
                naturalWidth={750}
                naturalHeight={580}
                fit="contain"
                alt="example of using color fills to announce a new feature"
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            type="don't"
            description="Use illustrations to replace crucial or in-the-moment messaging patterns like Callout, SlimBanner or Toast. Learn more about available messaging components"
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/2e/d8/60/2ed8607acc2c012c841e8aba59b38cae.png"
                naturalWidth={887}
                naturalHeight={614}
                fit="contain"
                alt="example of using color fills in core UI patterns"
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Accessibility"
        description={`### Pair with text
Illustrations should always accompany content. Different cultures don’t always interpret illustrations in the same way. Accompanying content can help to add the appropriate context.`}
      />
      <MainSection name="Illustration in use">
        <MainSection.Subsection title="Mobile" />
      </MainSection>
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Accessibility](/foundations/accessibility)**
How to create accessible designs and components that contribute to an accessible product

**[Color](/foundations/color/palette)**
Palettes and guidelines for using color across product interfaces and surfaces

**[Design tokens](/foundations/design_tokens)**
An expanded color palette for charts, graphs and other data visualizations. Includes guidelines for accessibility and usage.

      `}
        />
      </MainSection>
    </Page>
  );
}
