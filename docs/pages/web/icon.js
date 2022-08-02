// @flow strict
import { type Node } from 'react';
import { Icon } from 'gestalt';
import CombinationNew from '../../docs-components/CombinationNew.js';
import PageHeader from '../../docs-components/PageHeader.js';
import MainSection from '../../docs-components/MainSection.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import Page from '../../docs-components/Page.js';
import docgen, { overrideTypes, type DocGen } from '../../docs-components/docgen.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

import AccessibilitySection from '../../docs-components/AccessibilitySection.js';

export default function IconPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Icon">
      <PageHeader
        name="Icon"
        description={generatedDocGen?.description}
        defaultCode={`
          <Flex gap={1}>
              <Icon icon="pin" accessibilityLabel="Pin" color="default" />
            <Text align="center" color="default" weight="bold">
              Pinterest
            </Text>
          </Flex>`}
      />
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- As symbolic communication for elements that do not have room for text, like the number of pins in a carousel. In this case, ensure the icon choice is easily recognizable and makes sense to international users.
- To convey a critical meaning that cannot be communicated with words, like a downward chevron in a Button to indicate it reveals a menu.
- To help with quick scanning by adding rhythm and hierarchy to the design.`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- For purposes that are decorative or for visual embellishment, such as how illustrations are typically used. Contact us if this is needed.
- As a visual reinforcement for associated text, without adding new meaning.
- To communicate status or health. Use [Status](/web/status) instead.
- As an interactive element (e.g., utilizing hover, focus, click/tap). Use [IconButton](/web/iconbutton) instead.`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use icons intentionally, ensuring the Icon choice is easily recognizable and makes sense in the context. "
            defaultCode={`
  <Flex gap={1}>
    <Icon icon="eye" accessibilityLabel="Number of views" color="default" />
    <Text weight="bold" size="300">4</Text>
  </Flex>`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Repurpose icons. Using icons for their intended meaning supports good comprehension."
            defaultCode={`
  <Flex gap={2}>
    <Icon icon="sound" accessibilityLabel="" color="default" />
    <Text size="300" weight="bold">24 monthly views</Text>
  </Flex>`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Pair text and icons when possible to provide better clarity."
            defaultCode={`
<Flex gap={1}>
  <Icon icon="tag" accessibilityLabel="" color="default" />
  <Text size="300" weight="bold">
    Shopping spotlight
  </Text>
</Flex>`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Don't create interactive Icons using TapArea. Use [IconButton](/web/iconbutton) instead."
            defaultCode={`
<Tooltip text="Share pin" accessibilityLabel="">
  <TapArea>
    <Icon icon="share" accessibilityLabel="Share Pin" color="default" />
  </TapArea>
</Tooltip>`}
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description="Icons are a great way to help users who have difficulties with reading, focus attention, and low vision impairments."
      >
        <MainSection.Subsection
          title="ARIA attributes"
          columns={2}
          description={`
If the icon appears without text, the Icon requires \`accessibilityLabel\`, a text description for screen readers to announce and communicate the represented [Icon](/web/icon), as shown in the first example.

Avoid using the generic words like  "image" or "icon"; instead, use verbs that describe the meaning of the icon, for example: “pins".

If an icon has a visible label that describes what the icon represents, \`accessibilityLabel\` can be an empty string, as shown in the second example.
`}
        >
          <MainSection.Card
            cardSize="md"
            defaultCode={`
<Flex gap={1}>
  <Icon icon="eye" accessibilityLabel="Number of views" color="default" />
  <Text weight="bold" size="300">4</Text>
</Flex>`}
          />
          <MainSection.Card
            cardSize="md"
            defaultCode={`
<Flex gap={1}>
  <Icon icon="tag" accessibilityLabel="" color="default" />
  <Text align="center" weight="bold">
    Shopping spotlight
  </Text>
</Flex>`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Legibility and touch area"
          description="Ensure that icons use a contrast ratio of 4.5:1 between icon color and background color."
        />
      </AccessibilitySection>
      <MainSection name="Localization" description="Be sure to localize `accessibilityLabel`." />
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Colors"
          description={`
        Icons can be created using the following color options. \`brandPrimary\` should only be used to represent the Pinterest logo, as it is not accessible. See the [design tokens](/foundations/design_tokens#Text-color) for more info.`}
        >
          <CombinationNew
            color={[
              'default',
              'subtle',
              'success',
              'error',
              'warning',
              'info',
              'recommendation',
              'inverse',
              'shopping',
              'brandPrimary',
              'light',
              'dark',
            ]}
          >
            {({ color }) => <Icon icon="heart" accessibilityLabel="" color={color} size={24} />}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Size"
          description={`
These are the guidelines for icon sizes (in px):
1. \`12\`
Used sparingly in tight spaces. When possible, use a text label next to the icon, as it can be hard to see for visually impaired people.
2. \`14\`
Used often following body text content any time an icon is needed.
3. \`16\`
Used often any time an icon is needed. Default icon size.
4. \`24\`
Used frequently any time an icon is needed.
5. \`32\`
Used occasionally, on more dense UI.
6. \`32+\`
Should be used sparingly and only in places where the UI is very dense and a larger icon is required.
`}
        />
        <MainSection.Subsection
          title="Custom icon"
          columns={2}
          description="Icon accepts both Gestalt [icons](/foundations/iconography/library#Search-icon-library) and custom icons, as shown in the second example. For custom icons, follow the [iconography and SVG](/foundations/iconography/library#Custom-SVG-icons) guidelines."
        >
          <MainSection.Card
            cardSize="md"
            defaultCode={`
<Tooltip text="Built-in Gestalt Icon">
  <Icon
    accessibilityLabel="Go to next steps"
    icon="directional-arrow-right"
  />
</Tooltip>
`}
          />
          <MainSection.Card
            cardSize="md"
            defaultCode={`
<Tooltip text="Custom Icon">
  <Icon
    accessibilityLabel="Go to next steps"
    dangerouslySetSvgPath={{ __path: 'M23 5v14a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-5.5h10.258l-1.94 1.939a1.5 1.5 0 0 0 2.121 2.122L17 12l-5.561-5.561a1.501 1.501 0 0 0-2.121 2.122l1.94 1.939H1V5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4'}}
  />
</Tooltip>
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
Use a descriptive label to describe the Icon
- Be succinct. Exclude unnecessary words.
- Be informative and accurate
- Write in the active voice
- Avoid technical jargon
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Use the words "image" or "icon" in the description label; instead, use words that indicate the purpose of the icon.
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[IconButton](/web/iconbutton)**
Use IconButton when only an icon is needed to represent an action instead of text.

**[Button](/web/button)**
Use Button to allow users to take an action.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  const docGen = await docgen({ componentName: 'Icon' });
  const overriddenDocGen = overrideTypes(docGen, {
    icon: (Icon?.icons ?? []).map((icon) => `'${icon}'`).join(' | '),
  });

  return {
    props: { generatedDocGen: overriddenDocGen },
  };
}
