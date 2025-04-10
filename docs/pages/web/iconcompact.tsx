import { IconCompact } from 'gestalt';
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
import builtInIcon from '../../examples/iconCompact/builtInIcon';
import customIcon from '../../examples/iconCompact/customIcon';
import main from '../../examples/iconCompact/main';

const HEIGHT = 150;

export default function ComponentPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Main example" previewHeight={HEIGHT} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection
        description="IconCompacts are a great way to help users who have difficulties with reading, focus attention, and low vision impairments."
        name={generatedDocGen?.displayName}
      >
        <MainSection.Subsection
          columns={2}
          description={`
If the icon appears without text, the IconCompact requires \`accessibilityLabel\`, a text description for screen readers to announce and communicate the represented the icon, as shown in the first example.

Avoid using the generic words like  "image" or "icon"; instead, use verbs that describe the meaning of the icon.

If an icon has a visible label that describes what the icon represents, \`accessibilityLabel\` can be an empty string.
`}
          title="ARIA attributes"
        />
        <MainSection.Subsection
          description="Ensure that icons use a contrast ratio of 4.5:1 between icon color and background color."
          title="Legibility"
        />
      </AccessibilitySection>

      <LocalizationSection name={generatedDocGen?.displayName} noDefaultLabelProvider />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
        IconCompacts can be created using the following color options. \`brandPrimary\` should only be used to represent the Pinterest logo, as it is not accessible. See the [design tokens](/foundations/design_tokens/overview#Text-color) for more info.`}
          title="Colors"
        >
          <CombinationNew
            // @ts-expect-error - TS2322 - Type '{ children: ({ color }: { [key: string]: any; }) => Element; color: string[]; }' is not assignable to type 'IntrinsicAttributes & Props'.
            color={[
              'default',
              'disabled',
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
            {({ color }) => <IconCompact accessibilityLabel="" color={color} icon="compact-add" />}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description="IconCompact accepts both Gestalt [icons](/foundations/iconography/library#Search-icon-library) and custom icons, as shown in the second example. For custom icons, follow the [iconography and SVG](/foundations/iconography/library#Custom-SVG-icons) guidelines."
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
Use a descriptive label to describe the IconCompact
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
  const generatedDocGen = await docGen('IconCompact');
  const overriddenDocGen = overrideTypes(generatedDocGen, {
    icon: (IconCompact?.icons ?? []).map((icon) => `'${String(icon)}'`).join(' | '),
  });

  return {
    props: { generatedDocGen: overriddenDocGen },
  };
}
