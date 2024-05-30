import { Icon } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import CombinationNew from '../../docs-components/CombinationNew';
import docGen, { DocGen, overrideTypes } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import builtInIcon from '../../examples/icon/builtInIcon';
import customIcon from '../../examples/icon/customIcon';
import doClarity from '../../examples/icon/doClarity';
import doIntentional from '../../examples/icon/doIntentional';
import dontInteractive from '../../examples/icon/dontInteractive';
import dontRepurpose from '../../examples/icon/dontRepurpose';
import main from '../../examples/icon/main';

const HEIGHT = 150;

export default function IconPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Main Button example" previewHeight={HEIGHT} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- As symbolic communication for elements that do not have room for text, like the number of pins in a carousel. In this case, ensure the icon choice is easily recognizable and makes sense to international users.
- To convey a critical meaning that cannot be communicated with words, like a downward chevron in a Button to indicate it reveals a menu.
- To help with quick scanning by adding rhythm and hierarchy to the design.`}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- For purposes that are decorative or for visual embellishment, such as how illustrations are typically used. Contact us if this is needed.
- As a visual reinforcement for associated text, without adding new meaning.
- To communicate status or health. Use [Status](/web/status) instead.
- As an interactive element (e.g., utilizing hover, focus, click/tap). Use [IconButton](/web/iconbutton) instead.`}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use icons intentionally, ensuring the Icon choice is easily recognizable and makes sense in the context. "
            sandpackExample={
              <SandpackExample
                code={doIntentional}
                hideEditor
                name="Use icons intentionally"
                previewHeight={HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Repurpose icons. Using icons for their intended meaning supports good comprehension."
            sandpackExample={
              <SandpackExample
                code={dontRepurpose}
                hideControls
                hideEditor
                name="Don't repurpose icons"
                previewHeight={HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Pair text and icons when possible to provide better clarity."
            sandpackExample={
              <SandpackExample
                code={doClarity}
                hideEditor
                name="Pair icons with text for clarity"
                previewHeight={HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Don't create interactive Icons using TapArea. Use [IconButton](/web/iconbutton) instead."
            sandpackExample={
              <SandpackExample
                code={dontInteractive}
                hideControls
                hideEditor
                name="Don't use interactive icons with TapArea"
                previewHeight={HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection
        description="Icons are a great way to help users who have difficulties with reading, focus attention, and low vision impairments."
        name={generatedDocGen?.displayName}
      >
        <MainSection.Subsection
          columns={2}
          description={`
If the icon appears without text, the Icon requires \`accessibilityLabel\`, a text description for screen readers to announce and communicate the represented [Icon](/web/icon), as shown in the first example.

Avoid using the generic words like  "image" or "icon"; instead, use verbs that describe the meaning of the icon, for example: “pins".

If an icon has a visible label that describes what the icon represents, \`accessibilityLabel\` can be an empty string, as shown in the second example.
`}
          title="ARIA attributes"
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={doIntentional}
                layout="column"
                name="Use icons intentionally"
                previewHeight={HEIGHT}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={doClarity}
                layout="column"
                name="Pair icons with text for clarity"
                previewHeight={HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Ensure that icons use a contrast ratio of 4.5:1 between icon color and background color."
          title="Legibility and touch area"
        />
      </AccessibilitySection>

      <LocalizationSection name={generatedDocGen?.displayName} noDefaultLabelProvider />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
        Icons can be created using the following color options. \`brandPrimary\` should only be used to represent the Pinterest logo, as it is not accessible. See the [design tokens](/foundations/design_tokens/overview#Text-color) for more info.`}
          title="Colors"
        >
          <CombinationNew
            // @ts-expect-error - TS2322 - Type '{ children: ({ color }: { [key: string]: any; }) => Element; color: string[]; }' is not assignable to type 'IntrinsicAttributes & Props'.
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
            {({ color }) => <Icon accessibilityLabel="" color={color} icon="heart" size={24} />}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
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
          title="Size"
        />
        <MainSection.Subsection
          columns={2}
          description="Icon accepts both Gestalt [icons](/foundations/iconography/library#Search-icon-library) and custom icons, as shown in the second example. For custom icons, follow the [iconography and SVG](/foundations/iconography/library#Custom-SVG-icons) guidelines."
          title="Custom icon"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={builtInIcon} name="Built-in icon" previewHeight={HEIGHT} />
            }
            title="Built-in icon"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={customIcon} name="Custom icon" previewHeight={HEIGHT} />
            }
            title="Custom SVG icon"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
Use a descriptive label to describe the Icon
- Be succinct. Exclude unnecessary words.
- Be informative and accurate
- Write in the active voice
- Avoid technical jargon
`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Use the words "image" or "icon" in the description label; instead, use words that indicate the purpose of the icon.
`}
            type="don't"
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

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  const generatedDocGen = await docGen('Icon');
  const overriddenDocGen = overrideTypes(generatedDocGen, {
    icon: (Icon?.icons ?? []).map((icon) => `'${icon}'`).join(' | '),
  });

  return {
    props: { generatedDocGen: overriddenDocGen },
  };
}
